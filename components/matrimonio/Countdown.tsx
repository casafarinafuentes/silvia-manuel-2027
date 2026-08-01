"use client";

import { useEffect, useState } from "react";

import { wedding } from "@/config/wedding";

type CountdownValues = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const INITIAL_STATE: CountdownValues = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

const calculate = (): CountdownValues => {
  const target = new Date(
    `${wedding.dates.wedding}T17:30:00`
  ).getTime();

  const now = Date.now();

  const difference = target - now;

  if (difference <= 0) {
    return INITIAL_STATE;
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor(
      (difference / (1000 * 60 * 60)) % 24
    ),
    minutes: Math.floor(
      (difference / (1000 * 60)) % 60
    ),
    seconds: Math.floor(
      (difference / 1000) % 60
    ),
  };
};

export default function Countdown() {
  const [timeLeft, setTimeLeft] =
    useState<CountdownValues>(calculate);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculate());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const items = [
    {
      label: "Giorni",
      value: timeLeft.days,
    },
    {
      label: "Ore",
      value: timeLeft.hours,
    },
    {
      label: "Minuti",
      value: timeLeft.minutes,
    },
    {
      label: "Secondi",
      value: timeLeft.seconds,
    },
  ];

  return (
    <div className="flex items-center justify-center whitespace-nowrap">
      {items.map((item, index) => (
        <div
          key={item.label}
          className="flex items-center"
        >
          <div className="w-[58px] text-center sm:w-[72px]">
            <p className="font-heading text-[42px] font-light leading-none text-primary sm:text-5xl">
              {String(item.value).padStart(2, "0")}
            </p>

            <p className="mt-2 text-[9px] uppercase tracking-[0.28em] text-secondary sm:mt-3 sm:text-[10px]">
              {item.label}
            </p>
          </div>

          {index !== items.length - 1 && (
            <div className="mx-3 h-10 w-px bg-border sm:mx-6 sm:h-12" />
          )}
        </div>
      ))}
    </div>
  );
}