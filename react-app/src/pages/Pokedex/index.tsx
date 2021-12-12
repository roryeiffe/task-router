import Navbar from "../../components/Navbar"
import PokeCorner from '../../components/PokeCorner';
import PokedexList from '../../components/PokedexList';
import { useState } from 'react';

const PokedexPage = () => {
    
    // testing ======================================================
    let tempNum = 151;
    let [tempPkmnName, setTempPkmnName] = useState("missingNo..");
    PokeCorner.getPkmnNameByDexNo(tempNum).then(pkmnString => {
        // console.log(pkmnString);
        setTempPkmnName(pkmnString);
    });
    console.log(tempPkmnName);
    
    // let [tempSprite, setTempSprite] = useState(null);
    // setTempSprite(PokeCorner.getPokemonSprite.front(tempNum));
    //================================================================
    
    return (
        <div>
            <Navbar/>
            {/* <h1>This is the Pokédex page</h1> */}
            <PokedexList />
            {/* {tempSprite} */}
            {/* {tempPkmnName} */}
            {/* <PokemonCard pokemon={tempPkmnName} /> */}
        </div>
    )
}

export default PokedexPage;