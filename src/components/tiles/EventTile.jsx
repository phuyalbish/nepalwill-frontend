import React from "react";
import PropTypes from "prop-types";
import { IoLocationOutline } from "react-icons/io5";
import { IoTimeOutline } from "react-icons/io5";
import SecondaryButton from "@/components/buttons/SecondaryButton.jsx";
import MainButton from "@/components/buttons/MainButton.jsx";
function EventTile({ logo, title, venue, timeEnd, timeStart }) {
  const handleClick = () => {
    alert("We are Still Working on it!");
  };

  return (
    <div className="flex flex-col p-[1rem] bg-white md:w-[21rem] flex-grow md:flex-grow-0 rounded-md gap-2 shadow-sm hover:shadow-md">
      <img
        src={logo}
        alt=""
        className=" h-[14rem] rounded-lg object-cover"
        loading="lazy"
      />
      <div className="flex justify-between font-light gap-3">
        <div className="flex gap-2 items-center justify-center">
          <IoLocationOutline />
          <p className="text-sm">{venue}</p>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <IoTimeOutline />
          <p className="text-sm">
            {timeStart} - {timeEnd}
          </p>
        </div>
      </div>
      <div className="text-[1.3rem]">{title}</div>
      <div className="flex justify-between flex-grow-0 gap-3">
        <SecondaryButton text="View Detail" onClick={handleClick} />
        <MainButton text="Volunter" onClick={handleClick} />
      </div>
    </div>
  );
}

EventTile.propTypes = {
  logo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  venue: PropTypes.string.isRequired,
  timeStart: PropTypes.string.isRequired,
  timeEnd: PropTypes.string.isRequired,
};

export default EventTile;
