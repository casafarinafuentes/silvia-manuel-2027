import Divider from "@/components/ui/Divider";
import Section from "@/components/ui/Section";

import { timeline } from "@/data/timeline";
import { timelineIcons } from "@/lib/icons";

export default function Timeline() {
  return (
    <Section>
      <Divider
        title="La Giornata"
        className="mb-12"
      />

      <div className="timeline-scroll overflow-x-auto pb-4">
  <div className="mx-auto flex min-w-[1050px]">
    {timeline.map((item, index) => {
      const Icon = timelineIcons[item.icon];

      return (
        <div
          key={item.time}
          className="relative flex-1 text-center"
        >
          {/* Icona */}

          <div className="mb-5 flex justify-center">
            <Icon
              size={26}
              strokeWidth={1.4}
              className="text-primary"
            />
          </div>

          {/* Linea */}

          <div className="relative h-6">
            {index !== 0 && (
              <div className="absolute left-0 top-1/2 h-px w-1/2 -translate-y-1/2 bg-border" />
            )}

            {index !== timeline.length - 1 && (
              <div className="absolute right-0 top-1/2 h-px w-1/2 -translate-y-1/2 bg-border" />
            )}

            <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
          </div>

          <p className="mt-5 font-heading text-3xl text-primary">
            {item.time}
          </p>

          <h3 className="mt-2 text-lg text-primary">
            {item.title}
          </h3>

          {item.description && (
            <p className="mx-auto mt-2 max-w-[150px] text-sm leading-6 text-secondary">
              {item.description}
            </p>
          )}
        </div>
      );
    })}
  </div>
</div>
    </Section>
  );
}