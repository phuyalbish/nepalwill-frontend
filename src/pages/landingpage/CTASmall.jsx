import React from "react";

import MainButton from "@/components/buttons/MainButton.jsx";

import cta from "@/assets/ctaSmallImg.png";
function CTASmall() {
  return (
    <div className="w-full h-[22rem] relative">
      <img
        src={cta}
        alt=""
        className="z-0 absolute h-full right-0 select-none"
      />
      <div
        style={{
          background:
            "linear-gradient(to right, #89a2e5 70%, transparent 100%)",
        }}
        className="absolute z-10 flex flex-col items-center  justify-center  h-full bg-secondary w-8/12"
      ></div>
      <div className="absolute z-20 md:w-7/12 w-screen pl-5 md:pl-20 md:pr-10 flex flex-col gap-5 items-start font-heading h-full justify-center">
        <div className="text-[2.35rem] font-medium">
          Empower students to succeed in a global environment
        </div>
        <div className="text-default font-medium">Be a Leader</div>

        <div className="flex w-[10rem] animate-slideUp">
          <MainButton text="Get Involved" />
        </div>
      </div>
    </div>
  );
}

export default CTASmall;
