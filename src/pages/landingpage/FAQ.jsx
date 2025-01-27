import React, { useState } from "react";
import SectionHeadingTile from "@/components/tiles/SectionHeadingTile.jsx";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";

export default function OurSupport() {
  const faqs = [
    {
      question: "What is NepalWill?",
      answer: "NCCS College",
    },
    {
      question: "When did NepalWill started working?",
      answer: "ABC Academy",
    },
    {
      question: "How can i volunteer in NepalCan?",
      answer: "XYZ Hall",
    },
    {
      question: "Where is NepalWill office?",
      answer: "NCCS College",
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
              <div className="mt-2 text-gray-700 animate-slideUp">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
