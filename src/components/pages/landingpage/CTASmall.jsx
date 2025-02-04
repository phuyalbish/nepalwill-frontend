import React from "react";

import "@/styles/CTABig.css";
import MainButton from "@/components/buttons/MainButton.jsx";

import cta from "@/assets/ctaSmallImg.png";
function CTASmall() {
  return (
    <div className="w-full h-[22rem] relative">
      <img
        src={cta}
        alt=""
        className="absolute h-full w-full object-cover select-none"
      />

      <div
        className="cta-container
          absolute z-10 flex flex-col items-center justify-center 
           h-full w-full md:w-8/12 right-0
        "
      >
        <div className="absolute z-20 pl-10 md:pl-32 pr-10 md:pr-20 flex flex-col gap-5 items-start font-heading h-full justify-center">
          <div className="text-[2rem] sm:text-[2.5rem] font-medium">
            Empower students to succeed in a global environment
          </div>
          <div className=" md:block hidden text-default font-medium">
            NepalWill equips students with the skills, knowledge, and confidence
            to compete and excel on a global stage. Through cutting-edge
            education, digital empowerment, and leadership development, we
            ensure that Nepal’s youth are not just prepared for the future—they
            are ready to lead it.
          </div>

          <div className="flex w-[10rem] animate-slideUp">
            <MainButton text="Get Involved" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CTASmall;
