import Navbar from "../../components/Navbar"
import PokedexList from '../../components/PokedexList';
import styles from './styles.module.css'

const PokedexPage = () => {    
    return (
        <div className={styles.background}>
            <Navbar/>
            {/* <h1>This is the Pokédex page</h1> */}
            <PokedexList />
        </div>
    )
}

export default PokedexPage;