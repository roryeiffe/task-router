import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './style.css';
import { pokeApi, getPkmnNameByDexNo, capFirstLetter } from '../PokeCorner';
import { dexLimit, setHadCaughtANewPokemon } from '../PokedexList';
import pokeball from '../../images/pokeball_opening.gif';

// editable parameters ================================
let catchRateMultiplier:number = 1;
//=====================================================

let pokeballWiggle:boolean = false;
let url1:string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
let url2:string = ".png";

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
    let [opponentPkmn, setOpponentPkmn] = useState(1+Math.floor(dexLimit*Math.random()));
    let [textBox, setTextBox] = useState("");

    const dispatch = useDispatch();

    if(!pokeballWiggle) {
        getPkmnNameByDexNo(opponentPkmn).then(pkmnName => {
            let newPkmnName = capFirstLetter(pkmnName);
            console.log("A wild "+capFirstLetter(newPkmnName)+" appeared!")
            setTextBox("A wild "+capFirstLetter(newPkmnName)+" appeared!")
        });
    }
    
    function wildPkmnArea():JSX.Element {
        if(pokeballWiggle) {
            return <img src={pokeball} height={50} alt="pokemon caught in ball"/>;
        }
        else {
            return <>{getFrontSpriteOf(opponentPkmn)}</>;
        }
    }
    
    async function refresh() {
        setOpponentPkmn(1+Math.floor(dexLimit*Math.random())); // TODO: only pick from uncaught pkmn
        // await PokeCorner.getPkmnNameByDexNo(opponentPkmn).then(pkmnName => {
        //     console.log("A wild "+capFirstLetter(pkmnName)+" appeared!");
        //     setTextBox("A wild "+capFirstLetter(pkmnName)+" appeared!");
        // });
    }
    // This doesn't work:
    // const delay = async (ms: any) => new Promise(res => setTimeout(res, ms));
    
    async function throwPokeball(points:number) { // points = number of tries?
        await pokeApi.getPokemonSpeciesById(opponentPkmn).then(pkmn => {
            let successRate:number = pkmn.capture_rate*catchRateMultiplier; // always out of 255
            pokeballWiggle=true;
            for(let i=0; i<points; i++) {
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
                    refresh();
                    break;
                }
                else {
                    // Pokemon broke free
                    console.log(capFirstLetter(pkmn.name)+" broke free!");
                }
            }
            pokeballWiggle=false; 
            //
        })

    }

    // function catchOptions() { return(); } // moving the below div here doesn't work
    
    return(
        <span className='catching-corner'>
            {/* {bagHandler} */}
            <br/>
            {textBox} <br/>
            {pokeballWiggle ? <button onClick = {() => {props.setCatchPokemon(<div></div>)}}>Close</button> : 
            <div>
                <button onClick={() => throwPokeball(props.points)}>throw {props.points} Pokéball</button>
                <button onClick={refresh}>refresh</button>
            </div>
            // {catchOptions} // moving the div to the commented out function above doesn't work
            }
            {wildPkmnArea()}
        </span>
    );
}

export default CatchingCorner;
