type DividerProps = {
  title: string;
  className?: string;
};

export default function Divider({
  title,
  className = "",
}: DividerProps) {
  return (
    <div
      className={`flex items-center justify-center gap-4 ${className}`}
    >
      <div className="h-px max-w-[220px] flex-1 bg-border" />

      <span className="text-xs uppercase tracking-[0.35em] text-secondary">
        {title}
      </span>

      <div className="h-px max-w-[220px] flex-1 bg-border" />
    </div>
  );
}