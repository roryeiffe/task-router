import { PokemonClient } from 'pokenode-ts';
import React from 'react';
import { useState } from 'react';
import './style.css';
import PokeCorner, { pokeApi, capitalizeFirstLetter } from '../PokeCorner';
import {caughtList} from '../PokedexList';

// editable parameters ================================
let catchRateMultiplier:number = 3;
//=====================================================

let url1:string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
let url2:string = ".png";

function getFrontSpriteOf(dexNo:number):JSX.Element {
    return <img src={url1+dexNo+url2} height="100" alt={""+dexNo+".png"}/>;
}

// // bag is too complex for the scope of the project:
// export function addPokeballToBag(points:number) {}
// function bagHandler():JSX.Element {
//     let [bag, setBag] = useState([0]);
//     // .map onClick={throwPokeball}
// }

function CatchingCorner(points: number):JSX.Element {
    let [opponentPkmn, setOpponentPkmn] = useState(Math.round(898*Math.random()));
    let [textBox, setTextBox] = useState("");

    PokeCorner.getPkmnNameByDexNo(opponentPkmn).then(pkmnName => {
        let newPkmnName = capitalizeFirstLetter(pkmnName);
        console.log("A wild "+newPkmnName+" appeared!")
        setTextBox("A wild "+newPkmnName+" appeared!")
    });
    
    async function refresh() {
        setOpponentPkmn(Math.round(898*Math.random())); // only pick from uncaught pkmn
        // await PokeCorner.getPkmnNameByDexNo(opponentPkmn).then(pkmnName => {
        //     console.log("A wild "+pkmnName+" appeared!")
        //     setTextBox("A wild "+pkmnName+" appeared!")
        // });
    }
    const delay = async (ms: number) => new Promise(res => setTimeout(res, ms));
    
    async function throwPokeball(points:number) { // points = number of tries?
        await pokeApi.getPokemonSpeciesById(opponentPkmn).then(pkmn => {
            let successRate:number = pkmn.capture_rate*catchRateMultiplier; // always out of 255
            console.log("You threw "+points+" pokeballs.");
            setTextBox("You threw "+points+" pokeballs.");
            console.log("Catch rate: "+ successRate);
            setTimeout(() => null, 2000);
            for(let i=0; i<points; i++) {
                let rngesus = 255*Math.random();
                delay(2000); // wait for 2 seconds
                if(rngesus < successRate) {
                    // Pokemon is caught
                    console.log(opponentPkmn+" is caught!");
                    setTextBox(opponentPkmn+" is caught!");
                    delay(2000); // wait for 2 seconds
                    caughtList.push(opponentPkmn); // add to user's pokedex
                    refresh();
                    break;
                }
                else {
                    // Pokemon broke free
                    console.log(opponentPkmn+" broke free!");
                }
            }
        })

    }
    
    return(
        <span className='catching-corner'>
            {/* {bagHandler} */}
            {textBox} <br/>
            <button onClick={() => throwPokeball(5)}>throw 5 Pokéballs</button>
            <button onClick={refresh}>refresh</button>
            {getFrontSpriteOf(opponentPkmn)}
        </span>
    );
}

export default CatchingCorner;


// async function getDexNoByName(pkmnName:string):Promise<number> {
//     let dexNo:number;
//     await pokeApi.getPokemonByName(pkmnName).then(data => {dexNo = data.id});
//     return dexNo;
// }

// ======================================================================
// class getPokemonSprite {
//     static front(a:number):Promise<any>;
//     static front(a:string, ):Promise<any>;
//     static front(a:any):Promise<any> {
//         if(a as number) {
//             // getPkmnNameByDexNo(a).then(pkmnName => {
//             //     return <PokemonCard pokemon={pkmnName} />;
//             // });
//             return getPokemonFrontSpriteByDexNo(a);
//         }
//         else if(a as String) {
//             // return <PokemonCard pokemon={a} />
//             return getPokemonFrontSpriteByName(a);
//         }
//         else {
//             let tempStr = "type error"
//             console.error(tempStr);
//             return new Promise<String>(() => {return tempStr});
//         }
//     }
//     static back(a:number):Promise<any>;
//     static back(a:string, ):Promise<any>;
//     static back(a:any):Promise<any> {
//         if(a as number) {
//             return getPokemonBackSpriteByDexNo(a);
//         }
//         else if(a as String) {
//             return getPokemonBackSpriteByName(a);
//         }
//         else {
//             let tempStr = "type error"
//             console.error(tempStr);
//             return new Promise<String>(() => {return tempStr});
//         }
//     }
// }
// async function getPokemonFrontSpriteByDexNo(dexNo:number):Promise<any> {
//     await pokeApi
//     .getPokemonById(dexNo)
//     .then((data:any) => {
//         return data.sprites.front_default;
//     })
//     .catch(error => {
//         console.error(error);
//     });
// }
// async function getPokemonFrontSpriteByName(pkmnName:string):Promise<any> {
//     await pokeApi
//     .getPokemonByName(pkmnName)
//     .then((data:any) => {
//         return data.sprites.front_default;
//     })
//     .catch(error => {
//         console.error(error)
//     });
// }
// async function getPokemonBackSpriteByDexNo(pkmnName:string):Promise<any> {
//     await pokeApi
//     .getPokemonByName(pkmnName)
//     .then((data:any) => {
//         return data.sprites.back_default;
//     })
//     .catch(error => {
//         console.error(error);
//     });
// }
// async function getPokemonBackSpriteByName(pkmnName:string):Promise<any> {
//     await pokeApi
//     .getPokemonByName(pkmnName)
//     .then((data:any) => {
//         return data.sprites.back_default;
//     })
//     .catch(error => {
//         console.error(error);
//     });
// }
// ======================================================================
// ======================================================================
// export class getList {
//     // static allPokemon():string[] {}
//     static allGen1Pokemon():string[] {
//         while(true) { // TODO: '-'
//             getPokemonList(151).then(list => {
//                 return list as string[];
//             });
//             console.error("allGen1Pokemon list is blank");
//         }
//     }
// }
// async function getPokemonList(upTo:number):Promise<string[]> {
//     let arr:string[] = new Array();
//     for(let i = 0; i<upTo; i++) {
//         getPkmnNameByDexNo(i).then(tempName => {
//             arr.push(tempName);
//             console.log(tempName);
//         });
//     }
//     return arr;
// }

// ======================================================================

// export function capitalizeFirstLetter(name:string) {
//     return name.charAt(0).toUpperCase() + name.slice(1);
// }

// export default {
//     PokeCorner,
//     pokeApi, 
//     getPkmnNameByDexNo, 
//     getDexNoByName,
//     getPokemonSprite, 
//     getList, 
//     capitalizeFirstLetter
// };