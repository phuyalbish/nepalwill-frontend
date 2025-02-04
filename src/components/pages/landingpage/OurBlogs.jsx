import React, { useState, useEffect, useRef } from "react";
import image1 from "@/assets/splashImg1.png";
import image2 from "@/assets/splashImg2.png";
import image3 from "@/assets/splashImg3.png";
import image4 from "@/assets/splashImg4.png";
import BlogTile from "@/components/tiles/BlogTile";
import SectionHeadingTile from "@/components/tiles/SectionHeadingTile.jsx";
import { Carousel } from "@mantine/carousel";

export default function OurBlogs() {
  const blogs = [
    {
      image: image1,
      title: "English teaching using Google Meet by Judy - Iran",
      name: "Ram Bahadur",
      date: "8:00 AM",
      category: "Teaching",
    },
    {
      image: image2,
      title: "Nepal in the eye of 11 years old Kid.",
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

  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div className="flex  flex-col justify-center gap-10">
      <SectionHeadingTile heading="Our Blogs" />
      <div
        ref={containerRef}
        className={`hidden sm:flex flex-wrap  justify-between transition-all duration-500 ${
          isVisible ? "md:animate-slideUpEvent opacity-100" : "md:opacity-0"
        }`}
      >
        {blogs.map((blog, index) => (
          <BlogTile
            key={index}
            image={blog.image}
            title={blog.title}
            name={blog.name}
            date={blog.date}
            category={blog.category}
          />
        ))}
      </div>

      <div className="sm:hidden block relative">
        <Carousel withIndicators height={200}>
          {blogs.map((blog, index) => (
            <Carousel.Slide key={index}>
              <BlogTile
                key={index}
                image={blog.image}
                title={blog.title}
                name={blog.name}
                date={blog.date}
                category={blog.category}
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
