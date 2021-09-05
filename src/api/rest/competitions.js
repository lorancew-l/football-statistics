import makeRequest from "../makeRequest";
const baseURL = "https://api.football-data.org/v2/";

export function getCompetitionsList() {
  return makeRequest({
    url: baseURL + "competitions/",
    method: "GET",
    headers: {},
  });
}

export function getMatchesList(competitionId) {
  return makeRequest({
    url: baseURL + `competitions/${competitionId}/matches/`,
    method: "GET",
    headers: {},
  });
}

export function getTeamsList(competitionId) {
  return makeRequest({
    url: baseURL + `competitions/${competitionId}/teams/`,
    method: "GET",
    headers: {},
  });
}
