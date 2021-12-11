import React from "react";
import { Link } from "react-router-dom";
import NavbarItem from "./NavbarItem";

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
          <NavbarItem to = '/' pageName = 'Home' />
          <NavbarItem to = '/login' pageName = 'Login'/>
          <NavbarItem to = '/register' pageName = 'Register'/>
          <NavbarItem to = '/task' pageName = 'Tasks'/>
          <NavbarItem to = '/friend' pageName = 'Friends'/>
          <NavbarItem to = '/posts' pageName = 'View Posts'/>
          <NavbarItem to = '/profile' pageName = 'View Profile'/>
          <NavbarItem to = '/pokedex' pageName = 'Pokédex'/>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
