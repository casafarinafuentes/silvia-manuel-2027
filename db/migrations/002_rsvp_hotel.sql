-- Preferenza di alloggio raccolta con l'RSVP.
-- Valori: id di un hotel (data/hotels.ts), "self" (si organizza da solo)
-- oppure NULL (non richiesto / non partecipa / conferma dopo la scadenza).

alter table rsvp add column if not exists hotel text;

alter table rsvp drop constraint if exists rsvp_hotel_len;
alter table rsvp add constraint rsvp_hotel_len
  check (hotel is null or char_length(hotel) <= 40);

create index if not exists rsvp_hotel_idx on rsvp (hotel);
