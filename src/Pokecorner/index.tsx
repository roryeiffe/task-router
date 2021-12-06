// a factory / tool set
import { PokemonClient } from 'pokenode-ts';

const pokeApi = new PokemonClient();

// function getPkmnNameByDexNoNoPromise(dexNo:number):String {
//     getPkmnNameByDexNo(dexNo)
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
    
    await pokeApi
    .getPokemonById(dexNo)
    .then((data:any) => {
        name = data.name;
    })
    .catch(error => {
        console.error(error)
    });
    
    return name as string;
}

// ======================================================================
class getPokemonSprite {
    static front(a:number):Promise<any>;
    static front(a:string, ):Promise<any>;
    static front(a:any):Promise<any> {
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
            let tempStr = "type error"
            console.error(tempStr);
            return new Promise<String>(() => {return tempStr});
        }
    }
    static back(a:number):Promise<any>;
    static back(a:string, ):Promise<any>;
    static back(a:any):Promise<any> {
        if(a as number) {
            return getPokemonBackSpriteByDexNo(a);
        }
        else if(a as String) {
            return getPokemonBackSpriteByName(a);
        }
        else {
            let tempStr = "type error"
            console.error(tempStr);
            return new Promise<String>(() => {return tempStr});
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
        console.error(error);
    });
}
async function getPokemonBackSpriteByName(pkmnName:string):Promise<any> {
    await pokeApi
    .getPokemonByName(pkmnName)
    .then((data:any) => {
        return data.sprites.back_default;
    })
    .catch(error => {
        console.error(error);
    });
}
// ======================================================================

// ======================================================================
class getList {
    // static allPokemon():string[] {}
    static allGen1Pokemon():string[] {
        while(true) { // TODO: '-'
            getPokemonList(151).then(list => {
                return list as string[];
            });
            console.error("allGen1Pokemon list is blank");
        }
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
// ======================================================================

export default {getPkmnNameByDexNo, getPokemonSprite, getList};
