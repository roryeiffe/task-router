import React from "react";

interface Props {
    pokemon: Pokemon
}

interface Pokemon {
  id: number;
  name: string;
  sprites: Sprites;
}

interface Sprites {
    front_default: string;
    back_default: string;
}

const PokemonCard = (props:Props) => {
  return (
    <div className = "col-lg-3">
      <div className="card">
        <img src={props.pokemon.sprites.front_default} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">props.pokemon.name</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    </div>
  );
};


export default PokemonCard;