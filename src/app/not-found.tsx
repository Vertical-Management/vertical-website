import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="flex min-h-dvh flex-col items-center justify-center px-gutter pt-header text-center"
    >
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-ink-muted">
        Error 404
      </p>
      <h1 className="font-display text-display-lg text-ink">
        Esta página
        <br />
        no existe
      </h1>
      <p className="mt-6 max-w-sm text-ink-soft">
        Como un coin en la máquina equivocada. Vuelve al inicio e inserta otra vez.
      </p>
      <Link
        href="/"
        className="mt-10 rounded-pill bg-ink px-8 py-3 font-mono text-xs uppercase tracking-widest text-paper transition-transform duration-400 ease-out-expo hover:scale-105"
      >
        Insert coin → Home
      </Link>
    </main>
  );
}
