import axios from "axios";

const FriendRequest = (props:any) => {
    const accept = () => {
        axios.put('http://localhost:9001/friends/approveRequest/' + props.request.id)
        .then(response => console.log(response.data))
        .catch(error => console.error(error));
    }
    return (
        <div>
            <h6>Incoming Friend Request from {props.request.firstUser.name}</h6>
            <button onClick = {accept}>Accept</button>
        </div>
    )
}

export default FriendRequest;