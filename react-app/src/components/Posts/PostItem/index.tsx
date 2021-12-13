import {useState, useEffect} from 'react';
import {PokemonClient} from 'pokenode-ts';
import styles from './style.module.css';
import AddComment from './AddComment';

const PostItem = (props:any) => {
    const [profilePic, setProfilePic] = useState("");

    useEffect(() => {
        const api = new PokemonClient();
        api.getPokemonById(props.post.starterId)
        .then((pokemon: any) => {setProfilePic(pokemon.sprites.front_default);})
        console.log(profilePic);
    }, [])

    return (
        <tr>
            <td>
                <img className = {styles.profileImg} src = {profilePic} alt = "..."/>
                <h4>{props.post.userName}</h4>
                <h6>{props.post.email}</h6>
            </td>
            <td className = {styles.postContainer}>
                <div className = {styles.post}>
                    <h3>{props.post.title}</h3>
                    <br />
                    <h5>{props.post.description}</h5>
                    <h6>{props.post.date.toString()}</h6>
                    <div>
                        {props.post.comments.map((comment_:any) => <h1>{comment_.comment}</h1>)}
                    </div>
                    <AddComment post = {props.post}/>
                </div>
            </td>
        </tr>
    )
}

export default PostItem;