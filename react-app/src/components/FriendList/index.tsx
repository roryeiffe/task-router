// let friends:string[] = new Array();

import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FriendItem from "./FriendItem";
import FriendRequest from "./FriendRequest";
import Alert from '../Alert';
import styles from "./style.module.css";

// TODO: get list of friends from database
const FriendList = () => {
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const temp = useSelector((state: any) => state.user);
  const [user] = useState(temp);
  const [email, setEmail] = useState("");
  const [showFriends, setShowFriends] = useState(true);
  // show alert upon success/failure
  const [alert, setAlert] = useState(<div></div>);
  // testing ======================================================
  // let howManyFriends = 5;
  // for(let i=1; i<=howManyFriends; i++) {
  //     // setFriends([...friends, "Friend "+i])
  //     friends.push("Friend "+i);
  // }
  //================================================================

  function addFriend(event: any) {
    // send friend request to back end:
    var req =
      "http://localhost:9001/friends/add?email1=" +
      user.email +
      "&email2=" +
      email;
    console.log(req);
    axios
      .post(req)
      .then((response) => {
        setAlert(<div></div>)
        setAlert(<Alert message = 'Friend request sent!' type = 'success'/>)
      })
      .catch((error) =>{
        
        setAlert(<div></div>)
        setAlert(<Alert message = 'There was an error submitting your friend request.' type = 'danger'/>)
      }
      );
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
  function addFriendHandler(event: any) {
    setEmail(event.target.value);
  }

  useEffect(() => {
    // get friend ids from database:
    axios
      .get("http://localhost:9001/friends/getAllFriends/" + user.id)
      .then((response) => {
        console.log("data fetch");
        setFriends(response.data);
      })
      .catch((error) => console.error(error));
    // get incoming friend requests:
    axios
      .get("http://localhost:9001/friends/getIncoming/" + user.id)
      .then((response) => {
        setFriendRequests(response.data);
      })
      .catch((error) => console.error(error));
  }, [email]);
  //================================================================
  return (
    <div className={styles.container}>
      {alert}
        <div>
          <ul className="nav nav-pills nav-justified">
            <li className="nav-item" onClick = {() => setShowFriends(true)}>
              <a className={`nav-link ${showFriends && 'active'}`} aria-current="page">
                Friends
              </a>
            </li>
            <li className="nav-item" onClick = {() => setShowFriends(false)}>
              <a className={`nav-link ${!showFriends && 'active'}`}>
                Friend Requests
              </a>
            </li>
          </ul>
        </div>
      <div className={styles.friendList}>
        {/* <form onClick={e => addFriend(e)}>
                <label>
                    <input type="text" name="friendName"/>
                </label>
                <input type="submit" value="Add Friend" />
            </form> */}
        

        {showFriends ? (
          <div>
            <h2>Current Friends</h2>
            <div className="row">
              {friends.length > 0 ? friends.map((value) => {
                return <FriendItem id={value} />;
              }): <p>You have no friends... try <a style = {{cursor:'pointer',color: 'blue', marginLeft: '5px'}} onClick = {() => setShowFriends(false)}> sending a request</a></p>}
            </div>
          </div>
        ) : (
          <div>
            {" "}
            <h4>Incoming Friend Requests</h4>
            <div className="row">
              {friendRequests.length > 0 ? (
                friendRequests.map((request) => {
                  return (
                    <FriendRequest setEmail={setEmail} request={request} />
                  );
                })
              ) : (
                <p>No Incoming Friend Requests</p>
              )}
            </div>
            <h4>Send Friend Request</h4>
            <input
              className={`form-control`}
              type="text"
              value={email}
              onChange={(event) => addFriendHandler(event)}
              placeholder="Enter email"
            />
            <span>&ensp;</span>
            <button
              className={`btn btn-primary ${styles.button}`}
              name="friendName"
              onClick={(event) => addFriend(event)}
            >
              Send Friend Request
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendList;
