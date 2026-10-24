import Image from "next/image";
import { useLocale } from "next-intl";

import { Link } from "@/i18n/navigation";
import { useM } from "@/i18n/use-messages";
import { inviteMessages } from "@/i18n/messages/invite";
import Lines from "@/components/ui/Lines";

import styles from "./invito.module.css";

/**
 * La cartolina dell'invito, riprodotta dall'originale stampato
 * (115 x 170 mm): monogramma e nomi sono ritagli del file di stampa,
 * il resto è testo vero in Crimson Pro, così esiste nelle due lingue.
 *
 * Al posto del QR code c'è un pulsante: chi riceve l'invito su uno
 * schermo non può inquadrarlo.
 */
export default function InvitationCard({ rsvpOpen }: { rsvpOpen: boolean }) {
  const locale = useLocale();
  const { card } = useM(inviteMessages);

  return (
    <article className={styles.card} lang={locale}>
      <Image
        src="/invito/monogram.webp"
        alt=""
        width={395}
        height={383}
        className={styles.monogram}
      />

      <p className={styles.intro}>
        <Lines text={card.intro} />
      </p>

      {locale === "es" ? (
        /* "Silvia e Manuel" è un unico lettering: in spagnolo la "e"
           lascia il posto a una "y" dello stesso colore. */
        <div className={styles.namesImg} role="img" aria-label={card.namesAlt}>
          <Image
            src="/invito/names-silvia.webp"
            alt=""
            width={478}
            height={234}
            className={styles.nSilvia}
          />
          <span className={styles.y} aria-hidden="true">
            y
          </span>
          <Image
            src="/invito/names-manuel.webp"
            alt=""
            width={552}
            height={234}
            className={styles.nManuel}
          />
        </div>
      ) : (
        <Image
          src="/invito/names.webp"
          alt={card.namesAlt}
          width={1171}
          height={234}
          className={styles.namesImg}
        />
      )}

      <p className={styles.date}>{card.date}</p>

      <span className={`${styles.rule} ${styles.rule1}`} aria-hidden="true" />

      <p className={`${styles.where} ${styles.caps}`}>
        <Lines text={card.where} />
      </p>

      <p className={styles.place}>
        <Lines text={card.place} />
      </p>

      <span className={`${styles.rule} ${styles.rule2}`} aria-hidden="true" />

      <p className={`${styles.rsvp} ${styles.caps}`}>
        <Lines text={rsvpOpen ? card.rsvp : card.rsvpClosed} />
      </p>

      <Link href={rsvpOpen ? "/rsvp" : "/"} className={styles.cardButton}>
        {rsvpOpen ? card.button : card.buttonClosed}
      </Link>
    </article>
  );
}
