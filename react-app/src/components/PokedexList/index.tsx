import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import './style.css';
import { getPkmnNameByDexNo, capFirstLetter } from "../PokeCorner";
import pokeball1s from "../../images/pokeball1-small.png";
import pokeball2s from "../../images/pokeball2-small.png";
import questionMark from "../../images/question_mark.png"
// editable parameters =======================================
export let dexLimit = 898; // 898 total Pokemon
//============================================================
let hadCaughtANewPokemon:boolean = false;
let count:number = 0;

interface ICaughtState {
    dexNo:number;
    name:string;
    isCaught:boolean;
}

export function setHadCaughtANewPokemon(bool:boolean):void {
    hadCaughtANewPokemon = bool;
}

const PokedexList = () => { // variable outside this function executes once; avoid using for loops
    const temp = useSelector((state: any) => state.user);
    const [user, ] = useState(temp);
    let [spriteOfUncaught, setSpriteOfUncaught] = useState(false);
    let [showOnlyCaught, setShowOnlyCaught] = useState(true);
    let [dexCaughtStates, setDexCaughtStates] = useState<ICaughtState[]>([]);
    const dispatch = useDispatch();
    
    useEffect(() => {
        settingDexCaughtStates();
    },[]);
    
    useEffect(() => {
        if(hadCaughtANewPokemon) {
            dispatch({type: 'UPDATE_USER', payload: user});
            setHadCaughtANewPokemon(false);
        }         
    }, [hadCaughtANewPokemon]);

    async function settingDexCaughtStates() {
        // setDexCaughtStates([]);
        while(count<dexLimit) {
            count=count+1;
            await getPkmnNameByDexNo(count).then(pkmnName => {
                var temp2:ICaughtState = {dexNo: count, name: pkmnName, isCaught: isRegistered(count)};
                // console.log(temp2);
                setDexCaughtStates(dexCaughtStates => [...dexCaughtStates, temp2]);
            });
        }
    }

    let url1:string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
    let url2:string = ".png";
    let url3:string = "https://pokemondb.net/pokedex/";
    let url4:string = "https://archives.bulbagarden.net/media/upload/8/8e/Spr_3r_000.png";

    function getFrontSprite(pkmn:ICaughtState):JSX.Element {
        if(spriteOfUncaught || pkmn.isCaught) {
            return <img src={url1+pkmn.dexNo+url2} alt={""+pkmn.dexNo+".png"}/>;
        }
        else {
            return <img src={questionMark} alt="not registered"/>
        }
    }

    function isRegisteredIcon(pkmn:ICaughtState):JSX.Element {
        if(isRegistered(pkmn.dexNo)) {
            return(<img src={pokeball1s} alt="*" />);
        }
        else { return(<img src={pokeball2s} alt="_" />); }
    }
    
    function isRegistered(dexNo:number):boolean {
        // let count2:number = user.pokemon.length;
        if(user.pokemon) {
            user.pokemon.forEach((entry:any,id:number) => {
                if(dexNo===entry.pokemonId) {
                    return true;
                }
                else if (id>=user.pokemon.length-1) {
                    return false;
                }
            });
            return false
        }
        else {
            console.error("can't find user's pokedex data");
            return false;
        }
    }
    
    function loadingBar():JSX.Element { // TODO: onClick stop loading
        if(count>=dexLimit) { // disappears at 100
            return <></>;
        }
        else {
            let percentage:number = Math.round(100*(count/dexLimit));
            return <>{"Loading... " + percentage + "% ["+count+ "/"+dexLimit+"]"}</>;
        }
    }
    
    return(
        <div className="dex">
            <span className="loading">
                <button onClick={() => console.log(count, dexCaughtStates)}>print to console</button> <br/>
                <>{user.pokemon.length} of {dexLimit} Pokémon caught</> <br/>
                {showOnlyCaught ? <button className="button" onClick={() => setShowOnlyCaught(false)}>show all</button> 
                    : <span> 
                        <button className="button" onClick={() => setShowOnlyCaught(true)}>show caught only</button><br/>
                        <button className="button" onClick={() => setSpriteOfUncaught(!spriteOfUncaught)}>show/hide uncaught</button>
                    </span>
                } <br/>
                <>{loadingBar()}</>
            </span><br/>
            {showOnlyCaught ?
                <ul className="checklist">
                    {dexCaughtStates.map((value) => {
                        if(value.isCaught) {
                            return <li className="dexEntry">
                                #{value.dexNo} <br/>
                                {getFrontSprite(value)} <br/>
                                {isRegisteredIcon(value)} {" "} {capFirstLetter(value.name)} <br/><br/>
                            </li>;
                        }
                        else {
                            // return <p className="dexEntry">blank</p>;
                        }

                    })}
                </ul>
                : 
                <ul className="checklist"> 
                    {dexCaughtStates.map((value) => {
                        return <li className="dexEntry">
                            #{value.dexNo} <br/>
                            {getFrontSprite(value)} <br/>
                            {isRegisteredIcon(value)} {" "} {capFirstLetter(value.name)} <br/><br/>
                        </li>;
                    })}
                </ul>
            }
        </div>
    );
}

export default PokedexList;