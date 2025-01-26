import React from "react";
import PropTypes from "prop-types";
import { IoLocationOutline } from "react-icons/io5";
import { IoTimeOutline } from "react-icons/io5";
import SecondaryButton from "@/components/buttons/SecondaryButton.jsx";
import MainButton from "@/components/buttons/MainButton.jsx";
import logo from "@/assets/splashImg.png";
function EventTile({ title, venue, timeEnd, timeStart }) {
  const handleClick = () => {
    alert("Button Clicked!");
  };

  return (
    <div class="flex flex-col p-[1rem] bg-white md:w-[19rem] flex-grow md:flex-grow-0 rounded-md gap-2 shadow-sm hover:shadow-md">
      <img src={logo} alt="" className=" h-[14rem] rounded-lg" />
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
  title: PropTypes.string.isRequired,
  venue: PropTypes.string.isRequired,
  timeStart: PropTypes.string.isRequired,
  timeEnd: PropTypes.string.isRequired,
};

export default EventTile;
