import type { DressCodeIconName } from "@/lib/icons";

export type DressCodeItem = {
  title: string;
  description: string;
  icon: DressCodeIconName;
};

export const dressCode: DressCodeItem[] = [
  {
    title: "Saremo su un prato",
    description:
      "Cerimonia e ricevimento si svolgono sull'erba: vi consigliamo un tacco grosso o una scarpa stabile. I tacchi a spillo tendono ad affondare.",
    icon: "shoes",
  },
  {
    title: "Una giacca per la sera",
    description:
      "Quando il sole tramonta, in riva al mare si rinfresca: portate una giacca o uno scialle per la sera.",
    icon: "jacket",
  },
];
