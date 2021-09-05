import React, { useLayoutEffect, useRef, useState } from "react";
import { constants } from "../../../constants";

export default function DateRangePicker({
  calculatePos,
  onSubmit,
  start,
  end,
  close,
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const pickerRef = useRef();

  const [startDate, setStartDate] = useState(start ?? "");
  const [endDate, setEndDate] = useState(end ?? "");

  function handleSubmit(event) {
    event.preventDefault();

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      return;
    }

    onSubmit(startDate, endDate);
  }

  function clearDate() {
    setStartDate("");
    setEndDate("");
  }

  useLayoutEffect(() => {
    function updatePos() {
      const pickerRect = pickerRef.current.getBoundingClientRect();
      setPos(calculatePos(pickerRect));
    }

    updatePos();
    window.addEventListener("resize", updatePos);
    window.addEventListener("scroll", close);

    return () => {
      window.removeEventListener("resize", updatePos);
      window.removeEventListener("scroll", close);
    };
  }, [calculatePos, close]);

  return (
    <form onSubmit={handleSubmit}>
      <div
        className="date-range-piker"
        style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
        ref={pickerRef}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="date-piker">
          <label htmlFor="start">{constants.dateRangePicker.from}</label>
          <input
            type="date"
            id="start"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
          />
        </div>
        <div className="date-piker">
          <label htmlFor="end">{constants.dateRangePicker.to}</label>
          <input
            type="date"
            id="end"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
          />
        </div>
        <div className="date-range-controls">
          <button type="submit" className="apply-filter">
            {constants.dateRangePicker.apply}
          </button>
          <button type="button" className="clear-filter" onClick={clearDate}>
            {constants.dateRangePicker.clear}
          </button>
        </div>
      </div>
    </form>
  );
}
