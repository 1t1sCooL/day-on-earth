import DateComponent from './DateComponent.jsx';
import YearComponent from './YearComponent.jsx';
import MonthComponent from './MonthComponent.jsx';
import HourComponent from './HourComponent.jsx';
import DayComponent from './DayComponent.jsx';
import MinComponent from './MinComponent.jsx';
import { useState } from 'react';

function getInd(num){
    let strNum = String(Math.floor(num));
    if(strNum[strNum.length-1] == '1'){
        return 0;
    }else if(strNum[strNum.length-1] > 1 && strNum[strNum.length-1] < 5){
        return 1;
    }else{
        return 2;
    }
}
function App(){
    const [doned, setDoned] = useState([]);
    return(
    <div className="container">
            <DateComponent doned={doned} />
            <YearComponent get={getInd} setDoned={setDoned} doned={doned}/>
            {doned[0] && <MonthComponent get={getInd} setDoned={setDoned}/>}
            {doned[1] && <DayComponent get={getInd} setDoned={setDoned}/>}
            {doned[2] && <HourComponent get={getInd} setDoned={setDoned}/>}
            {doned[3] && <MinComponent get={getInd} setDoned={setDoned}/>}
            {doned[4] &&<h2>На Земле.</h2>}
            
     </div>
    );
}
export default App;