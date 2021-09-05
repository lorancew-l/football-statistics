import React from "react";
import { useLocation } from "react-router";

export default function NoSearchResults() {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const searchQuery = query.get("search");

  return (
    <div className="no-search-results">{`No results for "${searchQuery}"`}</div>
  );
}
