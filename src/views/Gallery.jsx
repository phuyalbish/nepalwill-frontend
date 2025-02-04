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
  const images = [image1, image2, image3, image4, image5, image6, image7];
  return (
    <PageLayout>
      <div className="flex sm:w-[90vw]  m-auto flex-col justify-center items-center gap-10">
        <SectionHeadingTile heading="Gallery" />
        <div className="grid-wrapper">
          {images.map((src, index) => (
            <div key={index}>
              <img src={src} alt={`Gallery Image ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}

export default Gallery;
