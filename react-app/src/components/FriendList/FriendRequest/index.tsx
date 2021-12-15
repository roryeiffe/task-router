import axios from "axios";
import { Navigate } from "react-router-dom";
import {useState} from 'react';

const FriendRequest = (props:any) => {
    const [show, setShow] = useState(true);
    const accept = () => {
        axios.put('http://localhost:9001/friends/approveRequest/' + props.request.id)
        .then(response => {
            alert('Successfully accepted friend request!');
            props.setEmail(' ');
        })
        .catch(error => alert('There was an error accepting the friend request.'));
    }
    const decline = () => {
        axios.put('http://localhost:9001/friends/denyRequest/' + props.request.id)
        .then(response => {
            alert('Successfully deleted friend request!');
            props.setEmail(' ');
            setShow(false);
        })
        .catch(error => alert('There was an error deleting the friend request.'));
    }
    return (
        <div>
            {show &&<>
            <h6>Incoming Friend Request from {props.request.firstUser.name}</h6>
            <button className = 'btn btn-success' onClick = {accept}>Accept</button>
            <button className = 'btn btn-danger' onClick = {decline}>Decline</button></>}
        </div>
    )
}

export default FriendRequest;