import React from "react";
import EventTile from "@/components/tiles/EventTile";
export default function UpcomingEvents() {
  const events = [
    {
      title: "Poem Competition",
      venue: "NCCS College",
      timeStart: "8:00 AM",
      timeEnd: "11:00 AM",
    },
    {
      title: "Art Workshop",
      venue: "ABC Academy",
      timeStart: "10:00 AM",
      timeEnd: "1:00 PM",
    },
    {
      title: "Music Concert",
      venue: "XYZ Hall",
      timeStart: "6:00 PM",
      timeEnd: "9:00 PM",
    },
    {
      title: "Poem Competition",
      venue: "NCCS College",
      timeStart: "8:00 AM",
      timeEnd: "11:00 AM",
    },
  ];
  return (
    <div className="flex flex-col justify-center gap-10">
      <div className="sm:text-[3rem] text-[1.75rem] w-full text-center">
        Upcoming Events of NepalWill
      </div>
      <div className="flex flex-wrap gap-4  justify-center flex-grow-0 animate-slideUpEvent">
        {events.map((event, index) => (
          <EventTile
            key={index}
            title={event.title}
            venue={event.venue}
            timeStart={event.timeStart}
            timeEnd={event.timeEnd}
          />
        ))}
      </div>
    </div>
  );
}
