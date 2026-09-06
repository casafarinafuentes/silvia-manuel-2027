"use client";

import { useId } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export default function Input({
  label,
  error,
  id,
  className = "",
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className="group">
      <label htmlFor={inputId} className="form-label">
        {label}
      </label>

      <input
        {...props}
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`
          mt-4
          w-full
          border-0
          border-b
          bg-transparent
          pb-3
          text-lg
          text-primary
          outline-none
          transition-all
          duration-300
          placeholder:text-secondary/45
          focus:placeholder:text-secondary/20
          ${error ? "border-[#a4553f]" : "border-border focus:border-primary"}
          ${className}
        `}
      />

      <div
        className="
          h-px
          w-0
          bg-primary
          transition-all
          duration-300
          group-focus-within:w-full
          motion-reduce:transition-none
        "
      />

      {error && (
        <p id={errorId} role="alert" className="mt-3 text-[13px] text-[#a4553f]">
          {error}
        </p>
      )}
    </div>
  );
}
