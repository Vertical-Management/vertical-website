"use client";

import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const fieldBase = cn(
  "w-full bg-transparent text-ink placeholder:text-ink-faint",
  "border-0 border-b border-border-strong",
  // text-base (16px) prevents iOS focus zoom; min height for touch
  "min-h-12 px-0 py-3.5 font-body text-base leading-normal",
  "transition-[border-color,box-shadow] duration-base ease-out-expo",
  "focus:border-ink focus:outline-none focus:shadow-[0_1px_0_0_var(--color-ink)]",
  "disabled:cursor-not-allowed disabled:opacity-40",
);

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, label, hint, error, id, ...rest },
  ref,
) {
  const fieldId = id || rest.name;

  return (
    <label className="group flex w-full flex-col gap-2">
      {label ? (
        <span className="tracking-label font-mono text-caption uppercase text-ink-muted transition-colors duration-base group-focus-within:text-ink">
          {label}
        </span>
      ) : null}
      <input
        ref={ref}
        id={fieldId}
        className={cn(
          fieldBase,
          error &&
            "border-danger focus:border-danger focus:shadow-[0_1px_0_0_var(--color-danger)]",
          className,
        )}
        aria-invalid={!!error}
        aria-describedby={
          error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined
        }
        {...rest}
      />
      {error ? (
        <span id={`${fieldId}-error`} className="text-sm text-danger" role="alert">
          {error}
        </span>
      ) : hint ? (
        <span id={`${fieldId}-hint`} className="text-sm text-ink-muted">
          {hint}
        </span>
      ) : null}
    </label>
  );
});

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  hint?: string;
  error?: string;
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { className, label, hint, error, id, rows = 4, ...rest },
  ref,
) {
  const fieldId = id || rest.name;

  return (
    <label className="group flex w-full flex-col gap-2">
      {label ? (
        <span className="tracking-label font-mono text-caption uppercase text-ink-muted transition-colors duration-base group-focus-within:text-ink">
          {label}
        </span>
      ) : null}
      <textarea
        ref={ref}
        id={fieldId}
        rows={rows}
        className={cn(
          fieldBase,
          "min-h-[7rem] resize-y",
          error &&
            "border-danger focus:border-danger focus:shadow-[0_1px_0_0_var(--color-danger)]",
          className,
        )}
        aria-invalid={!!error}
        aria-describedby={
          error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined
        }
        {...rest}
      />
      {error ? (
        <span id={`${fieldId}-error`} className="text-sm text-danger" role="alert">
          {error}
        </span>
      ) : hint ? (
        <span id={`${fieldId}-hint`} className="text-sm text-ink-muted">
          {hint}
        </span>
      ) : null}
    </label>
  );
});
