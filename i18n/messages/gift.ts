import { p } from "../pair.ts";

export const giftMessages = {
  metadata: {
    title: p("Per tutto ciò che verrà", "Para todo lo que vendrá"),
    description: p(
      "Se desiderate farci un regalo, qui trovate le coordinate per contribuire ai progetti della nostra famiglia.",
      "Si desean hacernos un regalo, aquí encontrarán los datos para contribuir a los proyectos de nuestra familia.",
    ),
  },

  hero: {
    title: p("Per tutto ciò che verrà", "Para todo lo que vendrá"),
    subtitle: p("I nostri progetti", "Nuestros proyectos"),
  },

  message: {
    title: p(
      "Una famiglia,\ne tanti {em}.",
      "Una familia,\ny muchos {em}.",
    ),
    emphasis: p("progetti da realizzare", "proyectos por realizar"),
    textBefore: p(
      "Con il matrimonio iniziamo a costruire i progetti della nostra famiglia. Se desiderate farci un regalo, potete aiutarci a trasformarli in realtà: qui sotto trovate le coordinate per il bonifico.",
      "Con la boda empezamos a construir los proyectos de nuestra familia. Si desean hacernos un regalo, pueden ayudarnos a hacerlos realidad: abajo encontrarán los datos para la transferencia.",
    ),
    textAfter: p(
      "Con il matrimonio abbiamo iniziato a costruire i progetti della nostra famiglia. Se desiderate farci un regalo, potete aiutarci a trasformarli in realtà: qui sotto trovate le coordinate per il bonifico.",
      "Con la boda empezamos a construir los proyectos de nuestra familia. Si desean hacernos un regalo, pueden ayudarnos a hacerlos realidad: abajo encontrarán los datos para la transferencia.",
    ),
  },

  details: {
    title: p("Coordinate per il bonifico", "Datos para la transferencia"),
    preparing: p(
      "Stiamo preparando le coordinate:\nle troverete qui a breve.",
      "Estamos preparando los datos:\nlos encontrarán aquí muy pronto.",
    ),
    holder: p("Intestato a", "A nombre de"),
    iban: p("IBAN", "IBAN"),
    reference: p("Causale", "Concepto"),
    referenceValue: p("Regalo di nozze", "Regalo de bodas"),
    referenceNote: p(
      "Aggiungete il vostro nome, così sappiamo chi ringraziare.",
      "Agreguen su nombre, así sabemos a quién agradecer.",
    ),
    copy: p("Copia", "Copiar"),
    copied: p("Copiato", "Copiado"),
    copiedAnnounce: p("IBAN copiato negli appunti", "IBAN copiado al portapapeles"),
  },

  thanks: p("Grazie di cuore, da entrambi.", "Gracias de corazón, de parte de los dos."),
};
