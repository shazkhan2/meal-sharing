import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header-link">
        <div className="overlay">
          <h2>Share My Meal</h2>
        </div>
      </Link>
    </header>
  );
}

export default Header;
