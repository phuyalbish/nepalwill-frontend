import React from "react";
import PropTypes from "prop-types";
import { CiCalendarDate, CiUser } from "react-icons/ci";
function BlogTile({ image, title, name, date, category }) {
  const handleClick = () => {
    alert("We are Still Working on it!");
  };

  return (
    <div className="flex flex-col p-[1rem] bg-white md:w-[19rem] flex-grow md:flex-grow-0 rounded-md gap-2 shadow-sm hover:shadow-md">
      <img src={image} alt="" className=" h-[14rem] rounded-lg" />

      <div className="text-sm font-semibold text-secondary">{category}</div>
      <div className="text-[1.3rem]">{title}</div>
      <div className="flex justify-between font-light gap-3">
        <div className="flex gap-2 items-center justify-center">
          <CiUser />
          <p className="text-sm">{name}</p>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <CiCalendarDate />
          <p className="text-sm">{date}</p>
        </div>
      </div>
    </div>
  );
}

BlogTile.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default BlogTile;
