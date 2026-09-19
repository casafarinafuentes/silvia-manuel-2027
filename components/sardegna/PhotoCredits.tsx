import { photoCredits } from "@/data/photoCredits";

/**
 * Crediti fotografici. Le licenze Creative Commons chiedono di citare
 * autore e licenza: qui, in piccolo, in fondo alla pagina.
 */
export default function PhotoCredits() {
  return (
    <section className="border-t border-border px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <details className="group">
          <summary className="cursor-pointer text-xs uppercase tracking-[0.28em] text-secondary transition-colors hover:text-primary">
            Crediti fotografici
          </summary>

          <ul className="mt-6 grid gap-x-10 gap-y-2 text-xs leading-6 text-secondary md:grid-cols-2">
            {photoCredits.map((credit) => (
              <li key={credit.label}>
                <a
                  href={credit.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-primary"
                >
                  {credit.label}
                </a>
                {" — "}
                {credit.author},{" "}
                {credit.licenseUrl ? (
                  <a
                    href={credit.licenseUrl}
                    target="_blank"
                    rel="noopener noreferrer license"
                    className="underline underline-offset-2 hover:text-primary"
                  >
                    {credit.license}
                  </a>
                ) : (
                  credit.license
                )}
              </li>
            ))}
          </ul>
        </details>
      </div>
    </section>
  );
}
