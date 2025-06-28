import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "How quickly can you close on my property?",
      answer: "We can typically close in as little as 7-14 days, depending on your situation and needs. Our streamlined process and cash offers allow us to move much faster than traditional sales."
    },
    {
      question: "Do I need to make any repairs before selling?",
      answer: "No! We buy houses in any condition. Whether your property needs minor updates or major repairs, we'll make you a fair cash offer as-is."
    },
    {
      question: "Are there any fees or commissions?",
      answer: "No hidden fees or commissions. We cover all closing costs, and you keep the full amount of our cash offer."
    },
    {
      question: "How do you determine your offer price?",
      answer: "We analyze your property's condition, location, market value, and needed repairs to provide a fair, competitive cash offer that reflects the current market."
    },
    {
      question: "What if I'm behind on mortgage payments?",
      answer: "We specialize in helping homeowners facing financial difficulties. We can work with you to find solutions that protect your credit and provide relief from mortgage stress."
    },
    {
      question: "Can you help with inherited properties?",
      answer: "Yes! We have extensive experience with probate and inherited properties. Our team can guide you through the process and provide solutions that work for all parties involved."
    }
  ];

  return (
    <section id="faq" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get answers to the most common questions about our home buying process
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;