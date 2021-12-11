import { useSelector } from "react-redux";
import {IPokemon} from '../../interfaces/Pokemon';

interface IProps {
    pokemon: IPokemon;
}

const PokemonCard = (props: any) => {
const user = useSelector((state:any) => state.user);
  return (
    <div className="card">
      <img
        src={props.pokemon.sprites.front_default}
        className="card-img-top"
        alt="..."
        draggable="false"
      />
      <div className="card-body">
        <h4 className="card-title">{props.pokemon.name}</h4>
        {props.showLevel && <h5 className="card-text">Level {user.level}</h5>}
      </div>
    </div>
  );
};

export default PokemonCard;