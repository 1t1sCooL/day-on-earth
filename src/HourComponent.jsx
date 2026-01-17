import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculateHoursOld, hoursInputDone, inputHour } from "./store/store";

function HourComponent({setDoned, get}){
    const [inputedHour, setInputedHour] = useState(-1);
    const dispatch = useDispatch();

    let isDone = useSelector(state=>state.isHourInputDone);
    let hours = useSelector(state=>state.hoursOld);
    const text = useSelector((state)=> state.textHour);

    const handleInputHour = (event) =>{
        const hour = event.target.value;
        setInputedHour(hour);
        dispatch(inputHour(Number(hour)));
        dispatch(calculateHoursOld());
        dispatch(hoursInputDone(!isDone));
        setDoned([true, true, true, true]);
    }

    return(<>{!isDone ?
        <select defaultValue={inputedHour} onChange={handleInputHour}>
            <option disabled value={-1}>час</option>
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>          
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
            <option value={11}>11</option>
            <option value={12}>12</option>
            <option value={13}>13</option>
            <option value={14}>14</option>
            <option value={15}>15</option>
            <option value={16}>16</option>
            <option value={17}>17</option>
            <option value={18}>18</option>
            <option value={19}>19</option>
            <option value={20}>20</option>
            <option value={21}>21</option>
            <option value={22}>22</option>
            <option value={23}>23</option>
        </select> :
        <p>{hours} {text[get(hours)]}</p>}
    </>
        
    );
}

export default HourComponent;