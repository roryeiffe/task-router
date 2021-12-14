
// let friends:string[] = new Array();

import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FriendItem from "./FriendItem";
import FriendRequest from "./FriendRequest";
import styles from"./style.module.css";

// TODO: get list of friends from database
const FriendList = () => {
    const [friends, setFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const temp = useSelector((state:any) => state.user)
    const [user, ] = useState(temp);
    const [email, setEmail] = useState("");
    // testing ======================================================
    // let howManyFriends = 5;
    // for(let i=1; i<=howManyFriends; i++) {
    //     // setFriends([...friends, "Friend "+i])
    //     friends.push("Friend "+i);
    // }
    //================================================================

    function addFriend(event:any) {
        // send friend request to back end:
        var req = 'http://localhost:9001/friends/add?email1=' + user.email + '&email2=' + email;
        console.log(req);
        axios.post(req)
        .then(response => alert('Friend request sent!'))
        .catch(error => alert('There was an error submitting your friend request.'));
        // // setNewFriend({
        // //     ...newFriend,
        // //     [event.target.name]: event.target.value,
        // // })
        // let friendName:string = tempText;
        // // friends.push(friendName);
        // setFriends([...friends, friendName]); // TODO: implement friend request before this
        // console.log(friends); // goes before the above
        // console.log(event);
        // console.log(event.target.value);
    }
    function addFriendHandler(event:any) {
        setEmail(event.target.value);
    }

    useEffect(() => {
        // get friend ids from database:
        axios.get('http://localhost:9001/friends/getAllFriends/' + user.id)
        .then(response => {
            console.log('data fetch');
            setFriends(response.data)
        })
        .catch(error => console.error(error));
        // get incoming friend requests:
        axios.get('http://localhost:9001/friends/getIncoming/' + user.id)
        .then(response => {
            setFriendRequests(response.data)
        })
        .catch(error => console.error(error));
    }, [email])
    //================================================================
    return(
        <div className={styles.container}>
            <div className={styles.friendList}>
                {/* <form onClick={e => addFriend(e)}>
                <label>
                    <input type="text" name="friendName"/>
                </label>
                <input type="submit" value="Add Friend" />
            </form> */}
            
            <input type="text" value = {email} onChange={event => addFriendHandler(event)} placeholder="Enter email"/>
            <span>&ensp;</span>
            <button name="friendName" onClick={event => addFriend(event)}>Send Friend Request</button>
            <p />
            {/* <input type="submit" /> */}
            <h1>Current Friends</h1>
            <div className = 'row'>
                {friends.map(value => {
                    return <FriendItem id = {value}/>;
                })}
            </div>
            <h1>Incoming Friend Requests</h1>
            <div className = 'row'>
                {friendRequests.map(request => {
                    return <FriendRequest setEmail = {setEmail} request = {request}/>
                })}
            </div>
            </div>
        </div>
    );
}

export default FriendList;