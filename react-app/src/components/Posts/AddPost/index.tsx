import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from './style.module.css';
import Alert from '../../Alert';

const AddPost = (props:any) => {
  // get user from redux store and set it to state;
  const temp = useSelector((state: any) => state.user);
  const [user, ] = useState(temp);
  const [post, setPost] = useState({ title: "", description: "" });
  const [alert, setAlert] = useState(<div></div>)

  // when form data changes:
  const onChangeHandler = (event: any) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };
  
  // when we submit the post:
  const onSubmitHandler = (event: any) => {
    event.preventDefault();
    // add post to database:
    axios.put('http://localhost:9001/posts/update/' + user.id, post)
    .then(response => {
      setAlert(<div></div>)
      setAlert(<Alert type="success" message="Post added successfully!" />)
    });
    // update parent component:
    props.setPosts([]);
  };

  return (
    <div>
      {alert}
      <form onSubmit={onSubmitHandler}>
        <h2>Add Post</h2>
        <input
          type="text"
          name="title"
          value={post.title}
          placeholder="Post Title"
          className={`form-control ${styles.input}`}
          required
          onChange={onChangeHandler}
        />
        <br />
        <input
          type="text"
          name="description"
          value={post.description}
          placeholder="Post Descriptions"
          className={`form-control ${styles.input}`}
          required
          onChange={onChangeHandler}
        />
        <br />
        <input
          type="submit"
          value="Submit post"
          className={`btn btn-primary ${styles.submit}`}
        />
      </form>
    </div>
  );
};

export default AddPost;
