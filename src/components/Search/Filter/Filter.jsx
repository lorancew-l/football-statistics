import React from "react";
import FilterIcon from "../../../images/icons/filter.svg";

export default function Filter({ onClick, buttonRef }) {
  return (
    <button className="filter-button" onClick={onClick} ref={buttonRef}>
      <img src={FilterIcon} alt="search filter button" />
    </button>
  );
}
