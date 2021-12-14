import axios from "axios";
import { useEffect, useState } from "react";
import { PokemonClient } from "pokenode-ts";

const FriendItem = (props: any) => {
  const [user, setUser] = useState<any>({});
  const [profileImg, setProfileImg] = useState(
    "https://i.stack.imgur.com/l60Hf.png"
  );
  const api = new PokemonClient();
  useEffect(() => {
    axios
      .get("http://localhost:9001/users/getById/" + props.id)
      .then((response) => {
        setUser(response.data);
        // get the profile image from pokeapi
        api.getPokemonById(response.data.starterId).then((pokemon: any) => {
          setProfileImg(pokemon.sprites.front_default);
        });
      })
      .catch((error) => console.error(error));
  }, [profileImg]);
  return (
    <div className="col col-lg-6">
      <div className="card">
        <img className="card-img-top" src={profileImg} alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">{user.name}</h5>
          <h6 className="card-text">Level {user.level}</h6>
          <p className="card-text"></p>
          <a href="#" className="btn btn-primary">
            View Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default FriendItem;
