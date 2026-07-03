import * as React from "react";
import { Container, Section, SectionHeading, Accordion } from "~/components/ui";
import { faqs } from "~/data/faqs";

interface FAQProps {
  items?: { question: string; answer: string }[];
  title?: string;
}

export const FAQ: React.FC<FAQProps> = ({ items = faqs, title = "Frequently Asked Questions" }) => {
  return (
    <Section background="soft">
      <Container narrow>
        <SectionHeading eyebrow="FAQ" title={title} />
        <div className="mt-14 rounded-4xl bg-white p-4 shadow-soft md:p-10">
          <Accordion items={items} />
        </div>
      </Container>
    </Section>
  );
};

export default FAQ;
