import styles from  "./style.module.css";
import Navbar from "../../components/Navbar"
import FriendList from "../../components/FriendList";

const FriendPage = () => {
    
    return (
        <div className={styles.background}>
            <Navbar/>
            <div className={styles.container}>
                <FriendList />
            </div>
        </div>
    )
}

export default FriendPage;
