export default function Map() {
  return (
    <div
      className="
        h-full
        overflow-hidden
        rounded-panel
        border
        border-border
        bg-white
      "
    >
      <div className="px-8 pt-8">
        <h2 className="font-heading text-[42px] font-light text-primary">
          Dove siamo
        </h2>
      </div>

      <div className="p-8 pt-6">
        <iframe
          title="Mappa di Cannigione"
          src="https://www.google.com/maps?q=41.1078363,9.4381003&z=13&output=embed"
          className="h-[380px] w-full rounded-tile border-0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />

        <a
          href="https://maps.app.goo.gl/6iwn6YhMWnH84Yaf6"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block border-b border-border pb-1 text-xs uppercase tracking-[0.24em] text-primary transition hover:border-primary"
        >
          Apri Cannigione su Google Maps →
        </a>
      </div>
    </div>
  );
}