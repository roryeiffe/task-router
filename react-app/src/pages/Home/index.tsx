import Navbar from '../../components/Navbar';
import Home from '../../components/Home';
import styles from "./style.module.css";

const HomePage = () => {
    return <div className={styles.background}>
        <Navbar />
        <Home />
    </div>
}

export default HomePage;