"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Lightbulb } from "lucide-react";

import { adventures } from "@/data/adventures";

export default function Adventures() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="avventure"
      className="anchor-offset bg-panel px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.4em] text-secondary">
            Da vivere
          </p>

          <h2 className="mt-4 font-heading text-5xl font-light text-primary md:text-6xl">
            Avventure
          </h2>
        </div>

        <div className="border-t border-border">
          {adventures.map((adventure, index) => {
            const isOpen = open === index;

            return (
              <div
                key={adventure.number}
                className="border-b border-border"
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`avventura-${adventure.number}`}
                    className="group flex w-full items-center gap-6 py-7 text-left"
                  >
                    <span className="w-8 text-xs tracking-[0.2em] text-secondary">
                      {adventure.number}
                    </span>

                    <span className="flex-1">
                      <span className="block font-heading text-2xl font-light text-primary transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none md:text-3xl">
                        {adventure.title}
                      </span>

                      <span
                        className={`mt-1 block text-[13px] text-secondary transition-opacity duration-300 ${
                          isOpen ? "opacity-0" : "opacity-100"
                        }`}
                      >
                        {adventure.tagline}
                      </span>
                    </span>

                    <span
                      aria-hidden="true"
                      className={`text-xl font-light text-secondary transition-transform duration-300 motion-reduce:transition-none ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h3>

                <div
                  id={`avventura-${adventure.number}`}
                  role="region"
                  aria-label={adventure.title}
                  // Esclude il contenuto chiuso da screen reader e tab
                  // senza usare `hidden`, che azzererebbe la transizione.
                  inert={!isOpen}
                  className={`grid transition-all duration-500 motion-reduce:transition-none ${
                    isOpen ? "grid-rows-[1fr] pb-10" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:gap-10 md:pl-14">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-photo bg-panel-photo md:aspect-auto md:min-h-[360px]">
                        <Image
                          src={adventure.image}
                          alt={adventure.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 40vw"
                          className="object-cover"
                        />
                      </div>

                      <div>
                        <p className="font-heading text-2xl font-light leading-snug text-primary">
                          {adventure.tagline}
                        </p>

                        <div className="mt-5 space-y-4 text-[15px] leading-7 text-secondary">
                          {adventure.paragraphs.map((text) => (
                            <p key={text}>{text}</p>
                          ))}
                        </div>

                        <dl className="mt-7 grid gap-x-8 gap-y-4 border-t border-border pt-6 sm:grid-cols-2">
                          {adventure.facts.map((fact) => (
                            <div key={fact.label}>
                              <dt className="text-xs uppercase tracking-[0.24em] text-secondary">
                                {fact.label}
                              </dt>

                              <dd className="mt-1 text-sm leading-6 text-primary">
                                {fact.value}
                              </dd>
                            </div>
                          ))}
                        </dl>

                        <ul className="mt-6 space-y-2">
                          {adventure.tips.map((tip) => (
                            <li
                              key={tip}
                              className="flex gap-3 text-[13px] leading-6 text-secondary"
                            >
                              <Lightbulb
                                size={15}
                                aria-hidden="true"
                                className="mt-1 shrink-0 text-accent"
                              />
                              {tip}
                            </li>
                          ))}
                        </ul>

                        <a
                          href={adventure.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-8 inline-flex items-center gap-2 border-b border-primary pb-1 text-xs uppercase tracking-[0.24em] text-primary transition hover:text-accent"
                        >
                          {adventure.link.label}
                          <ArrowUpRight size={14} aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
