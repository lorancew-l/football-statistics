import React from "react";
import { useLocation } from "react-router";
import Match from "../../Match/Match";
import PageControls from "../../PaginationControls/PaginationControls";
import NoSearchResults from "../../Search/NoSearchResults/NoSearchResults";

export default function Matches({ matchesPages, showTeamDetail }) {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const currentPage = Number(query.get("page"));

  return (
    <>
      {matchesPages.length ? (
        <>
          <ul className="competition-detail-list">
            {matchesPages[currentPage].map((match) => (
              <Match
                key={match.id}
                match={match}
                onTeamClick={showTeamDetail}
              />
            ))}
          </ul>
          {matchesPages.length > 1 && (
            <PageControls pagesCount={matchesPages.length} />
          )}
        </>
      ) : (
        <NoSearchResults />
      )}
    </>
  );
}
