import React from "react";
import { Link } from "react-router-dom";
import { constants } from "../../constants";

export default function Header() {
  return (
    <header className="header">
      <nav className="header-nav">
        <Link to={constants.baseUrl} className="header-nav-link">
          football statistics
        </Link>
      </nav>
    </header>
  );
}
