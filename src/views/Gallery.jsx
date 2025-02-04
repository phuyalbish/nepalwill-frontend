import React from "react";
import PageLayout from "@/components/layouts/PageLayout";
import SectionHeadingTile from "@/components/tiles/SectionHeadingTile";

import image1 from "@/assets/gallery1.png";
import image2 from "@/assets/gallery2.png";
import image3 from "@/assets/gallery3.png";
import image4 from "@/assets/gallery4.png";
import image5 from "@/assets/gallery5.png";
import image6 from "@/assets/gallery6.png";
import image7 from "@/assets/gallery7.png";
import "@/assets/styles/mansonry.css";

function Gallery() {
  const images = [
    {
      src: image2,
      class: "wide"
    },
    {
      src: image1,
      class: "normal"
    },
    
    {
      src: image3,
      class: "normal"
    },
    {
      src: image4,
      class: "wide"
    },
    {
      src: image5,
      class: "big"
    },
    {
      src: image6,
      class: "wide"
    },
    {
      src: image7,
      class: "tall"
    },
  ]
  return (
    <PageLayout>
      <div className="flex sm:w-[90vw]  m-auto flex-col justify-center items-center gap-10">
        <SectionHeadingTile heading="Gallery" />
        <div className="gallery ">
          {images.map((img, index) => (
            <div key={index} className={img.class}>
              <img src={img.src} alt={`Gallery Image ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}

export default Gallery;
