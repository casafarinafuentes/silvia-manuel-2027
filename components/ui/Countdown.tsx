"use client";

import { useEffect, useState } from "react";

type CountdownProps = {
  variant?: "hero" | "footer";
};

type TimeRemaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const weddingDate = new Date("2027-06-12T17:30:00");

const INITIAL_STATE: TimeRemaining = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

function calculate(): TimeRemaining {
  const difference = weddingDate.getTime() - Date.now();

  if (difference <= 0) {
    return INITIAL_STATE;
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function Countdown({
  variant = "footer",
}: CountdownProps) {
  const [mounted, setMounted] = useState(false);

  const [time, setTime] =
    useState<TimeRemaining>(INITIAL_STATE);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setMounted(true);
      setTime(calculate());
    });

    const interval = setInterval(() => {
      setTime(calculate());
    }, 1000);

    return () => {
      cancelAnimationFrame(id);
      clearInterval(interval);
    };
  }, []);

  const dark = variant === "footer";

  const items = [
    {
      label: "Giorni",
      value: mounted
        ? String(time.days).padStart(2, "0")
        : "--",
    },
    {
      label: "Ore",
      value: mounted
        ? String(time.hours).padStart(2, "0")
        : "--",
    },
    {
      label: "Minuti",
      value: mounted
        ? String(time.minutes).padStart(2, "0")
        : "--",
    },
    {
      label: "Secondi",
      value: mounted
        ? String(time.seconds).padStart(2, "0")
        : "--",
    },
  ];

  return (
    <div className="flex items-center justify-center whitespace-nowrap">
      {items.map((item, index) => (
        <div
          key={item.label}
          className="flex items-center"
        >
          <div className="w-[62px] text-center md:w-[78px]">
            <p
              className={`font-heading font-light leading-none ${
                dark
                  ? "text-5xl text-primary"
                  : "text-4xl text-white md:text-5xl"
              }`}
            >
              {item.value}
            </p>

            <p
              className={`mt-3 text-[10px] uppercase tracking-[0.32em] ${
                dark
                  ? "text-secondary"
                  : "text-white/80"
              }`}
            >
              {item.label}
            </p>
          </div>

          {index !== items.length - 1 && (
            <div
              className={`mx-4 h-12 w-px ${
                dark
                  ? "bg-border"
                  : "bg-white/25"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}