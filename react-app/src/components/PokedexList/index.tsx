import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import axios from "axios";

import "./style.css";
import PokeCorner from "../PokeCorner";
import PokemonCard from "../PokemonCard";

import pokeball1s from "../../images/pokeball1-small.png";
import pokeball2s from "../../images/pokeball2-small.png";
import pokeball1l from "../../images/pokeball1.png";
import pokeball2l from "../../images/pokeball2.png";

// editable parameters =======================================
export let dexLimit = 898; // 898 total Pokemon
let isAllCaught:boolean = false; // for testing, set to false
// ===========================================================
let showSpriteOfUncaughtPokemonInitial:boolean = false;

// export let caughtList:number[] = [1,38,129,151,152];
let count:number = 1;
let dupeTracker:number[] = []; // for debugging
let arr2:string[] = [];

const PokedexList = () => { // variable outside this function executes once; avoid using for loops
    const temp = useSelector((state: any) => state.user);
    const [user, setUser] = useState(temp);
    let [spriteOfUncaught, setSpriteOfUncaught] = useState(showSpriteOfUncaughtPokemonInitial);
    let [dummyArray, setDummyArray] = useState([0]); // removing this stops it for some reason
    let [caughtList, setCaughtList] = useState<number[]>([]);
    
    useEffect(() => {
        axios.get('http://localhost:9001/user/'+user.id).then(res => {
            console.log(res.data);
            setCaughtList(res.data.pokemon);
        });
        console.log("Hello");
    },[caughtList]);
    
    if(count<=dexLimit) {
        PokeCorner.getPkmnNameByDexNo(count).then(pkmnString => {
            setDummyArray([...dummyArray, count]);
            // let pkmnString2:string = capitalizeFirstLetter(pkmnString);
            if(pkmnString===arr2[arr2.length-1]) { // add if statement for debugging
                // if duplicate, do nothing
                dupeTracker.push(count);
            }
            else {
                arr2.push(pkmnString);
            }            
            // console.log(pkmnString);
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
    
    // let url1:string = "https://pokeapi.co/api/v2/pokemon/";
    // let url2:string = "/sprites/front_default";
    let url1:string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
    let url2:string = ".png";

    function getFrontSprite(dexNo:number, spriteOfUncaught:boolean):JSX.Element {
        if(spriteOfUncaught) {
            return <img src={url1+dexNo+url2} alt={""+dexNo+".png"}/>;
        }
        else {
            if(isRegistered(dexNo)) {
                return <img src={url1+dexNo+url2} alt={""+dexNo+".png"}/>;
            }
            else {
                return <img src={url1+0+url2} alt="not registered"/>
            }
        }
    }

    function isRegisteredIcon(dexNo:number):JSX.Element {
        if((isRegistered(dexNo))) {
            return(<img src={pokeball1s} alt="*" />);
        }
        else {
            return(<img src={pokeball2s} alt="_" />);
        }
    }
    function isRegistered(dexNo:number):boolean { // returns the dex number if registered, 0 if unregistered 
        caughtList.forEach(entry => {
            if(entry===dexNo) {
                console.log(entry+" is registered.");
                return true;
            }
        });
        return isAllCaught; // for testing, should be false
        // let caught:boolean = ; // TODO: check database if pokemon on User's caught list
        // if(caught) {
        //     return true;
        // }
        // else {
        //     return false;
        // }
    }
    
    return(
        <div className="dex">
            {/* <p> -------------------------------------------- Beginning
                -------------------------------------------- </p> */}
            {/* <button onClick={() => console.log(dupeTracker)}>print to console</button> */}
            {/* <PokemonCard pokemon="magikarp" /> */}
            <button onClick={() => setSpriteOfUncaught(!spriteOfUncaught)}>show/hide uncaught</button><br/>
            <>{loadingBar(count)}</>
            <ul className="checklist"> 
                {arr2.map((value, id) => {
                    return <li className="dex-entry">
                        #{id+1} <br/>
                        {getFrontSprite(id+1, spriteOfUncaught)} <br/>
                        {isRegisteredIcon(id+1)} {" "} {capitalizeFirstLetter(value)} <br/>
                        ---------------<br/>
                    </li>;
                })}
            </ul>
            {/* <p> ------------------------------------------------ End
                ------------------------------------------------ </p> */}
        </div>
    );
}



function loadingBar(currentPosition:number) { // TODO: onClick stop loading
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