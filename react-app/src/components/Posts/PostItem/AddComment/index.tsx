import axios from "axios";
import { useState } from "react";

const AddComment = (props:any) => {
    const [comment, setComment] = useState('');

    const onChangeHandler = (event:any) => {
        setComment(event.target.value);

    }

    const onSubmitHandler = (event:any) => {
        event.preventDefault();
        axios.put('http://localhost:9001/posts/comment/' + props.post.id, {'comment': comment, 'name': props.post.userName})
        .then(response => console.log(response.data))
        .catch(error => console.log(error));
    }

    return (
        <div>
            <form onSubmit = {onSubmitHandler}>
                <input value = {comment} name = 'comment' onChange = {onChangeHandler}></input>
                <input type = 'submit' value = 'Post Comment'/>
            </form>
        </div>
    )
}

export default AddComment;