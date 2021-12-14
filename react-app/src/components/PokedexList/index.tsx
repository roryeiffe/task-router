import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'

import "./style.css";
import { getPkmnNameByDexNo, capFirstLetter } from "../PokeCorner";

import pokeball1s from "../../images/pokeball1-small.png";
import pokeball2s from "../../images/pokeball2-small.png";

// editable parameters =======================================
export let dexLimit = 898; // 898 total Pokemon
//============================================================
let hadCaughtANewPokemon:boolean = false;
let count:number = 1;
let dupeTracker:number[] = []; // for debugging
let dexArr:string[] = [];

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
    let [spriteOfUncaught, setSpriteOfUncaught] = useState(false);
    let dexCaughtStates:ICaughtState[] = [{dexNo: 0, isCaught: false}];
    let [dummyArray, setDummyArray] = useState([0]); // removing this stops it for some reason
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(hadCaughtANewPokemon) {
            console.log("Show updated dex here");
            dispatch({type: 'UPDATE_USER', payload: user});
            setHadCaughtANewPokemon(false);
        }  
    });
    
    if(count<=dexLimit) {
        getPkmnNameByDexNo(count).then(pkmnString => {
            setDummyArray([...dummyArray, count]);
            if(pkmnString===dexArr[dexArr.length-1]) { // if duplicate, do nothing
                dupeTracker.push(count);
                console.log("Duplicate: "+pkmnString);
            }
            else {
                dexArr.push(pkmnString);
            }            
            count++;
        });
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
            return <img src={url1+0+url2} alt="not registered"/>
        }
    }

    function isRegisteredIcon(dexNo:number):JSX.Element {
        if(isRegistered(dexNo)) {
            return(<img src={pokeball1s} alt="*" />);
        }
        else {
            return(<img src={pokeball2s} alt="_" />);
        }
    }
    
    function isRegistered(dexNo:number):boolean {
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
            return searchDatabase();
        }
        function searchDatabase():boolean {
            user.pokemon.forEach((entry:any) => {
                if(entry.pokemonId===dexNo) { // console.log("A match!");
                    dexCaughtStates.push({dexNo: dexNo, isCaught: true});
                    flag = true;
                    return true;
                }
            });
            return flag;
        }
    }
    
    function loadingBar(currentPosition:number) { // TODO: onClick stop loading
        if(currentPosition>dexLimit) { // disappears at 101
            return <></>;
        }
        else {
            let percentage:number = Math.round(100*(currentPosition/dexLimit));
            return <>{"Loading... " + percentage + "% ["+currentPosition+ "/"+dexLimit+"]"}</>;
        }
    }
    
    return(
        <div className="dex">
            {/* <button onClick={() => console.log(user)}>print user info to console</button> */}
            <>{user.pokemon.length} of {dexLimit} Pokémon caught</> <br/>
            <button onClick={() => setSpriteOfUncaught(!spriteOfUncaught)}>show/hide uncaught</button><br/>
            <>{loadingBar(count)}</> <br/>
            <ul className="checklist"> 
                {dexArr.map((value, id) => {
                    return <li className="dex-entry">
                        #{id+1} <br/>
                        {getFrontSprite(id+1, spriteOfUncaught)} <br/>
                        {isRegisteredIcon(id+1)} {" "} {capFirstLetter(value)} <br/><br/>
                    </li>;
                })}
            </ul>
        </div>
    );
}

export default PokedexList;