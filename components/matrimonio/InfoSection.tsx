import Section from "@/components/ui/Section";

import FAQ from "./FAQ";
import Schedule from "./Schedule";

export default function InfoSection() {
  return (
    <Section>
      <div className="grid gap-20 lg:grid-cols-[480px_1fr] lg:gap-28">
        <FAQ />
        <Schedule />
      </div>
    </Section>
  );
}