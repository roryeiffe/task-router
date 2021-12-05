// import axios from 'axios';
import React from 'react';
import { PokemonClient, MainClient } from 'pokenode-ts';
import Navbar from "../../components/Navbar"
import PokeCorner from '../../PokeCorner';
import PokedexList from '../../components/PokedexList';
import { useState } from 'react';

const PokedexPage = () => {
    
    // testing ======================================================
    let tempNum = 151;
    // let [tempSprite, setTempSprite] = useState(null);
    // setTempSprite(PokeCorner.getPokemonSprite.front(tempNum));
    let [tempPkmnName, setTempPkmnName] = useState("missingNo..");
    PokeCorner.getPkmnNameByDexNo(tempNum).then(pkmnString => {
        // console.log(pkmnString);
        setTempPkmnName(pkmnString);
    });
    console.log(tempPkmnName);
    //================================================================
    
    return (
        <div>
            <Navbar/>
            <h1>This is the Pokédex page</h1>
            <PokedexList />
            {/* {tempSprite} */}
            {tempPkmnName}
            {/* <PokemonCard pokemon={tempPkmnName} /> */}
        </div>
    )
}

export default PokedexPage;