import React, { useEffect, useMemo, useRef, useState } from 'react';

const DIFFICULTIES = {
  Beginner: { rows: 9, columns: 9, mines: 10 },
  Intermediate: { rows: 16, columns: 16, mines: 40 },
  Expert: { rows: 16, columns: 30, mines: 99 },
};

const CELL_COVERED = 'covered';
const CELL_FLAG = 'flag';
const CELL_QUESTION = 'question';
const CELL_OPEN = 'open';

function createEmptyBoard(rows, columns) {
  return Array.from({ length: rows * columns }, () => ({
    state: CELL_COVERED,
    minesAround: 0,
  }));
}

function getNearIndexes(index, rows, columns) {
  if (index < 0 || index >= rows * columns) return [];
  const row = Math.floor(index / columns);
  const column = index % columns;

  return [
    index - columns - 1,
    index - columns,
    index - columns + 1,
    index - 1,
    index + 1,
    index + columns - 1,
    index + columns,
    index + columns + 1,
  ].filter((_, arrayIndex) => {
    if (row === 0 && arrayIndex < 3) return false;
    if (row === rows - 1 && arrayIndex > 4) return false;
    if (column === 0 && [0, 3, 5].includes(arrayIndex)) return false;
    if (column === columns - 1 && [2, 4, 7].includes(arrayIndex)) return false;
    return true;
  });
}

function randomSampleWithoutReplacement(pool, sampleCount) {
  const available = [...pool];
  const sampled = [];

  while (sampled.length < sampleCount && available.length > 0) {
    const randomIndex = Math.floor(Math.random() * available.length);
    sampled.push(available[randomIndex]);
    available.splice(randomIndex, 1);
  }

  return sampled;
}

function insertMines({ rows, columns, mines, excludeIndex }, board) {
  const newBoard = board.map((cell) => ({ ...cell }));
  const indexes = Array.from({ length: rows * columns }, (_, currentIndex) => currentIndex).filter(
    (currentIndex) => currentIndex !== excludeIndex,
  );

  const chosenMines = randomSampleWithoutReplacement(indexes, mines);

  chosenMines.forEach((mineIndex) => {
    newBoard[mineIndex].minesAround = -1;
    getNearIndexes(mineIndex, rows, columns).forEach((nearIndex) => {
      if (newBoard[nearIndex].minesAround >= 0) {
        newBoard[nearIndex].minesAround += 1;
      }
    });
  });

  return newBoard;
}

