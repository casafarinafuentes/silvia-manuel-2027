"use client";

import { useRef } from "react";

type TextareaProps = {
  label: string;
  placeholder?: string;
};

export default function Textarea({
  label,
  placeholder,
}: TextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleInput() {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "0px";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  return (
    <div className="group">
      <label
  className="
    block
    text-[11px]
    uppercase
    tracking-[0.32em]
    text-secondary
  "
>
        {label}
      </label>

      <textarea
  ref={textareaRef}
  rows={1}
  placeholder={placeholder}
  onInput={handleInput}
  className="form-textarea placeholder:text-secondary/45 focus:border-primary focus:placeholder:text-secondary/20"
/> 

      <div
        className="
          h-px
          w-0
          bg-primary
          transition-all
          duration-300
          group-focus-within:w-full
        "
      />
    </div>
  );
}