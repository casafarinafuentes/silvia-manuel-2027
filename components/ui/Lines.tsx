import { Fragment } from "react";

/**
 * Un testo con a capo manuali: nei dizionari le righe sono separate
 * da "\n" e qui diventano <br />.
 */
export default function Lines({ text }: { text: string }) {
  const lines = text.split("\n");

  return (
    <>
      {lines.map((line, index) => (
        <Fragment key={index}>
          {index > 0 && <br />}
          {line}
        </Fragment>
      ))}
    </>
  );
}
