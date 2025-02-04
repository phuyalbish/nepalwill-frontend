import React from "react";
import MainButton from "@/components/buttons/MainButton.jsx";
import cta from "@/assets/CTABigImg.png";
import "@/styles/CTABig.css";

function CTABig() {
  return (
    <div className="w-full h-[45rem] relative">
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
          <div className="text-[2rem] md:text-[2rem] lg:text-[2.5rem] font-medium">
            "Join or create an impactful project, help by providing necessary
            materials directly to students, as we do not accept cash donations."
          </div>

          <div className="flex w-[18rem] animate-slideUp">
            <MainButton text="Initiate a project with NepalWill" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CTABig;
