
// let friends:string[] = new Array();

import { useState } from "react";

// TODO: get list of friends from database
const FriendList = () => {
    // const friends:string[] = ["Friend A", "Friend B", "Friend C"];
    
    const [friends, setFriends] = useState(["Friend A", "Friend B", "Friend C"]);
    // testing ======================================================
    // let howManyFriends = 5;
    // for(let i=1; i<=howManyFriends; i++) {
    //     // setFriends([...friends, "Friend "+i])
    //     friends.push("Friend "+i);
    // }
    //================================================================
    const [tempText, setTempText] = useState("");

    function addFriend(event:any) {
        // setNewFriend({
        //     ...newFriend,
        //     [event.target.name]: event.target.value,
        // })
        let friendName:string = tempText;
        // friends.push(friendName);
        setFriends([...friends, friendName]); // TODO: implement friend request before this
        console.log(friends); // goes before the above
        console.log(event);
        console.log(event.target.value);
    }
    function addFriendHandler(event:any) {
        console.log(event.target.value);
        setTempText(event.target.value);
    }
    //================================================================
    return(
        <div className="container">
            {/* <form onClick={e => addFriend(e)}>
                <label>
                    <input type="text" name="friendName"/>
                </label>
                <input type="submit" value="Add Friend" />
            </form> */}
            
            <input type="text" onChange={event => addFriendHandler(event)} />
            <button name="friendName" onClick={event => addFriend(event)}>Add friend</button>

            {/* <input type="submit" /> */}
            <p> -------------------------------------------- Beginning
                -------------------------------------------- </p>
            <ul>
                {friends.map(value => {
                    return <li>{value}</li>;
                })}
            </ul>
            <p> ------------------------------------------------ End
                ------------------------------------------------ </p>
        </div>
    );
}

export default FriendList;