import {
  Cormorant_Garamond,
  Corinthia,
  Crimson_Pro,
  Inter,
} from "next/font/google";

/**
 * Font condivisi dai due "root layout" dell'app: il sito (con lingua)
 * e l'area admin. Vanno dichiarati una volta sola, qui.
 */
export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const fontVariables = `${cormorant.variable} ${inter.variable}`;

/**
 * Solo per l'invito interattivo (si carica solo in quella pagina):
 * Crimson Pro per il testo della cartolina, Corinthia per la "y" che,
 * nella versione spagnola, prende il posto della "e" del lettering.
 */
export const crimson = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-crimson",
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const corinthia = Corinthia({
  subsets: ["latin"],
  variable: "--font-corinthia",
  weight: "400",
  display: "swap",
});
