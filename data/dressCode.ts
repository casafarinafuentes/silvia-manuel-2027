import type { DressCodeIconName } from "@/lib/icons";

export type DressCodeItem = {
  title: string;
  description: string;
  icon: DressCodeIconName;
};

export const dressCode: DressCodeItem[] = [
  {
    title: "Elegante",
    description:
      "Abiti lunghi o midi per le signore, completo o spezzato per i signori.",
    icon: "elegant",
  },
  {
    title: "Estate",
    description:
      "Preferisci tessuti leggeri e colori luminosi.",
    icon: "summer",
  },
  {
    title: "Dettagli",
    description:
      "Un accessorio raffinato completa il look.",
    icon: "details",
  },
  {
    title: "Relax",
    description:
      "Scarpe comode per ballare fino a tarda sera.",
    icon: "relax",
  },
];