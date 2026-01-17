import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {calculateMinsOld, inputMin, minsInputDone, updateDate } from "./store/store";

let arr = [];
    for(let i = 0; i < 60; i++){
        arr.push(i);
    }
function MinComponent({setDoned, get}){
    const [inputedMin, setInputedMin] = useState(-1);
    const dispatch = useDispatch();

    let isDone = useSelector(state=>state.isMinInputDone);
    let secs = useSelector(state=>state.secsOld);
    let mins = useSelector(state=>state.minsOld);
    const text = useSelector((state)=> state.textMin);
    const textSec = useSelector((state)=> state.textSec);

    const handleInputMin = (event) =>{
        const min = event.target.value;
        setInputedMin(min);
        dispatch(inputMin(min));
        dispatch(minsInputDone(!isDone));
        dispatch(calculateMinsOld());
        setDoned([true, true, true, true, true])
    }
    return(<>{!isDone ?
        <select defaultValue={inputedMin} onChange={handleInputMin}>
        <option disabled value={-1}>Минута</option>
        {arr.map((min, index)=>{
            return <option value={min} key={index}>{min}</option>
        })}
    </select> : <><p>{mins} {text[get(mins)]}</p><p>{secs} {textSec[get(secs)]}</p></>}
    
    </>
        
    );
}
export default MinComponent;