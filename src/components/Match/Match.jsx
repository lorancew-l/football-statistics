import React from "react";
import noCrestIcon from "../../images/icons/flags/noFlag.svg";

export default function Match({ match, onTeamClick }) {
  const matchDate = match?.utcDate ? new Date(match.utcDate) : "-";

  return (
    <li className="match">
      <div className="match-date">
        <time dateTime={match?.utcDate}>{matchDate.toLocaleDateString()}</time>
      </div>
      <div className={`match-status ${match.status}`}>{match.status}</div>
      <div className="match-teams">
        <div
          className="home-team"
          onClick={() => onTeamClick(match.homeTeam.id)}
        >
          <div className="icon-container">
            <img
              src={match.homeTeam.crestUrl}
              onError={(event) => (event.target.src = noCrestIcon)}
              alt=""
            />
          </div>
          <span
            className={
              match.score?.winner === "home_team" ? "long winner" : "long"
            }
          >
            {match.homeTeam.name}
          </span>
          <span
            className={
              match.score?.winner === "home_team" ? "short winner" : "short"
            }
          >
            {match.homeTeam.tla}
          </span>
        </div>
        <span>vs</span>
        <div
          className="away-team"
          onClick={() => onTeamClick(match.awayTeam.id)}
        >
          <div className="icon-container">
            <img
              src={match.awayTeam.crestUrl}
              onError={(event) => (event.target.src = noCrestIcon)}
              alt=""
            />
          </div>
          <span
            className={
              match.score?.winner === "away_team" ? "long winner" : "long"
            }
          >
            {match.awayTeam.name}
          </span>
          <span
            className={
              match.score?.winner === "away_team" ? "short winner" : "short"
            }
          >
            {match.awayTeam.tla}
          </span>
        </div>
      </div>
      <div className="match-score">
        {match.score && `${match.score.homeTeam} : ${match.score.awayTeam}`}
      </div>
    </li>
  );
}
