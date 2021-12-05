// import axios from 'axios';
import React from 'react';
import { PokemonClient, MainClient } from 'pokenode-ts';
import Navbar from "../../components/Navbar"
import PokeCorner from '../../Pokecorner';
import { useState } from 'react';

const PokedexPage = () => {
    
    let tempNum1 = 151;
    // let [temp1, setTemp1] = useState(null);
    // setTemp1(PokeCorner.getPokemonSprite.front(tempNum1));
    let [temp2, setTemp2] = useState("missingNo..");
    PokeCorner.getPkmnNameByDexNo(tempNum1).then(pkmnString => {
        // console.log(pkmnString);
        setTemp2(pkmnString);
    });
    console.log(temp2);
    
    // let [arr, setArr] = useState(new Array);
    // setArr(PokeCorner.getList.allGen1Pokemon());
    // .then(list => setArr(list));
    
    return (
        <div>
            <Navbar/>
            <h1>This is the Pokédex page</h1>
            {/* {temp1} */}
            {temp2}
            {/* <PokemonCard pokemon={temp2} /> */}
            {/* {arr} */}
        </div>
    )
}

export default PokedexPage;