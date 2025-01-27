import React from "react";
import image1 from "@/assets/splashImg1.png";
import image2 from "@/assets/splashImg2.png";
import image3 from "@/assets/splashImg3.png";
import image4 from "@/assets/splashImg4.png";
import BlogTile from "@/components/tiles/BlogTile";
import SectionHeadingTile from "@/components/tiles/SectionHeadingTile.jsx";
export default function OurBlogs() {
  const events = [
    {
      image: image1,
      title: "English teaching using google meet by Judy - Iran",
      name: "Ram Bahadur",
      date: "8:00 AM",
      category: "Teaching",
    },
    {
      image: image2,
      title: "Nepal in the eye of 11years old Kid.",
      name: "Ram Bahadur",
      date: "10:00 AM",
      category: "Insights",
    },
    {
      image: image3,
      title: "My favorite Pet - A writing of Grade 8 Student",
      name: "Ram Bahadur",
      date: "6:00 PM",
      category: "Student",
    },
    {
      image: image4,
      title: "How to be safe in school.",
      name: "Ram Bahadur",
      date: "8:00 AM",
      category: "Knowledge",
    },
  ];
  return (
    <div className="flex sm:w-[90vw]  m-auto flex-col justify-center gap-10">
      <SectionHeadingTile heading="Our Blogs" />
      <div className="flex flex-wrap gap-4  justify-center flex-grow-0">
        {events.map((event, index) => (
          <BlogTile
            key={index}
            image={event.image}
            title={event.title}
            name={event.name}
            date={event.date}
            category={event.category}
          />
        ))}
      </div>
    </div>
  );
}
