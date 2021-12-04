import { useSelector } from "react-redux";

const PokemonCard = (props: any) => {
const user = useSelector((state:any) => state.user);
  return (
    <div className="card">
      <img
        src={props.pokemon.sprites.front_default}
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{props.pokemon.name}</h5>
        <p className="card-text">Level {user.level}</p>
      </div>
    </div>
  );
};

export default PokemonCard;
