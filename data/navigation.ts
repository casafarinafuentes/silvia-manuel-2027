import { uiMessages } from "@/i18n/messages/ui";

const { nav } = uiMessages;

/** Le voci del menu: i testi sono nelle due lingue (`uiMessages.nav`). */
export const navigation = [
  {
    label: nav.matrimonio,
    href: "/matrimonio",
  },
  {
    label: nav.rsvp,
    href: "/rsvp",
  },
  {
    label: nav.hotel,
    href: "/viaggio",
  },
  {
    label: nav.sardegna,
    href: "/sardegna",
  },
  {
    // Volutamente ultima: presente per chi la cerca, mai in evidenza.
    label: nav.gift,
    href: "/lista-nozze",
  },
];
