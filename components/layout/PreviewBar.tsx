import type { TemporalContext } from "@/lib/temporal";

const presets = [
  { label: "Oggi", data: null },
  { label: "RSVP", data: "2027-02-01" },
  { label: "Attesa", data: "2027-04-15" },
  { label: "Ultime settimane", data: "2027-06-01" },
  { label: "Matrimonio", data: "2027-06-12" },
  { label: "Dopo", data: "2027-07-01" },
];

/**
 * Barra di servizio, solo in sviluppo: mostra la data con cui si sta
 * guardando il sito e permette di saltare da una fase all'altra.
 */
export default function PreviewBar({
  context,
  previewDate,
}: {
  context: TemporalContext;
  previewDate: string | null;
}) {
  return (
    <div className="fixed bottom-3 right-3 z-[60] max-w-[calc(100vw-5rem)] rounded-tile bg-[#2f2b28] px-4 py-3 text-[11px] leading-5 text-white shadow-xl">
      <p className="text-white/70">
        Anteprima fasi · {context.today} · fase{" "}
        <strong className="font-medium text-white">{context.phase}</strong>
      </p>

      <p className="mt-1 flex flex-wrap gap-x-3">
        {presets.map((preset) => (
          <a
            key={preset.label}
            href={preset.data ? `/anteprima?data=${preset.data}` : "/anteprima"}
            className={`underline-offset-4 hover:underline ${
              preset.data === previewDate ? "text-[#e6d3b3]" : "text-white/85"
            }`}
          >
            {preset.label}
          </a>
        ))}
      </p>
    </div>
  );
}
