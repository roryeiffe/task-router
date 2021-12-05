import axios from "axios";
import React, { useState } from "react";
import "./style.css";
import PokeCorner from "../../PokeCorner";

const PokedexList = () => {
    // testing ======================================================
    let tempNum1 = 151;

    // let [arr, setArr] = useState(new Array);
    // setArr(PokeCorner.getList.allGen1Pokemon());
    // .then(list => setArr(list));
    let arr:string[] = new Array;
    for(let i=0; i<tempNum1; i++) {
        PokeCorner.getPkmnNameByDexNo(i).then(pkmnString => {
            arr.push(pkmnString);
        })
    }
    //================================================================
    
    return(
        <div>
            {/* {arr} */}
        </div>
    );
}

export default PokedexList;