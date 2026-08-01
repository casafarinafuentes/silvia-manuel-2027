import Divider from "@/components/ui/Divider";
import Accordion from "@/components/ui/Accordion";

import { practicalInfoLeft } from "@/data/faq";

export default function FAQ() {
  return (
    <div>
      <Divider
        title="FAQ"
        className="mb-10"
      />

      {practicalInfoLeft.map((item) => (
        <Accordion
          key={item.title}
          title={item.title}
          content={item.content}
        />
      ))}
    </div>
  );
}