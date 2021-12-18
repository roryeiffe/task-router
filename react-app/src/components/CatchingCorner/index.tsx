import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.css';
import { pokeApi, getPkmnNameByDexNo, capFirstLetter } from '../PokeCorner';
import { dexLimit, setHadCaughtANewPokemon } from '../PokedexList';
import pokeball from '../../images/pokeball_stationary.png';

// editable parameters ================================
let catchRateMultiplier:number = 1;
//=====================================================

let url1:string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
let url2:string = ".png";

// let storedPoints:number = 0;
// let newPkmnAppeared:boolean = false;
// let inBall:boolean = false;
// export function setNewPkmnAppeared(points:number) {
//     newPkmnAppeared = true;
//     storedPoints = points;
//     inBall = false;
// }

function getFrontSpriteOf(dexNo:number):JSX.Element {
    return <img src={url1+dexNo+url2} height="100" alt={""+dexNo+".png"}/>;
}

// // bag is too complex for the scope of the project:
// export function addPokeballToBag(points:number) {}
// function bagHandler():JSX.Element {
//     let [bag, setBag] = useState([0]);
//     // .map onClick={throwPokeball}
// }

function CatchingCorner(props: any):JSX.Element {
    const temp = useSelector((state: any) => state.user);
    const [user, setUser] = useState(temp);
    let [opponentPkmn, setOpponentPkmn] = useState(getPkmnDexNo());
    let [textBox, setTextBox] = useState(""); 
    let [storedPoints, setStoredPoints] = useState(0);
    let [newPkmnAppeared, setNewPkmnAppeared] = useState(false);
    let [inBall, setInBall] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setNewPkmnAppeared(true);
        // let temp = props.points;
        setStoredPoints(props.points);
        setInBall(false);
    },[]);
    
    // useEffect(() => {
    //     storedPoints = props.points;
    // }, []);
    
    if(newPkmnAppeared&& (storedPoints>0) && !inBall) {
        getPkmnNameByDexNo(opponentPkmn).then(pkmnName => {
            let newPkmnName = capFirstLetter(pkmnName);
            console.log("A wild "+newPkmnName+" appeared!")
            setTextBox("A wild "+newPkmnName+" appeared!")
        });
    }
    
    function wildPkmnArea():JSX.Element {
        if(inBall) {
            return <img src={pokeball} height={50} alt="pokemon caught in ball"/>;
        }
        else {
            if(storedPoints>0){
                return <>{getFrontSpriteOf(opponentPkmn)}</>;
            }
            else {
                console.error("!ranOff !inBall storedPoints<=0");
                return <></>;
            }
        }
    }
    // let repeats:number[] = [];
    function getPkmnDexNo():number {
        let tempNum = 1+Math.floor(dexLimit*Math.random());
        if(user.pokemon.length === 0) {
            return tempNum;
        }
        // for optimization if user's pokedex is more than 50% complete
        // else if(user.pokemon.length > (dexLimit/2)) { 
        //     // TODO: change later
        //     return tempNum;
        // }
        else { // check if random number is already in user's dex
            user.pokemon.forEach((entry:any) => { 
                if(entry.pokemonId===tempNum) {
                    // repeats.push(tempNum);
                    return getPkmnDexNo();
                }
            });
            return tempNum;
        }  
    }
    
    async function refresh() {
        setOpponentPkmn(getPkmnDexNo());
        // await PokeCorner.getPkmnNameByDexNo(opponentPkmn).then(pkmnName => {
        //     console.log("A wild "+capFirstLetter(pkmnName)+" appeared!");
        //     setTextBox("A wild "+capFirstLetter(pkmnName)+" appeared!");
        // });
    }
    // This doesn't work:
    // const delay = async (ms: any) => new Promise(res => setTimeout(res, ms));
    
    async function throwPokeball(points:number) { // points = number of tries
        setNewPkmnAppeared(false);
        await pokeApi.getPokemonSpeciesById(opponentPkmn).then(pkmn => {
            if(points>0){
                let successRate:number = pkmn.capture_rate*catchRateMultiplier; // always out of 255
                // for(let i=0; i<points; i++) {
                let rngesus = 255*Math.random();
                // delay(1000);
                if(rngesus < successRate) {
                    // Pokemon is caught
                    console.log(capFirstLetter(pkmn.name)+" is caught!");
                    setTextBox(capFirstLetter(pkmn.name)+" is caught!");
                    // delay(1000);
                    // add to user's pokedex:
                    axios.put('http://localhost:9001/pokemon/update/'+props.user.id , {pokemonId: opponentPkmn})
                    .then(response => dispatch({type: 'ADD_POKEMON', payload: response.data}))
                    .catch(error => console.error(error));
                    
                    setHadCaughtANewPokemon(true);
                    setInBall(true);
                    refresh();
                    // break;
                }
                else {
                    // Pokemon broke free
                    setInBall(false); 
                    if(storedPoints>1) {
                        setTextBox(capFirstLetter(pkmn.name)+" broke free!");
                        console.log(capFirstLetter(pkmn.name)+" broke free!");
                    }
                    else{
                        setTextBox(capFirstLetter(pkmn.name)+" ran off!");
                        console.log(capFirstLetter(pkmn.name)+" ran off!");
                    }
                }
                // }
            }
            else {
                // out of pokeballs
            }
        });
    }
    
    return( // if(storedPoints<1)||inBall) { /* press close button */ }
        <span className='CatchingCorner'>
            {/* {bagHandler} */}
            <br/><br/>
            {textBox} <br/>
            {((storedPoints<1)||inBall) ? <button onClick = {() => {props.setCatchPokemon(<div></div>)}}>Close</button> : 
            <div>
                {console.log(newPkmnAppeared, storedPoints)}
                {storedPoints>1 ? 
                    <button onClick={() => {throwPokeball(storedPoints); setStoredPoints(storedPoints-1);}}>throw 1 of {storedPoints} Pokéballs</button>
                : <></>}
                {storedPoints===1 ? 
                    <button onClick={() => {throwPokeball(storedPoints); setStoredPoints(storedPoints-1);}}>throw 1 of 1 Pokéball</button>
                : <button onClick={() => {refresh(); setStoredPoints(storedPoints-1);}}>{"refresh (-1)"}</button>}
            </div>
            // {catchOptions} // moving the div to a function above doesn't work
            }
            {wildPkmnArea()}
        </span>
    );
}

export default CatchingCorner;
