import {useState, useEffect} from 'react';
import {PokemonClient} from 'pokenode-ts';
import styles from './style.module.css';

const PostItem = (props:any) => {
    const [profilePic, setProfilePic] = useState("");

    useEffect(() => {
        const api = new PokemonClient();
        api.getPokemonById(props.post.author.starterId)
        .then((pokemon: any) => {setProfilePic(pokemon.sprites.front_default);})
        console.log(profilePic);
    }, [])

    return (
        <tr>
            <td>
                <img className = {styles.profileImg} src = {profilePic} alt = "..."/>
                <h4>{props.post.author.name}</h4>
            </td>
            <td className = {styles.postContainer}>
                <div className = {styles.post}>
                    <h3>{props.post.title}</h3>
                    <br />
                    <h5>{props.post.description}</h5>
                </div>
            </td>
        </tr>
    )
}

export default PostItem;