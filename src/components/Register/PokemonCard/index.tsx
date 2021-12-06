import React from "react";
import { Pokemon } from "pokenode-ts";
import {useState, useEffect} from "react";

const PokemonCard = (props:any) => {
  const changeStarterId = () => {
    props.setUser({...props.user, starterId: props.pokemon.id});
  }

  const [borderStyle, setBorderStyle] = useState({border: "1px solid #ccc"});
  
  useEffect(() => {
    if(props.user.starterId === props.pokemon.id) {
      setBorderStyle({border: "4px solid #000",});
    }
    else {
      setBorderStyle({border: "1px solid #ccc"});
    }
  }, [props.pokemon.id, props.user.starterId]);

  return (
    <div className = "col-lg-4">
      <div className="card" style = {borderStyle} onClick = {() => changeStarterId()}>
        <img draggable = 'false' src={props.pokemon.sprites.front_default} className="card-img-top img" alt="..." />
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