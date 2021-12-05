// import axios from 'axios';
import React, { useState } from 'react';
import { PokemonClient, MainClient } from 'pokenode-ts';
import PokemonCard from '../components/PokemonCard';

// axios.get("https://pokeapi.co/api/v2/pokemon/");

// interface pkmn {
//     dexNo: number;
//     name: String;
// }
const pokeApi = new PokemonClient();

// function getPkmnNameById1(dexNo:number):String {
//     getPkmnNameById2(dexNo)
//     .then(data => {
//         return data as String
//     })
//     .catch(error => {
//         // console.error(error);
//         return error as String;
//     });
//     return "";
// }

async function getPkmnNameByDexNo(dexNo:number):Promise<string> {
    let name:String = 'missingNo.';
    // console.log(dexNo);
    
    await pokeApi
    .getPokemonById(dexNo)
    .then((data:any) => {
        // console.log("data.name = "+ data.name);
        name = data.name;
        // console.log("name = "+ name);
    })
    .catch(error => {
        // console.error(error)
    });
    
    // console.log("testing = "+ name);
    return name as string;
    
}

class getPokemonSprite {
    static front(a:number):any;
    static front(a:string, ):any;
    static front(a:any):any {
        if(a as number) {
            // getPkmnNameByDexNo(a).then(pkmnName => {
            //     return <PokemonCard pokemon={pkmnName} />;
            // });
            return getPokemonFrontSpriteByDexNo(a);
        }
        else if(a as String) {
            // return <PokemonCard pokemon={a} />
            return getPokemonFrontSpriteByName(a);
        }
        else {
            console.error("type error");
            return "type error";
        }
    }
    static back(a:number):any;
    static back(a:string, ):any;
    static back(a:any):any {
        if(a as number) {
            return getPokemonBackSpriteByDexNo(a);
        }
        else if(a as String) {
            return getPokemonBackSpriteByName(a);
        }
        else {
            // console.error("type error");
            return "type error";
        }
    }
}

async function getPokemonFrontSpriteByDexNo(dexNo:number):Promise<any> {
    await pokeApi
    .getPokemonById(dexNo)
    .then((data:any) => {
        return data.sprites.front_default;
    })
    .catch(error => {
        console.error(error);
    });
}
async function getPokemonFrontSpriteByName(pkmnName:string):Promise<any> {
    await pokeApi
    .getPokemonByName(pkmnName)
    .then((data:any) => {
        return data.sprites.front_default;
    })
    .catch(error => {
        console.error(error)
    });
}
async function getPokemonBackSpriteByDexNo(pkmnName:string):Promise<any> {
    await pokeApi
    .getPokemonByName(pkmnName)
    .then((data:any) => {
        return data.sprites.back_default;
    })
    .catch(error => {
        // console.error(error);
    });
}
async function getPokemonBackSpriteByName(pkmnName:string):Promise<any> {
    await pokeApi
    .getPokemonByName(pkmnName)
    .then((data:any) => {
        return data.sprites.back_default;
    })
    .catch(error => {
        // console.error(error);
    });
}

class getList {
    // static allPokemon():string[] {
        
    // }
    static allGen1Pokemon():string[] {
        while(true) {
            getPokemonList(151).then(list => {
                return list as string[];
            });
            console.error("allGen1Pokemon list is blank");
        }

        // return new Array<string>();
    }
}

async function getPokemonList(upTo:number):Promise<string[]> {
    let arr:string[] = new Array();
    for(let i = 0; i<upTo; i++) {
        getPkmnNameByDexNo(i).then(tempName => {
            arr.push(tempName);
            console.log(tempName);
        });
    }
    return arr;
}

export default {getPkmnNameByDexNo, getPokemonSprite, getList};
