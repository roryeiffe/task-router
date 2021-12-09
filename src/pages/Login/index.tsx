import Login from '../../components/Login';
import Navbar from '../../components/Navbar';
import styles from "./style.module.css";



const LoginPage = () => {
    return (
        <div className={styles.background}>
            <Navbar />
            <Login />
        </div>
    )
}

export default LoginPage;