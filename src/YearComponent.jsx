import { useDispatch, useSelector } from "react-redux";
import {useRef} from 'react';
import { calculateYearsOld, inputYear, yearsInputDone } from "./store/store";

function YearComponent({setDoned, doned, get}){
    const dispatch = useDispatch();
    const inputYearValue = useSelector((state) => state.inputYear);
    const isDone = useSelector((state)=> state.isYearInputDone);
    const yearsOld = useSelector((state) => state.yearsOld);
    const text = useSelector((state)=> state.textYear);


    const value = useRef(null);

    const handleInputYear = () => {
      const year = value.current.value;
      dispatch(inputYear(year));
      dispatch(calculateYearsOld(year));
    };
    const handleKeyDown = (event) => { 
      if(event.keyCode === 13){
        finalInputYear();
      }
    };
    const finalInputYear = () => {
      dispatch(yearsInputDone(true));
      setDoned([true]);
    };

    return(<div className="year-container">
            {!isDone ? (<>
            <h2>Введите свой год рождения</h2>
             <input type="number" ref={value} onChange={handleInputYear} onKeyDown={handleKeyDown}/><br/>
             <p>{ !yearsOld  ? "-" : yearsOld}</p>
             <button onClick={finalInputYear}>Далее</button>
             </>) : (<><p>{inputYearValue}</p>
              {isDone && <p>{yearsOld} {text[get(yearsOld)]}</p>}</>)}
          </div>
    );
}

export default YearComponent;