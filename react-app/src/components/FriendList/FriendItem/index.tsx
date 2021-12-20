import axios from "axios";
import { useEffect, useState } from "react";
import { PokemonClient } from "pokenode-ts";
import styles from './style.module.css';
import PostItem from "../../Posts/PostItem";
const FriendItem = (props: any) => {
  const [user, setUser] = useState<any>({});
  const [posts, setPosts] = useState([]);
  const [profileImg, setProfileImg] = useState(
    "https://i.stack.imgur.com/l60Hf.png"
  );
  const api = new PokemonClient();
  useEffect(() => {
    // get user from database:
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

      axios
      .get('http://localhost:9001/posts/getPosts/' + props.id)
      .then((response) => setPosts(response.data))
      .catch((error) => console.error(error));

  }, [profileImg]);
  return (
    <div className="col col-lg-4">
      <div className="card">
        <img className={`card-img-top ${styles.img}`}src={profileImg} alt="Card image cap"/>
        <div className="card-body">
          <h5 className="card-title">{user.name}</h5>
          <p style = {{fontSize: '12px'}}className = "card-text">{user.email}</p>
          <h6 className="card-text">Level {user.level}</h6>
          {user.pokemon && <h6>{(user.pokemon.length)} Pokemon</h6>}
          <p className="card-text"></p>
        </div>
        {/* {posts &&
            posts.map((post: any) => <p>{post.title}</p>)} */}
      </div>
    </div>
  );
};

export default FriendItem;
