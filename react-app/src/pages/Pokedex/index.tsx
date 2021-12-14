import Navbar from "../../components/Navbar"
import PokeCorner from '../../components/PokeCorner';
import PokedexList from '../../components/PokedexList';
import { useState } from 'react';

const PokedexPage = () => {    
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