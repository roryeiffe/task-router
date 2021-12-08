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
            <td>
                <h3>{props.post.title}</h3>
                {props.post.description}
            </td>
        </tr>
    )
}

export default PostItem;