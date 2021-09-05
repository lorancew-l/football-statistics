import noCrestIcon from "../../images/icons/flags/noFlag.svg";
import { constants } from "../../constants";

export function getMatchesPages({
  matches,
  teams,
  searchQuery,
  dateRangeFilter,
}) {
  const itemsPerPage = constants.itemsPerPage;

  if (dateRangeFilter.from) {
    const startDate = new Date(dateRangeFilter.from);
    matches = matches.filter((match) => new Date(match.utcDate) >= startDate);
  }

  if (dateRangeFilter.to) {
    const endDate = new Date(dateRangeFilter.to);
    endDate.setHours(23, 59, 59);

    matches = matches.filter((match) => new Date(match.utcDate) <= endDate);
  }

  if (searchQuery) {
    searchQuery = searchQuery.toLowerCase();

    matches = matches.filter((match) => {
      const date = new Date(match.utcDate);
      const homeTeam = teams.find((team) => team.id === match.homeTeam.id);
      const awayTeam = teams.find((team) => team.id === match.awayTeam.id);

      const searchFields = [
        homeTeam.name,
        homeTeam.tla ?? "",
        homeTeam.shortName,
        awayTeam.name,
        awayTeam.tla ?? "",
        awayTeam.shortName,
        date.toLocaleDateString(),
        getMatchStatus(match),
      ];

      if (
        searchFields.filter((field) =>
          field.toLowerCase().includes(searchQuery)
        ).length
      ) {
        return true;
      }

      return false;
    });
  }

  matches = matches.map((match) => {
    return {
      id: match.id,
      homeTeam: getTeamData(
        teams.find((team) => team.id === match.homeTeam.id)
      ),
      awayTeam: getTeamData(
        teams.find((team) => team.id === match.awayTeam.id)
      ),
      utcDate: match.utcDate,
      status: getMatchStatus(match),
      score: getMatchScore(match),
    };
  });

  const pages = [];

  while (matches.length !== 0) {
    pages.push(matches.splice(0, itemsPerPage));
  }

  return pages;
}

function getMatchStatus(match) {
  let status = match.status;

  if (status === "IN_PLAY") {
    status = "live";
  } else {
    status = status.toLowerCase();
  }

  return status;
}

function getTeamData(team) {
  return {
    id: team.id,
    name: team.name,
    shortName: team.shortName,
    tla: team.tla ?? team.shortName.slice(0, 3).toUpperCase(),
    crestUrl: team.crestUrl ?? noCrestIcon,
  };
}

function getMatchScore(match) {
  const statusesWithNoScore = ["scheduled", "canceled", "postponed"];

  let score = {};

  if (statusesWithNoScore.includes(match.status.toLowerCase())) {
    score = null;
  } else if (match.score.duration === "PENALTY_SHOOTOUT") {
    score.homeTeam = `${match.score.fullTime.homeTeam}(${match.score.penalties.homeTeam})`;
    score.awayTeam = `${match.score.fullTime.awayTeam}(${match.score.penalties.awayTeam})`;
  } else {
    score = match.score.fullTime;
  }

  if (score) {
    score.winner = match.score.winner.toLowerCase();
  }

  return score;
}
