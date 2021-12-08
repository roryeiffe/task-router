import { useEffect, useState } from "react";
import PostItem from "./PostItem";

const Posts = () => {
  const [posts, setPosts] = useState<any>([]);
  useEffect(() => {
    setPosts([
      {
        author: {
          id: 1,
          name: "Rory",
          starterId: 261,
        },
        title: "Laundry",
        description: "Did my laundry today... feeling clean!",
      },
      {
        author: {
          id: 2,
          name: "AJ",
          starterId: 245,
        },
        title: "Dog Walk",
        description: "Walked my dog, had fun chasing squirrels!",
      },
      {
        author: {
          id: 3,
          name: "Cathy",
          starterId: 129,
        },
        title: "Shopping",
        description: "Bought a new kirby plushie!",
      },
    ]);
  }, []);
  return (
    <div className="container" style = {{textAlign:'center', border: 'none'}}>
      <table className = "table table-bordered table-striped">
        <thead className = "thead-dark" >
            <th><h1>User</h1></th>
            <th><h1>Post</h1></th>
        </thead>
        <tbody>
        {posts.map((post: any) => (
          <PostItem post={post} />
        ))}
        </tbody>
      </table>
    </div>
  );
};
export default Posts;
