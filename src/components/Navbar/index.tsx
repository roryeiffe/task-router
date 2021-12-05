import React from "react";
import {Link} from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/task">
              Tasks
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/friend">
              Friends
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/profile">
              View Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/pokedex">
              Pokédex
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
