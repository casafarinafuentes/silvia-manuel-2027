import { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  /** Necessario per rendere la sezione raggiungibile via ancora. */
  id?: string;
  className?: string;
  containerClassName?: string;
};

export default function Section({
  children,
  id,
  className = "",
  containerClassName = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-14 lg:py-16 ${className}`}
    >
      <div
        className={`mx-auto w-full max-w-[1500px] px-5 lg:px-8 ${containerClassName}`}
      >
        {children}
      </div>
    </section>
  );
}