function Minesweeper() {
  const appRef = useRef(null);
  const [difficulty, setDifficulty] = useState('Beginner');
  const [status, setStatus] = useState('new');
  const [seconds, setSeconds] = useState(0);

  const config = DIFFICULTIES[difficulty];
  const { rows, columns, mines } = config;

  const [board, setBoard] = useState(() => createEmptyBoard(rows, columns));

  useEffect(() => {
    setBoard(createEmptyBoard(rows, columns));
    setStatus('new');
    setSeconds(0);
  }, [rows, columns]);

  useEffect(() => {
    if (status !== 'started') return undefined;
    const timer = window.setInterval(() => {
      setSeconds((previousSeconds) => previousSeconds + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [status]);

  useEffect(() => {
    if (!appRef.current) return undefined;

    const emitResize = () => {
      if (!appRef.current) return;
      const rect = appRef.current.getBoundingClientRect();
      window.dispatchEvent(
        new CustomEvent('minesweeper:resize', {
          detail: {
            width: Math.ceil(rect.width),
            height: Math.ceil(rect.height),
            difficulty,
          },
        }),
      );
    };

    emitResize();

    const observer = new ResizeObserver(() => {
      emitResize();
    });

    observer.observe(appRef.current);

    return () => {
      observer.disconnect();
    };
  }, [difficulty, rows, columns]);

  const remainingMines = useMemo(() => {
    const flaggedCount = board.filter((cell) => cell.state === CELL_FLAG).length;
    return mines - flaggedCount;
  }, [board, mines]);

  const resetGame = (newDifficulty = difficulty) => {
    setDifficulty(newDifficulty);
    const newConfig = DIFFICULTIES[newDifficulty];
    setBoard(createEmptyBoard(newConfig.rows, newConfig.columns));
    setStatus('new');
    setSeconds(0);
  };

  const revealConnectedCells = (originIndex, currentBoard) => {
    const nextBoard = currentBoard.map((cell) => ({ ...cell }));
    const queue = [originIndex];
    const visited = new Set();

    while (queue.length > 0) {
      const index = queue.shift();
      if (index == null || visited.has(index)) continue;
      visited.add(index);

      const cell = nextBoard[index];
      if (!cell || cell.state === CELL_FLAG || cell.state === CELL_OPEN) continue;
      cell.state = CELL_OPEN;

      if (cell.minesAround === 0) {
        getNearIndexes(index, rows, columns).forEach((nearIndex) => {
          if (!visited.has(nearIndex)) queue.push(nearIndex);
        });
      }
    }

    return nextBoard;
  };

  const checkWinCondition = (currentBoard) => {
    const safeCellsClosed = currentBoard.filter(
      (cell) => cell.minesAround >= 0 && cell.state !== CELL_OPEN,
    ).length;

    if (safeCellsClosed === 0) {
      setStatus('won');
      return currentBoard.map((cell) => {
        if (cell.minesAround < 0) {
          return { ...cell, state: CELL_FLAG };
        }
        return cell;
      });
    }

    return currentBoard;
  };

  const openCell = (index) => {
    if (status === 'won' || status === 'died') return;

    setBoard((previousBoard) => {
      let nextBoard = previousBoard.map((cell) => ({ ...cell }));

      if (status === 'new') {
        nextBoard = insertMines({ rows, columns, mines, excludeIndex: index }, nextBoard);
        setStatus('started');
      }

      const currentCell = nextBoard[index];
      if (!currentCell || currentCell.state === CELL_FLAG || currentCell.state === CELL_OPEN) {
        return nextBoard;
      }

      if (currentCell.minesAround < 0) {
        setStatus('died');
        return nextBoard.map((cell) => {
          if (cell.minesAround < 0 && cell.state !== CELL_FLAG) return { ...cell, state: 'mine' };
          if (cell.state === CELL_FLAG && cell.minesAround >= 0) return { ...cell, state: 'misflagged' };
          return cell;
        });
      }

      if (currentCell.minesAround === 0) {
        nextBoard = revealConnectedCells(index, nextBoard);
      } else {
        nextBoard[index].state = CELL_OPEN;
      }

      return checkWinCondition(nextBoard);
    });
  };

  const openAround = (index) => {
    if (status !== 'started') return;

    setBoard((previousBoard) => {
      const cell = previousBoard[index];
      if (!cell || cell.state !== CELL_OPEN || cell.minesAround <= 0) return previousBoard;

      const nearIndexes = getNearIndexes(index, rows, columns);
      const nearCells = nearIndexes.map((nearIndex) => previousBoard[nearIndex]);
      const flagCount = nearCells.filter((nearCell) => nearCell?.state === CELL_FLAG).length;

      if (flagCount !== cell.minesAround) return previousBoard;

      let nextBoard = previousBoard.map((entry) => ({ ...entry }));

      for (const nearIndex of nearIndexes) {
        const nearCell = nextBoard[nearIndex];
        if (!nearCell || nearCell.state === CELL_FLAG || nearCell.state === CELL_OPEN) continue;

        if (nearCell.minesAround < 0) {
          setStatus('died');
          return nextBoard.map((entry) => {
            if (entry.minesAround < 0 && entry.state !== CELL_FLAG) return { ...entry, state: 'mine' };
            if (entry.state === CELL_FLAG && entry.minesAround >= 0) return { ...entry, state: 'misflagged' };
            return entry;
          });
        }

        if (nearCell.minesAround === 0) {
          nextBoard = revealConnectedCells(nearIndex, nextBoard);
        } else {
          nearCell.state = CELL_OPEN;
        }
      }

      return checkWinCondition(nextBoard);
    });
  };

  const cycleMarkState = (index) => {
    if (status === 'won' || status === 'died') return;

    setBoard((previousBoard) => {
      const nextBoard = previousBoard.map((cell) => ({ ...cell }));
      const cell = nextBoard[index];
      if (!cell || cell.state === CELL_OPEN) return previousBoard;

      if (cell.state === CELL_COVERED) {
        cell.state = CELL_FLAG;
      } else if (cell.state === CELL_FLAG) {
        cell.state = CELL_QUESTION;
      } else {
        cell.state = CELL_COVERED;
      }

      return nextBoard;
    });
  };

  const renderCellContent = (cell) => {
    if (cell.state === CELL_FLAG) return '🚩';
    if (cell.state === CELL_QUESTION) return '?';
    if (cell.state === 'mine') return '💣';
    if (cell.state === 'misflagged') return '✖';
    if (cell.state === CELL_OPEN) {
      return cell.minesAround > 0 ? String(cell.minesAround) : '';
    }
    return '';
  };

  const face = status === 'won' ? '😎' : status === 'died' ? '😵' : '🙂';

  return (
    <div className="mine-app" ref={appRef} onContextMenu={(event) => event.preventDefault()}>
      <div className="mine-menu">
        <button type="button" onClick={() => resetGame()}>New</button>
        <button type="button" onClick={() => resetGame('Beginner')}>Beginner</button>
        <button type="button" onClick={() => resetGame('Intermediate')}>Intermediate</button>
        <button type="button" onClick={() => resetGame('Expert')}>Expert</button>
      </div>

      <div className="mine-panel">
        <div className="mine-digits">{String(Math.max(-99, Math.min(999, remainingMines))).padStart(3, '0')}</div>
        <button type="button" className="mine-face" onClick={() => resetGame()} aria-label="Reiniciar">
          {face}
        </button>
        <div className="mine-digits">{String(Math.min(seconds, 999)).padStart(3, '0')}</div>
      </div>

      <div
        className="mine-board"
        style={{
          gridTemplateColumns: `repeat(${columns}, 16px)`,
          gridTemplateRows: `repeat(${rows}, 16px)`,
        }}
      >
        {board.map((cell, index) => (
          <button
            type="button"
            key={`${difficulty}-${index}`}
            className={`mine-cell mine-cell-${cell.state}`}
            onClick={() => openCell(index)}
            onDoubleClick={() => openAround(index)}
            onContextMenu={() => cycleMarkState(index)}
          >
            {renderCellContent(cell)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Minesweeper;
