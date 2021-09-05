import React, { useEffect, useState, useMemo } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { useLocation, useParams } from "react-router";
import { getMatchesList, getTeamsList } from "../../../api/rest/competitions";
import { getMatchesPages } from "../../Match/getMatchesPages";
import { getTeamsPages } from "../../Team/getTeamsPages";
import { constants } from "../../../constants";
import Search from "../../Search/Search";
import ErrorSwitch from "../../Error/ErrorSwitch";
import DateRangeFilter from "../../DateRangeFilter/DateRangeFilter";
import Matches from "./Matches";
import Teams from "./Teams";
import Loader from "../../Loader/Loader";

export default function CompetitionDetail() {
  const { competitionId } = useParams();
  const history = useHistory();
  const { pathname, search } = useLocation();

  const [competitionInfo, setCompetitionInfo] = useState(null);

  const [error, setError] = useState(null);

  const query = new URLSearchParams(search);
  const searchQuery = query.get("search");
  const dateRangeFilterFrom = query.get("from");
  const dateRangeFilterTo = query.get("to");

  const showMatches = pathname.includes("matches");

  const competitionPages = useMemo(() => {
    if (!competitionInfo) {
      return null;
    }

    const dateRangeFilter = {
      from: dateRangeFilterFrom,
      to: dateRangeFilterTo,
    };
    const matches = competitionInfo.matchesList;
    const teams = competitionInfo.teamsList;

    return {
      matchesPages: getMatchesPages({
        matches,
        teams,
        searchQuery,
        dateRangeFilter,
      }),
      teamsPages: getTeamsPages(teams, searchQuery),
    };
  }, [competitionInfo, searchQuery, dateRangeFilterFrom, dateRangeFilterTo]);

  function switchSection() {
    const section = showMatches ? "teams" : "matches";
    const search = searchQuery ? `?page=0&search=${searchQuery}` : "?page=0";

    history.push({
      pathname: `${constants.baseUrl}competitions/${competitionId}/${section}/`,
      search,
    });
  }

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
            competition: responses[0].competition,
            matchesList: responses[0].matches,
            teamsList: responses[1].teams,
          });
        }
      })
      .catch((error) => setError(error));

    return () => (isMounted = false);
  }, [competitionId]);

  if (error) {
    return <ErrorSwitch status={error.message} />;
  }

  if (!competitionPages) {
    return (
      <>
        <Search filter={showMatches ? <DateRangeFilter /> : null} />
        <Loader />
      </>
    );
  }

  return (
    <>
      <Search filter={showMatches ? <DateRangeFilter /> : null} />
      <section className="competition-info">
        <h1 className="competition-title">
          {`${competitionInfo.competition.area.name} — ${competitionInfo.competition.name}`}
        </h1>
        <div className="section-controls">
          <button
            className={
              showMatches ? "section-control selected" : "section-control"
            }
            type="button"
            onClick={switchSection}
          >
            Matches
          </button>
          <button
            className={
              !showMatches ? "section-control selected" : "section-control"
            }
            type="button"
            onClick={switchSection}
          >
            Teams
          </button>
        </div>
      </section>
      <Switch>
        <Route
          exact
          path={`${constants.baseUrl}competitions/:competitionId/matches/`}
        >
          <Matches
            matchesPages={competitionPages.matchesPages}
            showTeamDetail={showTeamDetail}
          />
        </Route>
        <Route
          exact
          path={`${constants.baseUrl}competitions/:competitionId/teams/`}
        >
          <Teams
            teamsPages={competitionPages.teamsPages}
            showTeamDetail={showTeamDetail}
          />
        </Route>
      </Switch>
    </>
  );
}
