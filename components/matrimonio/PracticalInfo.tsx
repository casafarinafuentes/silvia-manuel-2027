import Section from "@/components/ui/Section";

import FaqColumn from "./FaqColumn";

export default function PracticalInfo() {
  return (
    <Section id="faq" className="anchor-offset">
      <div className="mx-auto max-w-4xl">
        <FaqColumn />
      </div>
    </Section>
  );
}
