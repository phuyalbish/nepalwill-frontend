import React from "react";
import PropTypes from "prop-types";
import Quote from "@/assets/Quote.png";
import { FaFacebook, FaTwitter, FaLinkedinIn } from "react-icons/fa";
function TestimonialTile({ image, name, description }) {
  return (
    <div className="flex sm:flex-col flex-row lg:flex-row  relative  p-[1rem] bg-white border border-secondary rounded-md gap-5 shadow-sm hover:shadow-md">
      <img src={Quote} alt="" className="z-20 h-10 absolute right-5 top-5" />
      <div className="flex flex-col gap-3 justify-center">
        <img src={image} alt="" className=" h-20 w-24 rounded-full" />
        <div className="flex gap-3">
          <FaFacebook />
          <FaTwitter />
          <FaLinkedinIn />
        </div>
      </div>
      <div className="flex flex-col  gap-1">
        <div className="font-bold text-lg">{name}</div>
        <div className="text-base font-light">{description}</div>
      </div>
    </div>
  );
}

TestimonialTile.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default TestimonialTile;
