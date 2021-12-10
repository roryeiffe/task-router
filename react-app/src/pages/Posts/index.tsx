import Navbar from "../../components/Navbar";
import Posts from '../../components/Posts';
import styles from "./style.module.css";

const Post = () => {
  return (
    <div className={styles.background}>
      <Navbar />
      <Posts />
    </div>
  );
};

export default Post;
