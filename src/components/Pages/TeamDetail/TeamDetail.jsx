import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useParams, useHistory } from "react-router";
import { getTeamsList, getMatchesList } from "../../../api/rest/competitions";
import { getMatchesPages } from "../../Match/getMatchesPages";
import { constants } from "../../../constants";
import Search from "../../Search/Search";
import DateRangeFilter from "../../DateRangeFilter/DateRangeFilter";
import Match from "../../Match/Match";
import ErrorSwitch from "../../Error/ErrorSwitch";
import NoSearchResults from "../../Search/NoSearchResults/NoSearchResults";
import Loader from "../../Loader/Loader";

export default function TeamDetail() {
  const history = useHistory();
  const { competitionId, teamId } = useParams();
  const { search } = useLocation();

  const [competitionInfo, setCompetitionInfo] = useState(null);
  const [error, setError] = useState(null);

  const query = new URLSearchParams(search);
  const currentPage = Number(query.get("page"));
  const searchFilter = query.get("search");
  const dateRangeFilterFrom = query.get("from");
  const dateRangeFilterTo = query.get("to");

  const matchesPages = useMemo(() => {
    if (!competitionInfo) {
      return null;
    }

    const matches = competitionInfo.matches.filter(
      (match) => match.homeTeam.id === +teamId || match.awayTeam.id === +teamId
    );
    const dateRangeFilter = {
      from: dateRangeFilterFrom,
      to: dateRangeFilterTo,
    };

    return getMatchesPages({
      matches: matches,
      teams: competitionInfo.teams,
      searchQuery: searchFilter,
      dateRangeFilter,
    });
  }, [
    searchFilter,
    dateRangeFilterFrom,
    dateRangeFilterTo,
    competitionInfo,
    teamId,
  ]);

  function showTeamDetail(teamId) {
    history.push({
      pathname: `${constants.baseUrl}competitions/${competitionId}/teams/${teamId}/`,
    });
  }

  useEffect(() => {
    let isMounted = true;

    Promise.all([getMatchesList(competitionId), getTeamsList(competitionId)])
      .then((responses) => {
        responses.forEach((response) => {
          if (!response.ok) {
            throw new Error(response.status);
          }
        });

        return Promise.all(responses.map((response) => response.json()));
      })
      .then((responses) => {
        if (isMounted) {
          setCompetitionInfo({
            name: responses[0].competition.name,
            matches: responses[0].matches,
            teams: responses[1].teams,
          });
        }
      })
      .catch((error) => setError(error));

    return () => (isMounted = false);
  }, [teamId, competitionId]);

  if (error) {
    return <ErrorSwitch status={error.message} />;
  }

  if (!matchesPages) {
    return (
      <>
        <Search filter={<DateRangeFilter />} />
        <Loader />
      </>
    );
  }

  return (
    <>
      <Search filter={<DateRangeFilter />} />
      <h1 className="team-detail-team-name">
        {`${competitionInfo.name} — 
          ${
            competitionInfo.teams.find((team) => team.id === Number(teamId))
              .name
          }`}
      </h1>
      {matchesPages.length ? (
        <ul className="team-detail-list">
          {matchesPages[currentPage].map((match) => (
            <Match key={match.id} match={match} onTeamClick={showTeamDetail} />
          ))}
        </ul>
      ) : (
        <NoSearchResults />
      )}
    </>
  );
}
