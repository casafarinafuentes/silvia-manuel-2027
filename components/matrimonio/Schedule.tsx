import Divider from "@/components/ui/Divider";

const events = [
  {
    time: "16:30",
    title: "Arrivo degli ospiti",
  },
  {
    time: "17:30",
    title: "Cerimonia",
  },
  {
    time: "18:30",
    title: "Aperitivo",
  },
  {
    time: "20:00",
    title: "Cena",
  },
  {
    time: "22:30",
    title: "Torta e festa",
  },
];

export default function Schedule() {
  return (
    <div>
      <Divider
        title="La giornata in breve"
        className="mb-10"
      />

      <div className="space-y-6">
        {events.map((event) => (
          <div
            key={event.time}
            className="flex items-start gap-5 border-b border-border pb-5"
          >
            <p className="w-20 shrink-0 font-heading text-2xl text-primary">
              {event.time}
            </p>

            <div>
              <h3 className="text-lg text-primary">
                {event.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}