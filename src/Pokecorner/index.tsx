// import axios from 'axios';
import React from 'react';
import { PokemonClient, MainClient } from 'pokenode-ts';

// axios.get("https://pokeapi.co/api/v2/pokemon/");

// interface pkmn {
//     dexNo: number;
//     name: String;
// }

async function getPkmnNameById(dexNo:number):Promise<String> {
    // let [name, setName] = React.useState('missingNo.');

    // let tempPoke:pkmn;
    const api = new PokemonClient();
    let name:String = 'missingNo. : )';
    console.log(dexNo);
    
    const bob = await api
    .getPokemonById(dexNo)
    .then((data:any) => {
        // setName(data.name);
        console.log("data.name = "+ data.name);
        name = data.name;
        console.log("name = "+ name);
    })
    .catch((error: any) => {
        console.error(error);
    });
    
    console.log("testing = "+ name);
    return name;
    
}
export default getPkmnNameById;