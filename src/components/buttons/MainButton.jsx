import React from "react";
import PropTypes from "prop-types";

import { FaCircleRight } from "react-icons/fa6";
function MainButton({ text, onClick }) {
  return (
    <div
      className="bg-primary heading-font  select-none w-full rounded-lg py-2 px-4 cursor-default hover:bg-dark-primary flex gap-2 justify-between items-center "
      onClick={onClick}
    >
      <p>{text}</p>
      <FaCircleRight />
    </div>
  );
}

MainButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default MainButton;
