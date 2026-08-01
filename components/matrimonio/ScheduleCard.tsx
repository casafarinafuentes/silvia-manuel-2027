import {
  Car,
  Gem,
  Martini,
  Utensils,
  Disc3,
} from "lucide-react";

const events = [
  {
    icon: Car,
    label: "Parcheggio",
  },
  {
    icon: Gem,
    label: "Cerimonia",
  },
  {
    icon: Martini,
    label: "Cocktail",
  },
  {
    icon: Utensils,
    label: "Cena",
  },
  {
    icon: Disc3,
    label: "Dance Floor",
  },
];

export default function ScheduleCard() {
  return (
    <aside className="border border-border bg-panel px-9 py-10">
      <p className="mb-12 text-center text-[11px] uppercase tracking-[0.35em] text-secondary">
  La giornata in breve
</p>

      <div className="mx-auto max-w-[180px]">
  <div className="relative">
    {/* linea verticale */}
    <div className="absolute left-[13px] top-2 bottom-2 w-px bg-border" />

    <div className="flex flex-col gap-10">
          {events.map((event) => {
            const Icon = event.icon;

            return (
              <div
                key={event.label}
                className="relative flex items-center gap-5"
              >
                <div className="relative z-10 flex h-7 w-7 items-center justify-center bg-panel">
                  <Icon
                    size={18}
                    strokeWidth={1.5}
                    className="text-primary"
                  />
                </div>

                <p className="text-base text-primary">
                  {event.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </aside>
  );
}