import { constants } from "../../../constants";

export function getPages(competitions, searchQuery) {
  const itemsPerPage = constants.itemsPerPage;

  if (searchQuery) {
    searchQuery = searchQuery.toLowerCase();

    competitions = competitions.filter((competition) => {
      const searchFields = [
        competition.name,
        competition.area.name,
        constants.competitions.tiers[competition.plan],
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

  competitions = competitions.map((competition) => {
    return {
      id: competition.id,
      name: competition.name,
      area: competition.area.name,
      tier: constants.competitions.tiers[competition.plan],
      matchday: competition?.currentSeason?.currentMatchday
        ? `${constants.competitions.matchday} ${competition?.currentSeason?.currentMatchday}`
        : "",
    };
  });

  const pages = [];

  while (competitions.length !== 0) {
    pages.push(competitions.splice(0, itemsPerPage));
  }

  return pages;
}
