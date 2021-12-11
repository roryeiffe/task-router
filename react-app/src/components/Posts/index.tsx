import axios from "axios";
import { useEffect, useState } from "react";
import AddPost from "./AddPost";
import PostItem from "./PostItem";
import styles from "./style.module.css";

const Posts = () => {
  // posts is all posts:
  const [posts, setPosts] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const onChangeHandler = (event: any) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    axios.get("http://localhost:9001/posts/getPosts")
    .then(response => setPosts(response.data))
  }, [posts]);
  return (
    <div
      className={`${styles.container}`}
      style={{ textAlign: "center", border: "none" }}
    >
      <AddPost setPosts = {setPosts}/>
      <form>
        <input
          type="text"
          value={searchTerm}
          placeholder="filter@email.com"
          onChange={onChangeHandler}
          className={`${styles.input}`}
        />
        <br />
        {/* <input
          type="submit"
          value="Filter by Email"
          className={`btn btn-secondary ${styles.submit}`}
        /> */}
      </form>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <th>
            <h1>User</h1>
          </th>
          <th>
            <h1>Post</h1>
          </th>
        </thead>
        <tbody>
          {posts &&
            posts
              .filter(
                (post: any) =>
                  post.email === searchTerm || searchTerm === ""
              )
              .map((post: any) => <PostItem post={post} />)}
        </tbody>
      </table>
    </div>
  );
};
export default Posts;
