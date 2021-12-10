import Register from '../../components/Register';
import Navbar from '../../components/Navbar';
import styles from "./style.module.css";


const RegisterPage = () => {
    return (
        <div className={styles.background}>
            <Navbar />
            <Register />
        </div>
    )
}

export default RegisterPage;