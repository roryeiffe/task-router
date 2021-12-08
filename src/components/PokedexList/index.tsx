import "./style.css";
import PokeCorner from "../../PokeCorner";
import { useState } from "react";

let count:number = 1;
let dexLimit = 151;
let arr2:string[] = ["Unown A", "Unown B", "Unown C"];
// variable outside this function executes once; avoid using for loops
const PokedexList = () => {
    let [arr1, setArr1] = useState(["Unown A", "Unown B", "Unown C"]);

    // for(let i=1; i<dexLimit; i++) {
    if(count<=151) {
        PokeCorner.getPkmnNameByDexNo(count).then(pkmnString => {
            setArr1([...arr1, pkmnString]);
            arr2.push(pkmnString);
            console.log(pkmnString);
            count++;
        })
    }

    // }
    
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
            {/* <button onClick={dexClickHandler}>GET!</button> */}
            <ul> 
                {arr2.map(value => {
                    return <li>{value}</li>;
                })}
            </ul>
            <p> ------------------------------------------------ End
                ------------------------------------------------ </p>
        </div>
    );
}

export default PokedexList;