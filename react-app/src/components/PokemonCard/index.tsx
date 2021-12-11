import { useSelector } from "react-redux";
import { useState } from 'react';
import {IPokemon} from '../../interfaces/Pokemon';

interface IProps {
    pokemon: IPokemon;
}

const PokemonCard = (props: any) => {
const user = useSelector((state:any) => state.user);

  const [sprite, setSprite] = useState(props.pokemon.sprites.front_default);

  const changeSprite = () => {
    // get a random sprite until find one that isn't null:
    let possible_sprites = ["back_default", "back_female", "back_shiny", "back_shiny_female", "front_default", "front_female", "front_shiny", "front_shiny_female"];
    while(true) {
      let index = Math.floor(Math.random() * possible_sprites.length)
      let spriteType = possible_sprites[index];
      var newSprite = props.pokemon.sprites[spriteType];
      if(newSprite !== null) {
        break;
      }
    }
    
      setSprite(newSprite);
  }


  return (
    <div className="card">
      <img
        src={sprite}
        className="card-img-top"
        alt="..."
        draggable="false"
        onClick = {changeSprite}
      />
      <div className="card-body">
        <h4 className="card-title">{props.pokemon.name}</h4>
        {props.showLevel && <h5 className="card-text">Level {user.level}</h5>}
      </div>
    </div>
  );
};

export default PokemonCard;
