import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { getCompetitionsList } from "../../../api/rest/competitions";
import Search from "../../Search/Search";
import Competition from "./Competition/Competition";
import PageControls from "../../PaginationControls/PaginationControls";
import NoSearchResults from "../../Search/NoSearchResults/NoSearchResults";
import { getPages } from "./prepareCompetitionsData";
import Loader from "../../Loader/Loader";
import ErrorSwitch from "../../Error/ErrorSwitch";
import filterCompetitions from "./filterCompetitions";

export default function Competitions() {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const searchQuery = query.get("search");
  const currentPage = Number(query.get("page"));

  const [competitionsList, setCompetitionsList] = useState(null);
  const [error, setError] = useState(null);

  const competitionsPages = useMemo(() => {
    if (!competitionsList) {
      return null;
    }

    return getPages(competitionsList, searchQuery);
  }, [competitionsList, searchQuery]);

  useEffect(() => {
    getCompetitionsList()
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.status);
      })
      .then((response) => {
        setCompetitionsList(filterCompetitions(response.competitions));
      })
      .catch((error) => setError(error));
  }, []);

  if (error) {
    return <ErrorSwitch status={error.message} />;
  }

  if (!competitionsPages) {
    return (
      <>
        <Search />
        <Loader />
      </>
    );
  }

  return (
    <>
      <Search />
      {competitionsPages.length ? (
        <>
          <ul className="competitions">
            {competitionsPages[currentPage].map((competition) => (
              <Competition key={competition.id} competition={competition} />
            ))}
          </ul>
          {competitionsPages.length > 1 && (
            <PageControls pagesCount={competitionsPages.length} />
          )}
        </>
      ) : (
        <NoSearchResults />
      )}
    </>
  );
}
