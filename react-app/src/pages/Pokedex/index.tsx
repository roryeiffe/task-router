import Navbar from "../../components/Navbar"
import PokedexList from '../../components/PokedexList';

const PokedexPage = () => {    
    return (
        <div>
            <Navbar/>
            {/* <h1>This is the Pokédex page</h1> */}
            <PokedexList />
        </div>
    )
}

export default PokedexPage;