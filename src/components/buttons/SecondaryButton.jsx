import React from "react";
import PropTypes from "prop-types";

import { FaCircleRight } from "react-icons/fa6";
function SecondaryButton({ text, onClick }) {
  return (
    <div
      className="border w-full border-primary rounded-lg py-2 px-4  cursor-default hover:bg-dark-primary flex gap-2 justify-center items-center "
      onClick={onClick}
    >
      {text}
    </div>
  );
}

SecondaryButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default SecondaryButton;
