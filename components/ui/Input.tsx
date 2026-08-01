"use client";

type InputProps = {
  label: string;
  placeholder?: string;
  type?: string;
};

export default function Input({
  label,
  placeholder,
  type = "text",
}: InputProps) {
  return (
    <div className="group">
      <label className="form-label">
        {label}
      </label>

      <input
  className="
    mt-4
    w-full
    border-0
    border-b
    border-border
    bg-transparent
    pb-3
    text-lg
    text-primary
    placeholder:text-secondary/45
    outline-none
    transition-all
    duration-300
    focus:border-primary
    focus:placeholder:text-secondary/20
  "
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