// also a factory / tool set ?
import { PokemonClient } from 'pokenode-ts';

export const pokeApi = new PokemonClient();
export async function getPkmnNameByDexNo(dexNo:number):Promise<string> {
    let name:String = 'missingNo.';
    
    await pokeApi.getPokemonSpeciesById(dexNo)
    .then((data:any) => { name = data.name; })
    .catch(error => { console.error(error); });
    
    return name as string;
}

let urlA:string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
let urlB:string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/";
let urlEnd:string = ".png";

export function getFrontSpriteOf(dexNo:number):JSX.Element {
    return <img src={urlA+dexNo+urlEnd} height="65" alt={""+dexNo+".png"}/>;
}

export function capFirstLetter(name:string) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

function PokeCorner(dexNo: number):JSX.Element {
    return(
        <div>
            {getFrontSpriteOf(dexNo)}
        </div>
    );
}

export default PokeCorner;
