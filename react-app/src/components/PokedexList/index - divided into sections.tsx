import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import './style.css';
import { getPkmnNameByDexNo, capFirstLetter } from "../PokeCorner";
import pokeball1s from "../../images/pokeball1-small.png";
import pokeball2s from "../../images/pokeball2-small.png";
import questionMark from "../../images/question_mark.png"
import axios from "axios";

export let dexLimit = 898; // 898 total Pokemon
let dexLimitGen8 = 898;
let dexLimitGen7 = 809;
let dexLimitGen6 = 721;
let dexLimitGen5 = 649;
let dexLimitGen4 = 493;
let dexLimitGen3 = 387;
let dexLimitGen2 = 251;
let dexLimitGen1 = 151;

let hadCaughtANewPokemon:boolean = false;
let count:number = 1;
let dexCaughtStates:ICaughtState[][] = [[],[],[],[],[],[],[],[]];
interface ICaughtState {
    dexNo:number;
    name:string;
    isCaught:boolean;
}

export function setHadCaughtANewPokemon(bool:boolean):void {
    hadCaughtANewPokemon = bool;
}

const PokedexList = () => {
    const temp1 = useSelector((state: any) => state.user);
    const [user, ] = useState(temp1);
    let [spriteOfUncaught, setSpriteOfUncaught] = useState(false);
    let [dummyArray, setDummyArray] = useState([0]); // removing this stops it for some reason
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(hadCaughtANewPokemon) {
            dispatch({type: 'UPDATE_USER', payload: user});
            // dispatch({type: 'UPDATE_POKEMON'});

            // update to see new pokemon:
            // axios.put('http://localhost:9001/pokemon/update/'+user.id)
            // .then(response => dispatch({type: 'UPDATE_POKEMON'}))
            // .catch(error => console.error(error));
            setHadCaughtANewPokemon(false);
        }
        loadDex();
    });

    async function loadDex() {
        if(count<=dexLimitGen1) {
            await getPkmnNameByDexNo(count).then(pkmnString => {
                setDummyArray([...dummyArray, count]);
                let temp2:ICaughtState = {dexNo: count, name: pkmnString, isCaught: isRegistered(count)};
                // if(pkmnString===dexCaughtStates[0][dexCaughtStates[0].length-1].name ||
                //     pkmnString===dexCaughtStates[0][dexCaughtStates[0].length-2].name ||
                //     pkmnString===dexCaughtStates[0][dexCaughtStates[0].length-3].name
                //     ) { // if duplicate, do nothing
                //     // dupeTracker.push(count);
                //     console.log("Duplicate: "+pkmnString);
                // }
                // else {}
                dexCaughtStates[0].push(temp2);
                count++;
                
            });
        }
        else if(count<=dexLimitGen2) {
            await getPkmnNameByDexNo(count).then(pkmnString => {
                setDummyArray([...dummyArray, count]);
                let temp2:ICaughtState = {dexNo: count, name: pkmnString, isCaught: isRegistered(count)};
                dexCaughtStates[1].push(temp2);
                count++;
            });  
        }
        else if(count<=dexLimitGen3) {
            await getPkmnNameByDexNo(count).then(pkmnString => {
                setDummyArray([...dummyArray, count]);
                let temp2:ICaughtState = {dexNo: count, name: pkmnString, isCaught: isRegistered(count)};
                dexCaughtStates[2].push(temp2);
                count++;
            });  
        }
        else if(count<=dexLimitGen4) {
            await getPkmnNameByDexNo(count).then(pkmnString => {
                setDummyArray([...dummyArray, count]);
                let temp2:ICaughtState = {dexNo: count, name: pkmnString, isCaught: isRegistered(count)};
                dexCaughtStates[3].push(temp2);
                count++;
            });  
        }
        else if(count<=dexLimitGen5) {
            await getPkmnNameByDexNo(count).then(pkmnString => {
                setDummyArray([...dummyArray, count]);
                let temp2:ICaughtState = {dexNo: count, name: pkmnString, isCaught: isRegistered(count)};
                dexCaughtStates[4].push(temp2);
                count++;
            });  
        }
        else if(count<=dexLimitGen6) {
            await getPkmnNameByDexNo(count).then(pkmnString => {
                setDummyArray([...dummyArray, count]);
                let temp2:ICaughtState = {dexNo: count, name: pkmnString, isCaught: isRegistered(count)};
                dexCaughtStates[5].push(temp2);
                count++;
            });  
        }
        else if(count<=dexLimitGen7) {
            await getPkmnNameByDexNo(count).then(pkmnString => {
                setDummyArray([...dummyArray, count]);
                let temp2:ICaughtState = {dexNo: count, name: pkmnString, isCaught: isRegistered(count)};
                dexCaughtStates[6].push(temp2);
                count++;
            });  
        }
        else if(count<=dexLimitGen8) {
            await getPkmnNameByDexNo(count).then(pkmnString => {
                setDummyArray([...dummyArray, count]);
                let temp2:ICaughtState = {dexNo: count, name: pkmnString, isCaught: isRegistered(count)};
                dexCaughtStates[7].push(temp2);
                count++;
            });  
        }
        else {
            // count = dexLimit+1;
            // while(dexArr.length<dexLimit){
            //     await getPkmnNameByDexNo(dexArr.length).then(pkmnName => {
            //         dexArr.push(pkmnName);
            //         dispatch({type: 'UPDATE_USER', payload: user});
            //     });
            // }
            // console.log(dexArr.length, dexCaughtStates.length, count);
        }
    }
    
    // let url1:string = "https://pokeapi.co/api/v2/pokemon/";
    // let url2:string = "/sprites/front_default";
    let url1:string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
    let url2:string = ".png";
    let url3:string = "https://pokemondb.net/pokedex/";
    let url4:string = "https://archives.bulbagarden.net/media/upload/8/8e/Spr_3r_000.png";

    function getFrontSprite(pkmn:ICaughtState, forceShowSprite:boolean):JSX.Element {
        if(forceShowSprite || pkmn.isCaught) {
            return <img src={url1+pkmn.dexNo+url2} alt={""+pkmn.dexNo+".png"}/>;
        }
        else {
            return <img src={questionMark} alt="not registered"/>
        }
    }
    
    function isRegisteredIcon(bool:boolean):JSX.Element {
        if(bool) {
            return(<img src={pokeball1s} alt="*" />);
        }
        else { return(<img src={pokeball2s} alt="_" />); }
    }
    
    function isRegistered(dexNo:number):boolean {
        // if(dexNo === dexCaughtStates[dexCaughtStates.length-1].dexNo) {
        //     if(dexCaughtStates[dexCaughtStates.length-1].isCaught) {
        //         return true;
        //     }
        //     else { return searchDatabase(); }
        // }
        // else { return searchDatabase(); }
        let flag:boolean =false;
        user.pokemon.forEach((entry:any) => {
            if(entry.pokemonId===dexNo) {
                flag = true;
                return true;
            }
        });
        return flag;
    }
    
    function loadingBar() { // TODO: onClick stop loading
        if(count>=dexLimit) { // disappears at 101
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
    // let [jsxDex, setJsxDex] = useState<JSX.Element[]>([]);
    // function fullDex() {
    //     for(let i=0; i<=8; i++) {
    //         if(i===8) {
    //             return jsxDex;
    //         }
    //         dexCaughtStates[i].map((value:ICaughtState) => {
    //             setJsxDex([...jsxDex, <li className="dexEntry">
    //                 #{value.dexNo} <br/>
    //                 {getFrontSprite(value, spriteOfUncaught)} <br/>
    //                 {isRegisteredIcon(value.isCaught)} {" "} {capFirstLetter(value.name)} <br/><br/>
    //             </li>]);
    //         })
    //     }
    // }
            // {showOnlyCaught ?
            //     <ul className="checklist">
            //         {dexCaughtStates.map((value) => {
            //             if(value.isCaught) {
            //                 return <li className="dexEntry">
            //                     #{value.dexNo} <br/>
            //                     {getFrontSprite(value)} <br/>
            //                     {isRegisteredIcon(value)} {" "} {capFirstLetter(value.name)} <br/><br/>
            //                 </li>;
            //             }
            //         }
            //     </ul>
            // : <></>}
                            
    return(
        <div className="dex">
            <span className="loading">
                <input type="number" onChange={(event) => addDebugPkmnHandler1(event)} placeholder="Dex number"/>
                <button onClick={addDebugPkmnHandler2}>add to Pokedex</button><br/>
                <button onClick={() => console.log(dexCaughtStates)}>print to console</button><br/>
                <>{user.pokemon.length} of {dexLimit} Pokémon caught</> <br/>
                {/* {showOnlyCaught ? <button className="button" onClick={() => setShowOnlyCaught(false)}>show all</button> 
                    :  */}
                <span> 
                    {/* <button className="button" onClick={() => setShowOnlyCaught(true)}>show caught only</button><br/> */}
                    <button className="button" onClick={() => setSpriteOfUncaught(!spriteOfUncaught)}>show/hide uncaught</button>
                </span>
                {/* }  */}
                <br/>
                <>{loadingBar()}</>
            </span><br/>
            <ul className="checklist"> 
                {/* {fullDex} */}
                {dexCaughtStates[0].map((value:ICaughtState) => {
                    return <li className="dexEntry">
                        #{value.dexNo} <br/>
                        {getFrontSprite(value, spriteOfUncaught)} <br/>
                        {isRegisteredIcon(value.isCaught)} {" "} {capFirstLetter(value.name)} <br/><br/>
                    </li>;
                })}
                {dexCaughtStates[1].map((value:ICaughtState) => {
                    return <li className="dexEntry">
                        #{value.dexNo} <br/>
                        {getFrontSprite(value, spriteOfUncaught)} <br/>
                        {isRegisteredIcon(value.isCaught)} {" "} {capFirstLetter(value.name)} <br/><br/>
                    </li>;
                })}
                {dexCaughtStates[2].map((value:ICaughtState) => {
                    return <li className="dexEntry">
                        #{value.dexNo} <br/>
                        {getFrontSprite(value, spriteOfUncaught)} <br/>
                        {isRegisteredIcon(value.isCaught)} {" "} {capFirstLetter(value.name)} <br/><br/>
                    </li>;
                })}
                {dexCaughtStates[3].map((value:ICaughtState) => {
                    return <li className="dexEntry">
                        #{value.dexNo} <br/>
                        {getFrontSprite(value, spriteOfUncaught)} <br/>
                        {isRegisteredIcon(value.isCaught)} {" "} {capFirstLetter(value.name)} <br/><br/>
                    </li>;
                })}
                {dexCaughtStates[4].map((value:ICaughtState) => {
                    return <li className="dexEntry">
                        #{value.dexNo} <br/>
                        {getFrontSprite(value, spriteOfUncaught)} <br/>
                        {isRegisteredIcon(value.isCaught)} {" "} {capFirstLetter(value.name)} <br/><br/>
                    </li>;
                })}
                {dexCaughtStates[5].map((value:ICaughtState) => {
                    return <li className="dexEntry">
                        #{value.dexNo} <br/>
                        {getFrontSprite(value, spriteOfUncaught)} <br/>
                        {isRegisteredIcon(value.isCaught)} {" "} {capFirstLetter(value.name)} <br/><br/>
                    </li>;
                })}
                {dexCaughtStates[6].map((value:ICaughtState) => {
                    return <li className="dexEntry">
                        #{value.dexNo} <br/>
                        {getFrontSprite(value, spriteOfUncaught)} <br/>
                        {isRegisteredIcon(value.isCaught)} {" "} {capFirstLetter(value.name)} <br/><br/>
                    </li>;
                })}
                {dexCaughtStates[7].map((value:ICaughtState) => {
                    return <li className="dexEntry">
                        #{value.dexNo} <br/>
                        {getFrontSprite(value, spriteOfUncaught)} <br/>
                        {isRegisteredIcon(value.isCaught)} {" "} {capFirstLetter(value.name)} <br/><br/>
                    </li>;
                })}
            </ul>
        </div>
    );
}

// export default PokedexList;