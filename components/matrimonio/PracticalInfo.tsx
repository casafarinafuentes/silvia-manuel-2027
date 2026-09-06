import Section from "@/components/ui/Section";

import FaqColumn from "./FaqColumn";
import ScheduleCard from "./ScheduleCard";

export default function PracticalInfo() {
  return (
    <Section id="faq" className="anchor-offset">
      <div className="grid items-start gap-16 lg:grid-cols-[1fr_340px]">
        {/* FAQ */}

        <FaqColumn />

        {/* Card timeline */}

        <div className="lg:justify-self-end">
          <ScheduleCard />
        </div>
      </div>
    </Section>
  );
}