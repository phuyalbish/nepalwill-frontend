import React from "react";
import PropTypes from "prop-types";

function SectionHeadingTile({ heading }) {
  return (
    <div className="sm:text-[2.8rem] text-[1.75rem] font-medium w-full text-center">
      {heading}
    </div>
  );
}

SectionHeadingTile.propTypes = {
  heading: PropTypes.string.isRequired,
};

export default SectionHeadingTile;
