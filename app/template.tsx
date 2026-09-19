/**
 * Transizione tra le pagine, solo CSS.
 *
 * Il template viene ricreato a ogni navigazione: la tenda color sabbia
 * (con il monogramma) si apre verso l'alto e il contenuto sale in
 * dissolvenza. Essendo CSS puro, se lo script non parte la tenda si
 * apre lo stesso e non blocca mai la pagina. Con "riduci movimento" è
 * nascosta (vedi globals.css).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="page-wipe" aria-hidden="true">
        <span className="page-wipe-mark font-heading text-5xl font-light tracking-[0.35em] text-primary">
          SM
        </span>
      </div>

      <div className="page-enter">{children}</div>
    </>
  );
}
