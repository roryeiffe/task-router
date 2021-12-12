import styles from "./style.module.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Welcome to Task Router!</h1>
        <br />
        <h3>The all-in-one social media pokedex app!</h3>
        <br />
        <h3>Features include:</h3>
        <ul className={`list-group ${styles.list}`}>
          <li className="list-group-item">Manage Your Every Day Tasks</li>
          <li className="list-group-item">Add Friends</li>
          <li className="list-group-item">Make Posts and View Others' Posts</li>
          <li className="list-group-item">Update Your Proflie Anytime</li>
          <li className="list-group-item">Watch Your Pokedex Collection Grow!</li>
        </ul>
        <br />
        <h5><Link to="/login">Login</Link> or <Link to="/register">Signup</Link> to get started!</h5>
      </div>
    </div>
  );
};

export default Home;
