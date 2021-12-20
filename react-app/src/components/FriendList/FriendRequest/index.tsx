import axios from "axios";
import { Navigate } from "react-router-dom";
import {useState} from 'react';
import Alert from '../../Alert';

const FriendRequest = (props:any) => {
    const [show, setShow] = useState(true);
    // show alert upon success/failure
    const [alert, setAlert] = useState(<div></div>);
    const accept = () => {
        axios.put('http://localhost:9001/friends/approveRequest/' + props.request.id)
        .then(response => {
            setAlert(<div></div>)
            setAlert(<Alert message = "Successfully accepted friend request!" type = "success"/>)
            props.setEmail(' ');
        })
        .catch(error => {
            setAlert(<div></div>);
            setAlert(<Alert message = "There was an error accepting the friend request." type = "danger"/>);
        });
    }
    const decline = () => {
        axios.put('http://localhost:9001/friends/denyRequest/' + props.request.id)
        .then(response => {
            setAlert(<div></div>)
            setAlert(<Alert message = "Successfully deleted friend request!" type = "success"/>)
            props.setEmail(' ');
            setShow(false);
        })
        .catch(error => {
            setAlert(<div></div>)
            setAlert(<Alert message = "There was an error deleting the friend request." type = "danger"/>)
        })
    }
    return (
        <div>
            {alert}
            {show &&<>
            <h6>Incoming Friend Request from {props.request.firstUser.name}</h6>
            <button className = 'btn btn-success' onClick = {accept}>Accept</button>
            <button className = 'btn btn-danger' onClick = {decline}>Decline</button></>}
        </div>
    )
}

export default FriendRequest;