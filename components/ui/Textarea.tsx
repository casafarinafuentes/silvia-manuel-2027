"use client";

import { useId, useRef } from "react";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export default function Textarea({
  label,
  error,
  id,
  onInput,
  className = "",
  ...props
}: TextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const errorId = `${textareaId}-error`;

  function handleInput(event: React.InputEvent<HTMLTextAreaElement>) {
    const textarea = textareaRef.current;

    if (textarea) {
      // Azzerare prima l'altezza permette al campo di rimpicciolirsi
      // quando si cancella del testo, non solo di crescere.
      textarea.style.height = "0px";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }

    onInput?.(event);
  }

  return (
    <div className="group">
      <label htmlFor={textareaId} className="form-label">
        {label}
      </label>

      <textarea
        {...props}
        id={textareaId}
        ref={textareaRef}
        rows={1}
        onInput={handleInput}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`
          form-textarea
          placeholder:text-secondary/45
          focus:placeholder:text-secondary/20
          ${error ? "border-[#a4553f]" : "focus:border-primary"}
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
