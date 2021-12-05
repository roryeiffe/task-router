// import axios from "axios";
// import React, { useState } from "react";
// import "./style.css";
import PokeCorner from "../../PokeCorner";

const FriendList = () => {
    // testing ======================================================
    let howManyFriends = 5;

    // let [arr, setArr] = useState(new Array);
    // setArr(PokeCorner.getList.allGen1Pokemon());
    // .then(list => setArr(list));
    let arr:string[] = new Array;
    // let arr:string[] = ["Friend A", "Friend B", "Friend C"];
    for(let i=1; i<=howManyFriends; i++) {
        arr.push("Friend "+i);
    }
    //================================================================
    
    return(
        <div className="container">
            <p> -------------------------------------------- Beginning
                -------------------------------------------- </p>
            <ul>
                {arr.map(value => {
                    return <li>{value}</li>;
                })}
            </ul>
            <p> ------------------------------------------------ End
                ------------------------------------------------ </p>
        </div>
    );
}

export default FriendList;