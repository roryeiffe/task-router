import React from "react";
import { Pokemon } from "pokenode-ts";
import {useState, useEffect} from "react";
import styles from './style.module.css';

const PokemonCard = (props:any) => {
  const changeStarterId = () => {
    props.setUser({...props.user, starterId: props.pokemon.id});
  }

  const [borderStyle, setBorderStyle] = useState({border: "1px solid #ccc"});
  const [imgUrl, setImgUrl] = useState(props.pokemon.sprites.back_default);
  
  useEffect(() => {
    if(props.user.starterId === props.pokemon.id) {
      setBorderStyle({border: "4px solid #000",});
      setImgUrl(props.pokemon.sprites.front_default);
    }
    else {
      setBorderStyle({border: "1px solid #ccc"});
      setImgUrl(props.pokemon.sprites.back_default);
    }
  }, [props.pokemon.id, props.user.starterId]);

  return (
    <div className = "col-lg-4 poke-card">
      <div className={"card " + styles.pokeCard} style = {borderStyle} onClick = {() => changeStarterId()}>
        <img draggable = 'false' src={imgUrl} className="card-img-top img" alt="..." />
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