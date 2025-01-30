import React from "react";
import SectionHeadingTile from "@/components/tiles/SectionHeadingTile.jsx";
import SDImage1 from "@/assets/SDImage1.png";
import SDImage2 from "@/assets/SDImage2.svg";
export default function SustainableVision() {
  return (
    <div className="flex flex-col sm:w-[80vw]  m-auto  gap-10">
      <SectionHeadingTile heading="Linking NepalWill Vision with The Sustainable Development Goals" />
      <div className="flex gap-10">
        <div className="flex flex-col items-start gap-10">
          <img src={SDImage1} alt="" className=" w-48 h-48 select-none" />
          <div className="text-base">
            <span className="font-bold"> Access to Education: </span>We provide
            scholarships and resources to underprivileged children, ensuring
            they have access to quality education.
          </div>
        </div>

        <div className="flex flex-col gap-10 items-start">
          <img src={SDImage2} alt="" className=" w-48 h-48 select-none" />
          <div className="text-base">
            <span className="font-bold"> Skills Development: </span> Providing
            training programs tailored to the needs of the local job market,
            ensuring participants gain relevant skills.
          </div>
        </div>
      </div>
    </div>
  );
}
