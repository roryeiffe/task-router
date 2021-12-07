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
          starterId: 1,
        },
        title: "Laundry",
        description: "Did my laundry today... feeling clean!",
      },
      {
        author: {
          id: 2,
          name: "AJ",
          starterId: 2,
        },
        title: "Dog Walk",
        description: "Walked my dog, had fun chasing squirrels!",
      },
      {
        author: {
          id: 3,
          name: "Cathy",
          starterId: 3,
        },
        title: "Shopping",
        description: "Bought a new kirby plushie!",
      },
    ]);
  }, []);
  return (
    <div className="wrapper">
      <table className = "table table-bordered">
        <tr>
            <th>User</th>
            <th>Title</th>
            <th>Description</th>
        </tr>
        {posts.map((post: any) => (
          <PostItem post={post} />
        ))}
      </table>
    </div>
  );
};
export default Posts;
