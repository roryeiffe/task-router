import { useState } from "react";
import Navbar from "../../components/Navbar"
import PokedexList from '../../components/PokedexList';
import styles from './styles.module.css'

const PokedexPage = () => {
    // let [dex, setDex] = useState(<div></div>);
    let [dex, setDex] = useState(<PokedexList start={0} end={0} />);
    
    return (
        <div className={styles.background}>
            <Navbar/>
            {/* <h1>This is the Pokédex page</h1> */}
            <button onClick={() => {setDex(<div></div>); setDex(<PokedexList start={1} end={898} />)}}>Full</button>
            <button onClick={() => {setDex(<div></div>); setDex(<PokedexList start={1} end={151} />)}}>Kanto</button>
            <button onClick={() => {setDex(<div></div>); setDex(<PokedexList start={152} end={251} />)}}>Johto</button>
            <button onClick={() => {setDex(<div></div>); setDex(<PokedexList start={252} end={386} />)}}>Hoenn</button>
            <button onClick={() => {setDex(<div></div>); setDex(<PokedexList start={387} end={493} />)}}>Sinnoh</button>
            <button onClick={() => {setDex(<div></div>); setDex(<PokedexList start={494} end={649} />)}}>Unova</button>
            <button onClick={() => {setDex(<div></div>); setDex(<PokedexList start={650} end={721} />)}}>Kalos</button>
            <button onClick={() => {setDex(<div></div>); setDex(<PokedexList start={722} end={809} />)}}>Alola</button>
            <button onClick={() => {setDex(<div></div>); setDex(<PokedexList start={810} end={898} />)}}>Galar</button>
            {dex}
        </div>
    )
}

export default PokedexPage;