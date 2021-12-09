import Navbar from "../../components/Navbar";
import Profile from "../../components/ProfileView";
import StarterView from "../../components/StarterView";
import styles from "./style.module.css";

const ProfilePage = () => {
  return (
    <div className={styles.background}>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <Profile />
          </div>
          <div className="col-lg-6">
            <StarterView />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
