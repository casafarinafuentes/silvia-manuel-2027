"use client";

import { useEffect, useState } from "react";

const weddingDate = new Date("2027-06-12T17:00:00");

function getTimeRemaining() {
  const now = new Date();

  const difference = weddingDate.getTime() - now.getTime();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeRemaining());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-md rounded-3xl bg-white p-10 shadow-sm">

        <p className="text-center text-xs uppercase tracking-[0.35em] text-secondary">
          Countdown
        </p>

        <h2 className="mt-2 text-center text-lg tracking-[0.15em]">
          AL NOSTRO GIORNO
        </h2>

        <div className="mt-10 grid grid-cols-4 gap-4 text-center">

          <TimeBlock value={time.days} label="GIORNI" />

          <TimeBlock value={time.hours} label="ORE" />

          <TimeBlock value={time.minutes} label="MINUTI" />

          <TimeBlock value={time.seconds} label="SECONDI" />

        </div>

      </div>
    </section>
  );
}

function TimeBlock({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div>
      <div className="text-4xl font-light text-primary">
        {String(value).padStart(2, "0")}
      </div>

      <div className="mt-2 text-[11px] tracking-[0.2em] text-secondary">
        {label}
      </div>
    </div>
  );
}