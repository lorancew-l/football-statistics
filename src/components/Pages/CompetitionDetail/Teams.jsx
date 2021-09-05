import React from "react";
import { useLocation } from "react-router";
import Team from "../../Team/Team";
import PageControls from "../../PaginationControls/PaginationControls";
import NoSearchResults from "../../Search/NoSearchResults/NoSearchResults";

export default function Teams({ teamsPages, showTeamDetail }) {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const currentPage = Number(query.get("page"));

  return (
    <>
      {teamsPages.length ? (
        <>
          <ul className="competition-detail-list">
            {teamsPages[currentPage].map((team) => (
              <Team
                key={team.id}
                team={team}
                showTeamDetail={showTeamDetail}
                onClick={() => showTeamDetail(team.id)}
              />
            ))}
          </ul>
          {teamsPages.length > 1 && (
            <PageControls pagesCount={teamsPages.length} />
          )}
        </>
      ) : (
        <NoSearchResults />
      )}
    </>
  );
}
