import React, { useState } from "react";
import lensIcon from "../../images/icons/lens.svg";
import { constants } from "../../constants";
import { useLocation, useHistory } from "react-router-dom";

export default function Search({ filter }) {
  const { search, pathname } = useLocation();
  const history = useHistory();
  const query = new URLSearchParams(search);

  const searchParamValue = query.get("search");
  const [searchOnFocus, setSearchOnFocus] = useState(false);

  function setSearchFilter(event) {
    const searchQuery = event.target.value;

    if (!searchQuery) {
      query.delete("search");
    } else {
      query.set("search", searchQuery);
    }

    query.set("page", 0);

    history.push({
      pathname: pathname,
      search: query.toString(),
    });
  }

  return (
    <div className={searchOnFocus ? "search focus" : "search"}>
      <div className="search-content">
        <div className="search-icon-container">
          <img src={lensIcon} alt="search" />
        </div>
        <input
          className="search-input"
          placeholder={constants.searchPlaceHolderText}
          value={searchParamValue ?? ""}
          onChange={(event) => setSearchFilter(event)}
          onFocus={() => setSearchOnFocus(true)}
          onBlur={() => setSearchOnFocus(false)}
        />
        {filter}
      </div>
    </div>
  );
}
