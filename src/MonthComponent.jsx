import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { calculateMonthsOld, inputMonth, monthsInputDone } from "./store/store";

function MonthComponent({setDoned, get}){
    const dispatch = useDispatch()
    const [selectedMonth, setSelectedMonth] = useState(-1);
    let months = useSelector(state=>state.monthsOld);
    let isDone = useSelector(state=> state.isMonthInputDone);
    const text = useSelector((state)=> state.textMonth);
    
    
    const handleInputMonth = (event) =>{
        const month = event.target.value;
        setSelectedMonth(month);
        dispatch(inputMonth(month));
        dispatch(calculateMonthsOld());
        dispatch(monthsInputDone(!isDone))
        setDoned([true, true]);
    }
    
    return(<div className="month-container">
        {!isDone ? <>        
            <h2>Введите месяц рождения</h2>
            <select defaultValue={-1} onChange={handleInputMonth}>
                <option value={-1} disabled={true}>Месяц</option>
                <option value={0}>Январь</option>
                <option value={1}>Февраль</option>
                <option value={2}>Март</option>
                <option value={3}>Апрель</option>
                <option value={4}>Май</option>
                <option value={5}>Июнь</option>
                <option value={6}>Июль</option>
                <option value={7}>Август</option>
                <option value={8}>Сентябрь</option>
                <option value={9}>Октябрь</option>
                <option value={10}>Ноябрь</option>
                <option value={11}>Декабрь</option>
            </select> 
      </>: <p>{months} {text[get(months)]}</p>}</div>
        
    );
}
export default MonthComponent;