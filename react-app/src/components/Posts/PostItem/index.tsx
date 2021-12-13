import { useState, useEffect } from "react";
import { PokemonClient } from "pokenode-ts";
import styles from "./style.module.css";
import AddComment from "./AddComment";
import axios from "axios";

const PostItem = (props: any) => {
  const [profilePic, setProfilePic] = useState("");

  const [comments, setComments] = useState([]);

  useEffect(() => {
    const api = new PokemonClient();
    // get the profile image from pokeapi
    api.getPokemonById(props.post.starterId).then((pokemon: any) => {
      setProfilePic(pokemon.sprites.front_default);
    });
    // get comments for this post:
    axios
      .get("http://localhost:9001/posts/comment/" + props.post.postId)
      .then((response) => setComments(response.data))
      .catch((error) => console.error(error));
  }, [comments]);

  return (
    <>
      <tr>
        <td>
          <img className={styles.profileImg} src={profilePic} alt="..." />
          <h4>{props.post.userName}</h4>
          <h6>{props.post.email}</h6>
        </td>
        <td className={styles.postContainer}>
          <div className={styles.post}>
            <h3>{props.post.title}</h3>
            <br />
            <h5>{props.post.description}</h5>
            <h6>{props.post.date.toString()}</h6>
          </div>
        </td>
      </tr>
      <tr>
        <td colSpan={4}>
          <AddComment post={props.post} />
          <ul className = 'list-group'>
            {comments.map((comment: any) => (
              <li className = 'list-group-item list-group-item-dark'><span style = {{fontWeight:'bold'}}>{comment.name}</span> says <span>"{comment.comment}"</span></li>
            ))}
          </ul>
          <br />

        </td>
      </tr>
    </>
  );
};

export default PostItem;
