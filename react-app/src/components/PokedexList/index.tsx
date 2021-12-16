import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import './style.css';
import { getPkmnNameByDexNo, capFirstLetter } from "../PokeCorner";
import pokeball1s from "../../images/pokeball1-small.png";
import pokeball2s from "../../images/pokeball2-small.png";
import questionMark from "../../images/question_mark.png"
import axios from "axios";
// editable parameters =======================================
export let dexLimit = 898; // 898 total Pokemon
//============================================================
let hadCaughtANewPokemon:boolean = false;
let count:number = 1;
let dupeTracker:number[] = []; // for debugging
let dexArr:string[] = ["bulbasaur"];
let dexCaughtStates:ICaughtState[] = [];

interface ICaughtState {
    dexNo:number;
    name:string;
    isCaught:boolean;
}

export function setHadCaughtANewPokemon(bool:boolean):void {
    hadCaughtANewPokemon = bool;
}

const PokedexList = () => { // variable outside this function executes once; avoid using for loops
    const temp1 = useSelector((state: any) => state.user);
    const [user, ] = useState(temp1);
    let [spriteOfUncaught, setSpriteOfUncaught] = useState(false);
    let [dummyArray, setDummyArray] = useState([0]); // removing this stops it for some reason
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(hadCaughtANewPokemon) {
            dispatch({type: 'UPDATE_USER', payload: user});
            setHadCaughtANewPokemon(false);
        }
        loadDex();
    });
    
    async function loadDex() {
        if(count<=dexLimit) {
            await getPkmnNameByDexNo(count).then(pkmnString => {
                setDummyArray([...dummyArray, count]);
                let temp2:ICaughtState = {dexNo: count, name: pkmnString, isCaught: isRegistered(count)};
                dexCaughtStates.push(temp2);
                
                if(pkmnString===dexArr[dexArr.length-1] ||
                    pkmnString===dexArr[dexArr.length-2] ||
                    pkmnString===dexArr[dexArr.length-3]
                    ) { // if duplicate, do nothing
                    dupeTracker.push(count);
                    console.log("Duplicate: "+pkmnString);
                }
                else {
                    dexArr.push(pkmnString);
                }            
                count++;
            });
        }
        else {
            count = dexLimit+1;
            while(dexArr.length<dexLimit){
                await getPkmnNameByDexNo(dexArr.length).then(pkmnName => {
                    dexArr.push(pkmnName);
                    dispatch({type: 'UPDATE_USER', payload: user});
                });
            }
            console.log(dexArr.length, dexCaughtStates.length, count);
        }
    }
    
    // let url1:string = "https://pokeapi.co/api/v2/pokemon/";
    // let url2:string = "/sprites/front_default";
    let url1:string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
    let url2:string = ".png";
    let url3:string = "https://pokemondb.net/pokedex/";
    let url4:string = "https://archives.bulbagarden.net/media/upload/8/8e/Spr_3r_000.png";

    function getFrontSprite(dexNo:number, forceShowSprite:boolean):JSX.Element {
        if(forceShowSprite || spriteOfUncaught || isRegistered(dexNo)) {
            return <img src={url1+dexNo+url2} alt={""+dexNo+".png"}/>;
        }
        else {
            return <img src={questionMark} alt="not registered"/>
        }
    }

    function isRegisteredIcon(dexNo:number):JSX.Element {
        if(isRegistered(dexNo)) {
            return(<img src={pokeball1s} alt="*" />);
        }
        else { return(<img src={pokeball2s} alt="_" />); }
    }
    
    function isRegistered(dexNo:number):boolean {
        let flag:boolean =false;
        return searchDatabase();
        // if(dexNo === dexCaughtStates[dexCaughtStates.length-1].dexNo) {
        //     if(dexCaughtStates[dexCaughtStates.length-1].isCaught) {
        //         return true;
        //     }
        //     else { return searchDatabase(); }
        // }
        // else { return searchDatabase(); }
        
        function searchDatabase():boolean {
            user.pokemon.forEach((entry:any) => {
                if(entry.pokemonId===dexNo) { // console.log("A match!");
                    // dexCaughtStates.push({dexNo: dexNo, isCaught: true});
                    flag = true;
                    return true;
                }
            });
            return flag;
        }
    }
    
    function loadingBar() { // TODO: onClick stop loading
        if(count>dexLimit) { // disappears at 101
            return <></>;
        }
        else {
            let percentage:number = Math.round(100*(count/dexLimit));
            return <>{"Loading... " + percentage + "% ["+count+ "/"+dexLimit+"]"}</>;
        }
    }
    let [tempDexNo, setTempDexNo] = useState(0);
    function addDebugPkmnHandler1(event:React.ChangeEvent<HTMLInputElement>) {
        setTempDexNo(parseInt(event.target.value));
    }
    function addDebugPkmnHandler2() {
        if(tempDexNo>0 && tempDexNo<=dexLimit) {
            // add to user's pokedex:
            axios.put('http://localhost:9001/pokemon/update/'+user.id , {pokemonId: tempDexNo})
            .then(response => dispatch({type: 'ADD_POKEMON', payload: response.data}))
            .catch(error => console.error(error));
            setHadCaughtANewPokemon(true);
        }
        else {
            alert("Dex number out of range");
        }
    }
    return(
        <div className="dex">
            <span className="loading">
                <input type="number" onChange={(event) => addDebugPkmnHandler1(event)} placeholder="Dex number"/>
                <button onClick={addDebugPkmnHandler2}>add to Pokedex</button><br/>
                <button onClick={() => console.log(dexArr)}>print to console</button><br/>
                <>{user.pokemon.length} of {dexLimit} Pokémon caught</> <br/>
                <button className="button" onClick={() => setSpriteOfUncaught(!spriteOfUncaught)}>show/hide uncaught</button><br/>
                <>{loadingBar()}</>
            </span><br/>
            <ul className="checklist"> 
                {dexArr.map((value, id) => {
                    return <li className="dexEntry">
                        #{id+1} <br/>
                        {getFrontSprite(id+1, false)} <br/>
                        {isRegisteredIcon(id+1)} {" "} {capFirstLetter(value)} <br/><br/>
                    </li>;
                })}
            </ul>
        </div>
    );
}

export default PokedexList;