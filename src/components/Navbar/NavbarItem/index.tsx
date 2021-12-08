import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./style.module.css";
import pokeballMoving from "../../../images/pokeball_opening.gif";
import pokeBallStationary from "../../../images/pokeball_stationary.png";

const NavbarItem = (props: any) => {
  // default icon to stationary pokeball:
  const [icon, setIcon] = useState(pokeBallStationary);
  // should we apply the active class to the current nav item:
  const [navClass, setNavClass] = useState('');

  useEffect (() => {
    if(props.to === window.location.pathname){
        setNavClass('active');

    }
  },[])
  return (
    // on mouse hover, set icon to moving, otherwise... back to stationary:
    <li
      className={`nav-item ${navClass}`}
      onMouseEnter={() => setIcon(pokeballMoving)}
      onMouseLeave={() => setIcon(pokeBallStationary)}
    >
      <Link className="nav-link" to={props.to}>
        <img className={styles.pokeball} src={icon} />
        {props.pageName}
      </Link>
    </li>
  );
};

export default NavbarItem;
