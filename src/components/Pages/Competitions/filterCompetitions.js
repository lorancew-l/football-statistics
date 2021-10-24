const freeCompetitions = [
  2016, 2017, 2021, 2003, 2002, 2015, 2019, 2014, 2013, 2000, 2018,
];

export default function filterCompetitions(competitions) {
  return competitions.filter((competition) =>
    freeCompetitions.includes(competition.id)
  );
}
