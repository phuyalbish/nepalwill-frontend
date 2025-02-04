import React from "react";
import logo from "@/assets/splashImg1.png";
import { MdDone } from "react-icons/md";
import SectionHeadingTile from "@/components/tiles/SectionHeadingTile.jsx";
function WhyNepalWill() {
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
      <div className="flex flex-col lg:flex-row justify-evenly items-center gap-10 sm:w-2/3">
        <img
          src={logo}
          alt=""
          className="sm:w-auto w-full lg:h-[20rem]  md:h-[20rem] h-auto  rounded-3xl"
        />
        <ul
          className="flex flex-col gap-7 w-full"
          style={{ listStyleType: "url('')" }}
        >
          {whys.map((why, index) => (
            <li className="flex gap-[0.8rem] items-center">
              <img src="/check_circle.svg" alt="" className="w-5 h-5" />
              <span>{why.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default WhyNepalWill;
