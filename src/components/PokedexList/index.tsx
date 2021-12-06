import "./style.css";
import PokeCorner from "../../PokeCorner";

const PokedexList = () => {
    // testing ======================================================
    let dexLimit = 151;

    // let [arr, setArr] = useState(new Array);
    // setArr(PokeCorner.getList.allGen1Pokemon());
    // .then(list => setArr(list));
    // let arr:string[] = new Array;
    let arr:string[] = ["Unown A", "Unown B", "Unown C"];
    for(let i=0; i<dexLimit; i++) {
        PokeCorner.getPkmnNameByDexNo(i).then(pkmnString => {
            arr.push(pkmnString);
            console.log(pkmnString);
        })
    }
    console.log(arr);
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

export default PokedexList;