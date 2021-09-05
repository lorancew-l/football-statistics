import noCrestIcon from "../../images/icons/flags/noFlag.svg";
import { constants } from "../../constants";

export function getTeamsPages(teams, searchQuery) {
  const itemsPerPage = constants.itemsPerPage;

  if (searchQuery) {
    searchQuery = searchQuery.toLowerCase();

    teams = teams.filter((team) => {
      const searchFields = [
        team.name,
        team.shortName,
        team.tla ?? "",
        team.area.name,
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

  teams = teams.map((team) => {
    return {
      id: team.id,
      area: team.area.name,
      name: team.name,
      shortName: team.shortName,
      tla: team.tla ?? team.shortName.slice(0, 3).toUpperCase(),
      crestUrl: team.crestUrl ?? noCrestIcon,
    };
  });

  const pages = [];

  while (teams.length !== 0) {
    pages.push(teams.splice(0, itemsPerPage));
  }

  return pages;
}
