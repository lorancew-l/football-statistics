import React, { useRef, useState } from "react";
import { useHistory, useLocation } from "react-router";
import ModalOverlay from "../Modal/ModalOverlay";
import Filter from "../Search/Filter/Filter";
import DateRangePicker from "./DateRangePicker/DateRangePicker";

export default function DateRangeFilter() {
  const [showModal, setShowModal] = useState(false);
  const filterButtonRef = useRef();

  const history = useHistory();
  const { search, pathname } = useLocation();

  function calculateModalPos(modalRect) {
    const pos = { x: 0, y: 0 };
    const filterButtonRect = filterButtonRef.current.getBoundingClientRect();

    pos.y = filterButtonRect.bottom;
    pos.x = filterButtonRect.right - modalRect.width;

    return pos;
  }

  function getDateRangeFilter() {
    const query = new URLSearchParams(search);

    return { start: query.get("from"), end: query.get("to") };
  }

  function setDateRangeFilter(from, to) {
    const query = new URLSearchParams(search);

    for (const [key, value] of Object.entries({ from, to })) {
      if (!value) {
        query.delete(key);
      } else {
        query.set(key, value);
      }
    }

    query.set("page", 0);

    history.push({
      pathname: pathname,
      search: query.toString(),
    });

    setShowModal(false);
  }

  return (
    <>
      <Filter buttonRef={filterButtonRef} onClick={() => setShowModal(true)} />
      {showModal && (
        <ModalOverlay close={() => setShowModal(false)}>
          <DateRangePicker
            calculatePos={calculateModalPos}
            onSubmit={setDateRangeFilter}
            close={() => setShowModal(false)}
            {...getDateRangeFilter()}
          />
        </ModalOverlay>
      )}
    </>
  );
}
