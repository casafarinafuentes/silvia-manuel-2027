import Section from "@/components/ui/Section";
import { dressCode } from "@/data/dressCode";
import { dressCodeIcons } from "@/lib/icons";

export default function DressCode() {
  return (
    <Section>
      <p className="mb-7 text-center text-xs uppercase tracking-[0.35em] text-secondary">
        Dress Code
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dressCode.map((item) => {
          const Icon = dressCodeIcons[item.icon];

          return (
            <div
              key={item.title}
              className="rounded-sm border border-border bg-panel p-7 text-center"
            >
              <div className="flex justify-center text-primary">
                <Icon
                  size={48}
                  strokeWidth={1.2}
                />
              </div>

              <h3 className="mt-4 font-heading text-3xl text-primary">
                {item.title}
              </h3>

              <p className="mt-3 leading-7 text-secondary">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}