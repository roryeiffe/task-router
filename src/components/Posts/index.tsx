import { useEffect, useState } from "react";
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
    const temp = [
      {
        author: {
          id: 1,
          name: "Rory",
          email: "r@gmail.com",
          starterId: 261,
        },
        title: "Laundry",
        description: "Did my laundry today... feeling clean!",
      },
      {
        author: {
          id: 2,
          name: "AJ",
          email: "a@gmail.com",
          starterId: 245,
        },
        title: "Dog Walk",
        description: "Walked my dog, had fun chasing squirrels!",
      },
      {
        author: {
          id: 3,
          name: "Cathy",
          email: "c@gmail.com",
          starterId: 129,
        },
        title: "Shopping",
        description: "Bought a new kirby plushie!",
      },
      {
        author: {
          id: 1,
          name: "Rory",
          email: "r@gmail.com",
          starterId: 261,
        },
        title: "Dishes",
        description: "Washed some dishes.",
      },
    ];
    setPosts(temp);
  }, []);
  return (
    <div
      className={`${styles.container}`}
      style={{ textAlign: "center", border: "none" }}
    >
      <form>
        <input
          type="text"
          value={searchTerm}
          placeholder="filter@email.com"
          onChange={onChangeHandler}
          className={`${styles.input}`}
        />
        <br />
        <input
          type="submit"
          value="Filter by Email"
          className={`btn btn-secondary ${styles.submit}`}
        />
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
                  post.author.email === searchTerm || searchTerm === ""
              )
              .map((post: any) => <PostItem post={post} />)}
        </tbody>
      </table>
    </div>
  );
};
export default Posts;
