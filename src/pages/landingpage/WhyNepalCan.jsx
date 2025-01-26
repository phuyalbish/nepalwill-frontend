import React from "react";
import SectionHeadingTile from "@/components/tiles/SectionHeadingTile.jsx";
import logo from "@/assets/splashImg.png";
function WhyNepalCan() {
  return (
    <div className="flex flex-col justify-center gap-10">
      <SectionHeadingTile heading="Why NepalWill?" />
      <div className="flex flex-col md:flex-row   items-center gap-10 justify-center">
        <img
          src={logo}
          alt=""
          className="sm:w-auto w-full lg:h-[20rem]  md:h-[20rem] h-auto  rounded-3xl"
        />
        <div className="flex flex-col gap-[3rem] w-1/2 text-base text-default opacity-50">
          <div className="">
            A foundation initiated to provide the English education to the
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyNepalCan;
