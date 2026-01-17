import {useState, useEffect } from 'react';
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { calculateMinsOld,  updateDate } from './store/store';

function getDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const date = String(today.getDate()).padStart(2, '0');
    const hour = String(today.getHours()).padStart(2, '0');
    const min = String(today.getMinutes()).padStart(2, '0');
    const sec = String(today.getSeconds()).padStart(2, '0');
    return `${date}.${month}.${year} ${hour}:${min}:${sec}`;
}
function DateComponent({doned}){
    const dispatch = useDispatch();
    const [date, setDate] = useState(getDate())
    
    useEffect(() => {
        const currentDate = getDate();
        setDate(currentDate);
        dispatch(updateDate(new Date()));
        const interval = setInterval(() => {
            const newDate = getDate();
            setDate(newDate);
            dispatch(updateDate(new Date()));
        }, 1000);

        return () => clearInterval(interval);
    }, [dispatch]);
  const isFine = useSelector(state=>state.isMinInputDone);


    useEffect(() => {
        if(isFine){
            dispatch(calculateMinsOld());
            const interval = setInterval(() => {
                dispatch(calculateMinsOld());
            }, 1000);
            return () => clearInterval(interval);
        }
        
    }, [isFine]);


    
    return(
        <div className="date-container">
        <h1>{date}</h1>
        <h2>Вы примерно:</h2>
        </div>
    );
}

export default DateComponent;