import React from "react";
import { Pokemon } from "pokenode-ts";
import {useState, useEffect} from "react";

const PokemonCard = (props:any) => {
  const changeStarterId = () => {
    props.setUser({...props.user, starterId: props.pokemon.id});
  }

  const [borderStyle, setBorderStyle] = useState({border: "none"});
  
  useEffect(() => {
    if(props.user.starterId === props.pokemon.id) {
      setBorderStyle({border: "1px solid #000",});
    }
    else {
      setBorderStyle({border: "none"});
    }
  }, [props.pokemon.id, props.user.starterId]);

  return (
    <div style = {borderStyle} className = "col-lg-4">
      <div className="card" onClick = {() => changeStarterId()}>
        <img src={props.pokemon.sprites.front_default} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.pokemon.name}</h5>
          <p className="card-text">
          </p>
        </div>
      </div>
    </div>
  );
};


export default PokemonCard;