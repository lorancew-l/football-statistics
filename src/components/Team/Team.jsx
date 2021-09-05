import React from "react";
import getFlagIcons from "../../images/icons/flags";

export default function Team({ team, onClick }) {
  const flagIcons = getFlagIcons();

  return (
    <li className="team" onClick={onClick}>
      <div className="team-info">
        <div className="icon-container">
          <img
            src={team.crestUrl}
            onError={(event) => (event.target.src = flagIcons.noflag.default)}
            alt=""
          />
        </div>
        <span className="long">{team.name}</span>
        <span className="short">{team.shortName}</span>
      </div>

      {team.name !== team.area && (
        <div className="team-area">
          <div className="icon-container">
            <img
              src={
                flagIcons[team.area.replaceAll(" ", "").toLowerCase()]
                  ?.default ?? flagIcons.noflag.default
              }
              alt=""
            />
          </div>
          <span>{team.area}</span>
        </div>
      )}
    </li>
  );
}
