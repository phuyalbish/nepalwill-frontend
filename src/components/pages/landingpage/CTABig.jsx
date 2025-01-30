import React from "react";

import MainButton from "@/components/buttons/MainButton.jsx";

import cta from "@/assets/CTABigImg.png";
function CTABig() {
  return (
    <div className="w-full h-[45rem] relative">
      <img src={cta} alt="" className="z-0 absolute h-full select-none" />
      <div
        style={{
          background: "linear-gradient(to left, #89a2e5 90%, transparent 100%)",
        }}
        className="absolute z-10 flex flex-col items-center  justify-center  h-full bg-secondary w-8/12 right-0"
      ></div>
      <div className="absolute z-20 md:w-6/12 w-screen left-[45rem] md:pr-10 flex flex-col gap-5 items-start font-heading h-full justify-center">
        <div className="text-[3.15rem] font-medium">
          "Join or create an impactful project, help by providing necessary
          materials directly to students, as we do not accept cash donations."
        </div>

        <div className="flex w-[18rem] animate-slideUp">
          <MainButton text="Initiate a project with NepalWill" />
        </div>
      </div>
    </div>
  );
}

export default CTABig;
