import makeRequest from "../makeRequest";

const baseURL = "https://api.football-data.org/v2/";

export function getTeamsList() {
  return makeRequest({
    url: baseURL + `teams/`,
    method: "GET",
    headers: {},
  });
}
