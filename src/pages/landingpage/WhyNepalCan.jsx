import React from "react";
import logo from "@/assets/splashImg1.png";
import { MdDone } from "react-icons/md";
import SectionHeadingTile from "@/components/tiles/SectionHeadingTile.jsx";
function WhyNepalCan() {
  const whys = [
    { title: "Bridging Educational Gaps" },
    { title: "Focus on Primary Education" },
    { title: "Interactive Learning Environment" },
    { title: "Volunteer Support from Diverse Nations" },
    { title: "Empowering Students for Global Success" },
  ];
  return (
    <div className="flex sm:w-[90vw]  m-auto flex-col justify-center items-center gap-10">
      <SectionHeadingTile heading="Why NepalWill?" />
      <div className="flex flex-col md:flex-row justify-evenly items-center gap-10 w-2/3">
        <img
          src={logo}
          alt=""
          className="sm:w-auto w-full lg:h-[20rem]  md:h-[20rem] h-auto  rounded-3xl"
        />
        <div className="flex flex-col gap-7 text-base text-default ">
          {whys.map((why, index) => (
            <div key={index} className="flex gap-5 items-center">
              <MdDone className="text-accent" />
              <p>{why.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WhyNepalCan;
