import React from "react";
import image1 from "@/assets/support1.png";
import image2 from "@/assets/support2.png";
import image3 from "@/assets/support3.png";
import image4 from "@/assets/support4.png";
import image5 from "@/assets/support5.png";
import SectionHeadingTile from "@/components/tiles/SectionHeadingTile.jsx";
export default function OurSupport() {
  const supports = [
    {
      image: image1,
    },
    {
      image: image2,
    },
    {
      image: image3,
    },
    {
      image: image4,
    },
    {
      image: image5,
    },
  ];
  return (
    <div className="flex sm:w-[90vw]  m-auto flex-col justify-center gap-10">
      <SectionHeadingTile heading="Our Support and Trustees" />
      <div className="flex flex-wrap gap-10  justify-evenly flex-grow-0">
        {supports.map((support, index) => (
          <img key={index} src={support.image} className="w-28 h-28" />
        ))}
      </div>
    </div>
  );
}
