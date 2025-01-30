import React, { useState } from "react";
import SectionHeadingTile from "@/components/tiles/SectionHeadingTile.jsx";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";

export default function OurSupport() {
  const faqs = [
    {
      question: "What is NepalWill?",
      answer:
        "NepalWill is an initiative aimed at empowering individuals and communities in Nepal through education, skill development, and volunteerism. It provides various programs that help improve the lives of people in need.",
    },
    {
      question: "When did NepalWill start working?",
      answer:
        "NepalWill started its journey in 2015, with a vision to bring positive change to society by supporting education, health, and sustainable development initiatives across Nepal.",
    },
    {
      question: "How can I volunteer in NepalWill?",
      answer:
        "You can volunteer with NepalWill by visiting our website and filling out a volunteer application form. Alternatively, you can reach out to us via email or social media to learn about upcoming volunteer opportunities.",
    },
    {
      question: "Where is NepalWill's office?",
      answer:
        "NepalWill’s office is located in Kathmandu, Nepal. Our central office is the heart of our operations, where we coordinate various community development projects and partnerships.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null); // Track open FAQ

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle between open/close
  };

  return (
    <div className="flex sm:w-[90vw] m-auto flex-col justify-center gap-10">
      <SectionHeadingTile heading="Frequently Asked Questions" />
      <div className="flex flex-col flex-wrap gap-5 justify-evenly flex-grow-0 w-[60vw] m-auto">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="flex flex-col border border-t-0 border-r-0 border-l-0 p-2 border-b-slate-500"
          >
            <div className="flex justify-between font-bold items-center">
              <div>{faq.question}</div>
              <div
                onClick={() => toggleAnswer(index)}
                className="cursor-pointer"
              >
                {openIndex === index ? <FaCaretUp /> : <FaCaretDown />}
              </div>
            </div>
            {openIndex === index && (
              <div className="mt-2 text-gray-700">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
