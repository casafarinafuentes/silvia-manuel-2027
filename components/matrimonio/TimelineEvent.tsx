import type { LucideIcon } from "lucide-react";

type TimelineEventProps = {
  icon: LucideIcon;
  time: string;
  title: string;
  description?: string;
};

export default function TimelineEvent({
  icon: Icon,
  time,
  title,
  description,
}: TimelineEventProps) {
  return (
    <div className="flex w-[170px] flex-col items-center text-center">
      {/* Icona */}

      <div className="flex h-10 items-center justify-center text-primary">
        <Icon
          size={24}
          strokeWidth={1.35}
        />
      </div>

      {/* Pallino */}

      <div className="mt-5 h-[8px] w-[8px] rounded-full bg-accent ring-[6px] ring-background" />

      {/* Ora */}

      <p className="mt-8 font-heading text-[2rem] leading-none text-primary">
        {time}
      </p>

      {/* Titolo */}

      <h3 className="mt-3 text-[19px] text-primary">
        {title}
      </h3>

      {/* Descrizione */}

      {description && (
        <p className="mt-2 max-w-[150px] text-sm leading-6 text-secondary">
          {description}
        </p>
      )}
    </div>
  );
}