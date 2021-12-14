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
//============================================================
export let hadCaughtANewPokemon:boolean = false;
// let caughtList:number[] = [];
let count:number = 1;
let dupeTracker:number[] = []; // for debugging
let arr2:string[] = [];

interface ICaughtState {
    dexNo:number;
    isCaught:boolean;
}
export function setHadCaughtANewPokemon(bool:boolean):void {
    hadCaughtANewPokemon = bool;
}

const PokedexList = () => { // variable outside this function executes once; avoid using for loops
    const temp = useSelector((state: any) => state.user);
    const [user, setUser] = useState(temp);
    // let showSpriteOfUncaughtPokemonInitial:boolean = false;
    let [spriteOfUncaught, setSpriteOfUncaught] = useState(false);
    let dexCaughtStates:ICaughtState[] = [{dexNo: 0, isCaught: false}];
    let [dummyArray, setDummyArray] = useState([0]); // removing this stops it for some reason

    // let [caughtList, setCaughtList] = useState<number[]>([1,38,129,151,152]);
    
    useEffect(() => {
        if(hadCaughtANewPokemon) {
            setHadCaughtANewPokemon(false);
            console.log("Show updated dex here");
        }
    });
    // useEffect(() => {
    //     // axios.get('http://localhost:9001/users/'+user.id).then(res => {
    //     //     console.log("Response data: "+res.data);
    //     //     // setCaughtList(res.data.pokemon);
    //     // });
    //     user.pokemon.forEach((entry: any) => {
    //         console.log("Pokemon data "+entry.id+": "+entry.pokemonId);
    //         // caughtList.push(entry.pokemonId);
    //         // setCaughtList([...caughtList, entry.pokemonId]);
    //     })
    // });
    
    if(count<=dexLimit) {
        PokeCorner.getPkmnNameByDexNo(count).then(pkmnString => {
            setDummyArray([...dummyArray, count]);
            // let pkmnString2:string = capitalizeFirstLetter(pkmnString);
            if(pkmnString===arr2[arr2.length-1]) { // add if statement for debugging
                // if duplicate, do nothing
                dupeTracker.push(count);
                console.log("Duplicate: "+pkmnString);
            }
            else {
                arr2.push(pkmnString);
            }            
            // console.log(pkmnString);
            count++;
        })
    }
    
    // let url1:string = "https://pokeapi.co/api/v2/pokemon/";
    // let url2:string = "/sprites/front_default";
    let url1:string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
    let url2:string = ".png";

    function getFrontSprite(dexNo:number, spriteOfUncaught:boolean):JSX.Element {
        if(spriteOfUncaught || isRegistered(dexNo)) {
            return <img src={url1+dexNo+url2} alt={""+dexNo+".png"}/>;
        }
        else {
            // isRegistered(dexNo).then(value => {
            //     if(value) {
            //         return <img src={url1+dexNo+url2} alt={""+dexNo+".png"}/>;
            //     }
            //     else {
            //         return <img src={url1+0+url2} alt="not registered"/>
            //     }
            // });
            // return <>{dexNo}</>;
            
            // console.log("getFrontSprite: "+dexNo+" "+isRegistered(dexNo));  // isRegistered(dexNo) is never true for some reason
            // if(isRegistered(dexNo)) {
            //     return <img src={url1+dexNo+url2} alt={""+dexNo+".png"}/>;
            // }
            // else {
            return <img src={url1+0+url2} alt="not registered"/>
            // }
        }
    }

    function isRegisteredIcon(dexNo:number):JSX.Element {
        // console.log("isRegisteredIcon: "+dexNo+" "+isRegistered(dexNo));
        if(isRegistered(dexNo)) {
            return(<img src={pokeball1s} alt="*" />);
        }
        else {
            return(<img src={pokeball2s} alt="_" />);
        }
    }
    
    function isRegistered(dexNo:number):boolean { // returns the dex number if registered, 0 if unregistered 
        let flag:boolean =false;
        
        if(dexNo === dexCaughtStates[dexCaughtStates.length-1].dexNo) {
            if(dexCaughtStates[dexCaughtStates.length-1].isCaught) {
                return true;
            }
            else {
                return searchDatabase();
            }
        }
        else {
            // let temp:boolean = searchDatabase();
            // if(temp) { return true }
            // else {
            //     dexCaughtStates.push({dexNo: dexNo, isCaught: false});
            //     return false;
            // }
            return searchDatabase();
        }
        function searchDatabase():boolean {
            user.pokemon.forEach((entry:any) => {
                // console.log("stored ID: "+entry.pokemonId+", checking against: "+ dexNo)
                if(entry.pokemonId===dexNo) {
                    // console.log("A match!");
                    dexCaughtStates.push({dexNo: dexNo, isCaught: true});
                    flag = true;
                    return true;
                }
            });
            return flag;
        }
    }
    
    return(
        <div className="dex">
            {/* <button onClick={() => console.log(dupeTracker)}>print to console</button> */}
            {/* <PokemonCard pokemon="magikarp" /> */}
            <button onClick={() => console.log(user)}>getUserInfo</button>
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

function capitalizeFirstLetter(name:string) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

export default PokedexList;