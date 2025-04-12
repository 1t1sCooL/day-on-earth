import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {  calculateDaysOld, inputDate, daysInputDone } from "./store/store";


function DayComponent({setDoned, get}){
    const [selectedDate, setSelectedDate] = useState(-1);
    const [daysInMes, setDaysInMes] = useState([]);
    const dispatch = useDispatch();
    let days = useSelector(state=>state.daysOld);
    let weeks = useSelector(state=>state.weeksOld);
    let isDone = useSelector(state=>state.isDateInputDone);
    let year = useSelector(state=>state.inputYear);
    let month = useSelector(state=>state.inputMonth);
    const text = useSelector((state)=> state.textDay);
    const textWeek = useSelector((state)=> state.textWeek);


    useEffect(()=>{
        const date = new Date(year, +month+1, 0);
        const daysInMonth = date.getDate();
        const daysArr = [];
        for(let i = 1; i <= daysInMonth; i++){
            daysArr.push(i);
        }
        setDaysInMes(daysArr);
    }, [year, month]) 
    

    const handleInputDate = (event) =>{
        const day = event.target.value;
        setSelectedDate(day);
        dispatch(inputDate(day));
        dispatch(calculateDaysOld());
        dispatch(daysInputDone(!isDone))
        setDoned([true, true, true]);
    }
   return(<>
    {!isDone && <select onChange={handleInputDate} defaultValue={-1}><option disabled value={-1}>День</option>
    {daysInMes.map((day, index)=><option key={index} value={day}>{day}</option>)}
</select>}  {isDone &&<><p>{weeks} {textWeek[get(weeks)]}</p><p>{days} {text[get(days)]}</p></>}
    
    
</>);
}
export default DayComponent;