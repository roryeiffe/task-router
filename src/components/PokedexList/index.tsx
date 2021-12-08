import "./style.css";
import PokeCorner from "../../PokeCorner";
import { useState } from "react";

let count:number = 1;
let dexLimit = 151;
let arr2:string[] = [];
// variable outside this function executes once; avoid using for loops
const PokedexList = () => {
    let [dummyArray, setDummyArray] = useState([0]); // removing this stops it for some reason

    // for(let i=1; i<dexLimit; i++) {
    if(count<=dexLimit) {
        PokeCorner.getPkmnNameByDexNo(count).then(pkmnString => {
            setDummyArray([...dummyArray, count]);
            arr2.push(pkmnString);
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
            <p> -------------------------------------------- Beginning
                -------------------------------------------- </p>
            <button onClick={() => console.log(arr2)}>print to console</button>
            {/* {asyncThing().then(value => {return value})} */}
            <ul className="checklist"> 
                {arr2.map(value => {
                    return <li>{isRegisteredIcon(value)} {value}</li>;
                })}
            </ul>
            <p> ------------------------------------------------ End
                ------------------------------------------------ </p>
        </div>
    );
}

function isRegisteredIcon(pkmnName:string) {
    let dexNo:number;
    PokeCorner.pokeApi.getPokemonByName(pkmnName).then(data => {dexNo = data.id});
    // check if ID on User's caught list
    let caught:boolean = false;
    
    if(caught) {
        return(
            <img src="/public/pokeball1.png" alt="*" />
        );
    }
    else {
        return(
            <img src="/public/pokeball2.png" alt="_"/>
        );
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

export default PokedexList;