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
          title="Mappa Hotel"
          src="https://www.google.com/maps/embed?pb=INSERISCI_IL_TUO_LINK"
          className="h-[380px] w-full rounded-tile border-0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}