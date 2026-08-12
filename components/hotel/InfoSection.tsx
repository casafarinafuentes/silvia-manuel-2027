import Section from "@/components/ui/Section";

import FAQ from "./FAQ";
import Map from "./Map";

export default function InfoSection() {
  return (
    <Section className="pt-10 pb-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
          <div className="h-full">
            <Map />
          </div>

          <div className="h-full">
            <FAQ />
          </div>
        </div>
      </div>
    </Section>
  );
}