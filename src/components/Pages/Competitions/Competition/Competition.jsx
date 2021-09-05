import React from "react";
import { useHistory } from "react-router-dom";
import getFlagIcons from "../../../../images/icons/flags";
import { constants } from "../../../../constants";

export default function Competition({ competition }) {
  const flagIcons = getFlagIcons();
  const history = useHistory();

  function showCompetitionMatches() {
    history.push({
      pathname: `${constants.baseUrl}competitions/${competition.id}/matches/`,
      search: "?page=0",
    });
  }

  return (
    <li className="competition" onClick={showCompetitionMatches}>
      <div className="competition-name">
        <div className="icon-container">
          <img
            src={
              flagIcons[competition.area.replaceAll(" ", "").toLowerCase()]
                ?.default ?? flagIcons.noflag.default
            }
            alt=""
          />
        </div>
        <div>
          <span className="area">{competition.area} — </span>
          <span className="name">{competition.name}</span>
        </div>
      </div>
      <div className="season-info">
        <div className="tier">{competition.tier}</div>
        <div className="matchday">{competition.matchday}</div>
      </div>
    </li>
  );
}
