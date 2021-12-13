import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

const AddComment = (props: any) => {
  const [comment, setComment] = useState("");

  // get user from redux store and set it to state;
  const temp = useSelector((state: any) => state.user);
  const [user, setUser] = useState(temp);

  const onChangeHandler = (event: any) => {
    setComment(event.target.value);
  };

  const onSubmitHandler = (event: any) => {
    event.preventDefault();
    axios
      .put("http://localhost:9001/posts/comment/" + props.post.postId, {
        comment: comment,
        name: user.name,
        date: Date.now()
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <input
          value={comment}
          name="comment"
          onChange={onChangeHandler}
        ></input>
        <br />
        <input type="submit" value="Post Comment" className = 'btn btn-primary' />
      </form>
    </div>
  );
};

export default AddComment;
