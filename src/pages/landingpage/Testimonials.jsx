import React from "react";
import image1 from "@/assets/splashImg1.png";
import image2 from "@/assets/splashImg2.png";
import image3 from "@/assets/splashImg3.png";
import image4 from "@/assets/splashImg4.png";
import TestimonialTile from "@/components/tiles/TestimonialTile.jsx";
import SectionHeadingTile from "@/components/tiles/SectionHeadingTile.jsx";
export default function Testimonials() {
  const testimonials = [
    {
      image: image1,
      name: "Sujan Sharma",
      description:
        "NepalCan has been constantly working to make the students better in academics and the extra curricular activities. More Power to EFN team.",
    },
    {
      image: image2,
      name: "Priya Koirala",
      description:
        "NepalCan has been constantly working to make the students better in academics and the extra curricular activities. More Power to EFN team.",
    },
    {
      image: image3,
      name: "Aarav Thapa",
      description:
        "NepalCan has been constantly working to make the students better in academics and the extra curricular activities. More Power to EFN team.",
    },
    {
      image: image4,
      name: "Anjali Rai",
      description:
        "NepalCan has been constantly working to make the students better in academics and the extra curricular activities. More Power to EFN team. alsd asdm kas",
    },
  ];
  const testimonials2 = [
    {
      image: image1,
      name: "Sujan Sharma",
      description:
        "NepalCan has been constantly working to make the students better in academics and the extra curricular activities. More Power to EFN team.",
    },
    {
      image: image2,
      name: "Priya Koirala",
      description:
        "NepalCan has been constantly working to make the students better in academics and the extra curricular activities. More Power to EFN team.",
    },
    {
      image: image3,
      name: "Aarav Thapa",
      description:
        "NepalCan has been constantly working to make the students better in academics and the extra curricular activities. More Power to EFN team.",
    },
  ];
  return (
    <div className="flex  m-auto flex-col justify-center gap-5">
      <SectionHeadingTile heading="What People Say about us!" />
      <div className="flex gap-4  justify-center flex-grow-0 animate-marquee1 w-screen">
        {testimonials.map((event, index) => (
          <TestimonialTile
            key={index}
            image={event.image}
            name={event.name}
            description={event.description}
          />
        ))}
      </div>

      <div className="flex gap-4  justify-center flex-grow-0 animate-marquee2 w-screen">
        {testimonials2.map((event, index) => (
          <TestimonialTile
            key={index}
            image={event.image}
            name={event.name}
            description={event.description}
          />
        ))}
      </div>
    </div>
  );
}
