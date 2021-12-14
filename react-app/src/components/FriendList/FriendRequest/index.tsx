import axios from "axios";
import { Navigate } from "react-router-dom";
import {useState} from 'react';

const FriendRequest = (props:any) => {
    const accept = () => {
        axios.put('http://localhost:9001/friends/approveRequest/' + props.request.id)
        .then(response => {
            alert('Successfully accepted friend request!');
            props.setEmail(' ');
        })
        .catch(error => alert('There was an error accepting the friend request.'));
        
    }
    return (
        <div>
            <h6>Incoming Friend Request from {props.request.firstUser.name}</h6>
            <button onClick = {accept}>Accept</button>
        </div>
    )
}

export default FriendRequest;