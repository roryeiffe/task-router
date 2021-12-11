import { useState } from "react";

import "./style.css";
import PokeCorner from "../../PokeCorner";
import PokemonCard from "../PokemonCard";
import pokeball1s from "./pokeball1-small.png";
import pokeball2s from "./pokeball2-small.png";
import pokeball1l from "./pokeball1.png";
import pokeball2l from "./pokeball2.png";

let dexLimit = 151;
let count:number = 1;
let dupeTracker:number[] = [];
let arr2:string[] = [];

const PokedexList = () => { // variable outside this function executes once; avoid using for loops
    let [dummyArray, setDummyArray] = useState([0]); // removing this stops it for some reason

    if(count<=dexLimit) {
        PokeCorner.getPkmnNameByDexNo(count).then(pkmnString => {
            setDummyArray([...dummyArray, count]);
            // let pkmnString2:string = capitalizeFirstLetter(pkmnString);
            if(pkmnString==arr2[arr2.length-1]) {
                // if duplicate, do nothing
                dupeTracker.push(count);
            }
            else {
                arr2.push(pkmnString);
            }            
            console.log(pkmnString);
            count++;
        })
    }
    
    // const [tempText, setTempText] = useState("");
    // // let count:number = 0;
    // function dexClickHandler(event:any) {
    //     count++;
    //     PokeCorner.getPkmnNameByDexNo(count).then(pkmnString => {
    //         setTempText(pkmnString);
    //         setArr1([...arr1, pkmnString]);
    //         console.log(pkmnString);
    //     })
    // }
    
    return(
        <div className="container">

            {/* <p> -------------------------------------------- Beginning
                -------------------------------------------- </p> */}
            {/* <button onClick={() => console.log(dupeTracker)}>print to console</button> */}
            <p>{loadingBar(count)}</p>
            <ul className="checklist"> 
                {arr2.map((value, id) => {
                    return <li>
                        {isRegisteredIcon(value)} 
                        {capitalizeFirstLetter(value)} 
                        {getSprite(id+1)}
                    </li>;
                })}
            </ul>
            {/* <p> ------------------------------------------------ End
                ------------------------------------------------ </p> */}
        </div>
    );
}

// let url1:string = "https://pokeapi.co/api/v2/pokemon/";
// let url2:string = "/sprites/front_default";
let url1:string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
let url2:string = ".png";

function getSprite(dexNo:number):JSX.Element {
    return <img src={url1+dexNo+url2} alt={url1+dexNo+url2}/>;
}

function isRegisteredIcon(pkmnName:string) {
    let dexNo:number = count; // TODO: temp fix
    // TODO: check if ID on User's caught list
    let caught:boolean = true;

    if(caught) {
        return(<img src={pokeball1s} alt="*" />);
    }
    else {
        return(<img src={pokeball2s} alt="_" />);
    }

}

function loadingBar(currentPosition:number) {
    if(currentPosition>dexLimit) { // disappears at 101
        return;
    }
    else {
        let percentage:number = Math.round(100*(currentPosition/dexLimit));
        return "Loading... " + percentage + "% ["+currentPosition+ "/"+dexLimit+"]";
    }
}

// async function asyncThing() {
//     for(let i = 1; i<=151; i++) {
//         PokeCorner.getPkmnNameByDexNo(i).then(pkmnString => {
//             arr2.push(pkmnString);
//             console.log(pkmnString);
//         })
//     }
//     return arr2 as string[];
// }

function capitalizeFirstLetter(name:string) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

export default PokedexList;