import React, { useState, useEffect, useRef } from "react";
import logo1 from "@/assets/splashImg1.png";
import logo2 from "@/assets/splashImg2.png";
import logo3 from "@/assets/splashImg3.png";
import logo4 from "@/assets/splashImg4.png";
import EventTile from "@/components/tiles/EventTile";
import SectionHeadingTile from "@/components/tiles/SectionHeadingTile.jsx";
import { Carousel } from "@mantine/carousel";
export default function UpcomingEvents() {
  const events = [
    {
      logo: logo1,
      title: "Poem Competition",
      venue: "NCCS College",
      timeStart: "8:00 AM",
      timeEnd: "11:00 AM",
    },
    {
      logo: logo2,
      title: "Art Workshop",
      venue: "ABC Academy",
      timeStart: "10:00 AM",
      timeEnd: "1:00 PM",
    },
    {
      logo: logo3,
      title: "Music Concert",
      venue: "XYZ Hall",
      timeStart: "6:00 PM",
      timeEnd: "9:00 PM",
    },
    {
      logo: logo4,
      title: "Poem Competition",
      venue: "NCCS College",
      timeStart: "8:00 AM",
      timeEnd: "11:00 AM",
    },
  ];

  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), 500); // Delay to prevent flickering
        } else {
          setTimeout(() => setIsVisible(false), 500);
        }
      },
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
    <div className="flex flex-col justify-center gap-10">
      <SectionHeadingTile heading="Upcoming Events of NepalWill" />

      <div
        ref={containerRef}
        className={`sm:flex hidden flex-wrap gap-1 justify-between flex-grow-0 transition-all duration-500 ${
          isVisible ? "md:animate-slideUpEvent opacity-100" : "md:opacity-0"
        }`}
      >
        {events.map((event, index) => (
          <EventTile
            key={index}
            logo={event.logo}
            title={event.title}
            venue={event.venue}
            timeStart={event.timeStart}
            timeEnd={event.timeEnd}
          />
        ))}
      </div>
      <div className="sm:hidden block relative">
        <Carousel withIndicators height={200}>
          {events.map((event, index) => (
            <Carousel.Slide key={index}>
              <EventTile
                logo={event.logo}
                title={event.title}
                venue={event.venue}
                timeStart={event.timeStart}
                timeEnd={event.timeEnd}
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
