import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./style.module.css";
import pokeballMoving from "../../../images/pokeball_opening.gif";
import pokeBallStationary from "../../../images/pokeball_stationary.png";
import {useSelector} from 'react-redux';

const NavbarItem = (props: any) => {
  // default icon to stationary pokeball:
  const [icon, setIcon] = useState(pokeBallStationary);

  // should we apply the active class to the current nav item:
  const [navClass, setNavClass] = useState('');
  const [navLinkClass, setNavLinkClass] = useState('');

  // get user from redux store and set it to state;
  const user = useSelector((state: any) => state.user);

  // pokeball animates if we hover over it:
  const changePokeballType = (action:string) => {
    if (action === "enter") {
        setIcon(pokeballMoving);
    }
    else if (action === "exit" && props.to !== window.location.pathname) {
        setIcon(pokeBallStationary);
    }
  }

  useEffect (() => {
    // make the current page active:
    if(props.to === window.location.pathname){
        setNavClass('active');
        setIcon(pokeballMoving)
    }
    // if the user is not logged in, make this link inactive:
    if(user.email === null) {
      // login and register and home page should always be active:
      if(props.to !== '/login' && props.to !== '/register' && props.to !== '/') {
        setNavLinkClass('disabled');
      }
      else {
        setNavLinkClass('');
      }
    }
  },[user.id])
  return (
    // on mouse hover, set icon to moving, otherwise... back to stationary:
    <li
      className={`nav-item ${navClass}`}
      onMouseEnter={() => changePokeballType('enter')}
      onMouseLeave={() => changePokeballType('exit')}
    >
      <Link className={`nav-link ${navLinkClass}`} to={props.to}>
        <img className={styles.pokeball} src={icon} />
        {props.pageName}
      </Link>
    </li>
  );
};

export default NavbarItem;
