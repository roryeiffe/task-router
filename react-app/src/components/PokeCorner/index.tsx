// a factory / tool set
import { PokemonClient } from 'pokenode-ts';

export const pokeApi = new PokemonClient();
export async function getPkmnNameByDexNo(dexNo:number):Promise<string> {
    let name:String = 'missingNo.';
    
    await pokeApi.getPokemonById(dexNo)
    .then((data:any) => { name = data.name; })
    .catch(error => { console.error(error); });
    
    return name as string;
}

let url1:string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
let url2:string = ".png";

function getFrontSpriteOf(dexNo:number):JSX.Element {
    return <img src={url1+dexNo+url2} height="65" alt={""+dexNo+".png"}/>;
}

function PokeCorner(dexNo: number):JSX.Element {
    return(
        <div>
            {getFrontSpriteOf(dexNo)}
        </div>
    );
}

export default { PokeCorner, pokeApi, getPkmnNameByDexNo, getFrontSpriteOf };


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