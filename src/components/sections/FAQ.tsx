import * as React from "react";
import { Container, Section, SectionHeading, Accordion } from "~/components/ui";
import { faqs } from "~/data/faqs";
import { siteContent } from "~/data/siteContent";

interface FAQProps {
  items?: { question: string; answer: string }[];
  title?: string;
}

export const FAQ: React.FC<FAQProps> = ({ items = faqs, title = siteContent.faqSection.title }) => {
  return (
    <Section background="soft">
      <Container narrow>
        <SectionHeading eyebrow={siteContent.faqSection.eyebrow} title={title} />
        <div className="mt-14 rounded-4xl bg-white p-4 shadow-soft md:p-10">
          <Accordion items={items} />
        </div>
      </Container>
    </Section>
  );
};

export default FAQ;
