type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: SectionTitleProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && (
        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-secondary">
          {eyebrow}
        </p>
      )}

      <h2 className="font-heading text-5xl font-light leading-tight text-primary md:text-6xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-secondary">
          {subtitle}
        </p>
      )}

      <div className="mx-auto mt-7 h-px w-20 bg-border" />
    </div>
  );
}