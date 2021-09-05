import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import arrowIcon from "../../images/icons/rightArrow.svg";
import getPagesNumbers from "./getPageNumbers";
import { constants } from "../../constants";

export default function PageControls({ pagesCount }) {
  const { search, pathname } = useLocation();
  const query = new URLSearchParams(search);
  const currentPage = Number(query.get("page"));
  const history = useHistory();

  const [controlsNumber, setControlsNumber] = useState(
    calculateControlsNumber()
  );

  function setPage(pageNumber) {
    query.set("page", pageNumber);

    history.push({
      pathname: pathname,
      search: query.toString(),
    });
  }

  function calculateControlsNumber() {
    if (window.innerWidth > constants.screenSizes.small) {
      return constants.paginationControlsNumber.medium;
    }

    return constants.paginationControlsNumber.small;
  }

  useEffect(() => {
    function recalculateControlsNumber() {
      setControlsNumber(calculateControlsNumber());
    }

    window.addEventListener("resize", recalculateControlsNumber);

    return () => window.removeEventListener("resize", recalculateControlsNumber);
  }, []);

  const pageNumbers = getPagesNumbers(currentPage, pagesCount, controlsNumber);

  return (
    <div className="pagination-controls-container">
      <button
        className="pagination-control-arrow"
        onClick={() => setPage((pagesCount + currentPage - 1) % pagesCount)}
      >
        <img
          alt="go to previous page"
          src={arrowIcon}
          style={{ transform: "rotate(180deg)" }}
        />
      </button>
      {pageNumbers.map((number) => (
        <div
          key={number}
          className={
            number === currentPage
              ? "pagination-control current"
              : "pagination-control"
          }
          onClick={() => setPage(number)}
        >
          {number + 1}
        </div>
      ))}
      <button
        className="pagination-control-arrow"
        onClick={() => setPage((currentPage + 1) % pagesCount)}
      >
        <img alt="go to next page" src={arrowIcon} />
      </button>
    </div>
  );
}
