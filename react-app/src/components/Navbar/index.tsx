import { useState } from "react";
import NavbarItem from "./NavbarItem";
import PokeCorner from '../PokeCorner';
import { useSelector } from "react-redux";

const Navbar = () => {
    const temp = useSelector((state: any) => state.user);
    const [user, setUser] = useState(temp);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top bg-dark">
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
      {PokeCorner(user.starterId)}
    </nav>
  );
};

export default Navbar;
