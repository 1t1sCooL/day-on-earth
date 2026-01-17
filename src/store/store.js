import {createStore} from 'redux';


const UPDATE_TIME = "UPDATE_TIME";
const INPUT_YEAR = "INPUT_YEAR";
const INPUT_MONTH = "INPUT_MONTH";
const INPUT_DATE = "INPUT_DATE";
const INPUT_HOUR = "INPUT_HOUR";
const INPUT_MIN = "INPUT_MIN";

const YEARS_OLD = "YEARS_OLD";
const MONTHS_OLD = "MONTHS_OLD";
const DAYS_OLD = "DAYS_OLD";
const HOURS_OLD = "HOURS_OLD";
const MINS_OLD = "MINS_OLD";

const IS_YEAR_INPUT_DONE = "IS_YEAR_INPUT_DONE";
const IS_MONTH_INPUT_DONE = "IS_MONTH_INPUT_DONE";
const IS_DATE_INPUT_DONE = "IS_DATE_INPUT_DONE";
const IS_HOURS_INPUT_DONE = "IS_HOURS_INPUT_DONE";
const IS_MINS_INPUT_DONE = "IS_MINS_INPUT_DONE";


const defaultState = {
    nowDate: new Date(),
    inputYear: null,
    inputMonth: null,
    inputDate: null,
    inputHour: null,
    inputMin: null,

    yearsOld: null,
    monthsOld: null,
    weeksOld: null,
    daysOld: null,
    hoursOld: null,
    minsOld: null,
    secsOld: null,

    isYearInputDone: false,
    isMonthInputDone: false,
    isDateInputDone: false,
    isHourInputDone: false,
    isMinInputDone: false,

    textYear: ["год", "года", "лет"],
    textMonth: ["месяц", "месяца", "месяцев"],
    textWeek: ["неделя", "недели", "недель"],
    textDay: ["день", "дня", "дней"],
    textHour: ["час", "часа", "часов"],
    textMin: ["минута", "минуты", "минут"],
    textSec: ["секунда", "секунды", "секунд"],
}

const reducer = (state=defaultState, action)=>{
    switch (action.type){
        case UPDATE_TIME:
            return {
                ...state,
                 nowDate: action.payload
                };
        case INPUT_YEAR:
            return {
                ...state,
                 inputYear: action.payload
                };
        case YEARS_OLD:
            return {
                ...state,
                yearsOld: (state.nowDate.getFullYear() - state.inputYear),
            }
        case IS_YEAR_INPUT_DONE:
            return {
                ...state, isYearInputDone: action.payload,
            }
        case INPUT_MONTH:
            return {
                ...state,
                 inputMonth: action.payload,
            }
        case MONTHS_OLD:
            return{
                ...state, 
                yearsOld: ((new Date(state.nowDate.getFullYear(), state.nowDate.getMonth()) - new Date(state.inputYear, state.inputMonth))/1000/60/60/24/365.2425).toFixed(1), 
                monthsOld: ((new Date(state.nowDate.getFullYear(), state.nowDate.getMonth()) - new Date(state.inputYear, state.inputMonth))/1000/60/60/24/30.43).toFixed(0),
            }
        case IS_MONTH_INPUT_DONE:
            return {
                    ...state, 
                    isMonthInputDone: action.payload,
                }
        case INPUT_DATE:
            return {
                    ...state,
                    inputDate: action.payload,
                    }
        case DAYS_OLD:
            return{
                    ...state,
                    yearsOld: ((new Date(state.nowDate.getFullYear(),
                                state.nowDate.getMonth(), state.nowDate.getDate()) 
                              - new Date(state.inputYear, state.inputMonth, 
                              state.inputDate))/1000/60/60/24/365.2425).toFixed(1),
                    monthsOld: ((new Date(state.nowDate.getFullYear(),
                                state.nowDate.getMonth(), state.nowDate.getDate())
                              - new Date(state.inputYear, state.inputMonth,
                                state.inputDate))/1000/60/60/24/30.43).toFixed(1),
                    weeksOld: ((new Date(state.nowDate.getFullYear(),
                              state.nowDate.getMonth(), state.nowDate.getDate())
                              - new Date(state.inputYear, state.inputMonth, 
                                state.inputDate))/1000/60/60/24/7).toFixed(1),

                    daysOld: ((new Date(state.nowDate.getFullYear(), 
                            state.nowDate.getMonth(), state.nowDate.getDate()) 
                            - new Date(state.inputYear, state.inputMonth, 
                                state.inputDate))/1000/60/60/24).toFixed(1),
                }
        case IS_DATE_INPUT_DONE:
            return{
                ...state,
                isDateInputDone: action.payload,
            }
            
        case INPUT_HOUR:
            return {
                    ...state,
                    inputHour: action.payload,
                    }
        case HOURS_OLD:
            return{
                ...state,
                yearsOld: (((new Date(state.nowDate.getFullYear(),
                            state.nowDate.getMonth(), state.nowDate.getDate(),
                            state.nowDate.getHours()) - new Date(state.inputYear,
                          state.inputMonth, state.inputDate, state.inputHour)))
                          /1000/60/60/24/365.2425).toFixed(1),
                monthsOld: (((new Date(state.nowDate.getFullYear(),
                            state.nowDate.getMonth(), state.nowDate.getDate(),
                            state.nowDate.getHours())- new Date(state.inputYear,
                           state.inputMonth, state.inputDate, state.inputHour)))
                           /1000/60/60/24/30.43).toFixed(1),
                daysOld : (((new Date(state.nowDate.getFullYear(),
                            state.nowDate.getMonth(), state.nowDate.getDate(),
                            state.nowDate.getHours()) -new Date(state.inputYear,
                          state.inputMonth, state.inputDate, state.inputHour)))
                          /1000/60/60/24).toFixed(1),
                weeksOld: ((new Date(state.nowDate.getFullYear(),
                              state.nowDate.getMonth(), state.nowDate.getDate(),
                              state.nowDate.getHours()) - new Date(state.inputYear,
                              state.inputMonth, state.inputDate, state.inputHour))
                              /1000/60/60/24/7).toFixed(1),
                hoursOld: (((new Date(state.nowDate.getFullYear(),
                            state.nowDate.getMonth(), state.nowDate.getDate(),
                            state.nowDate.getHours()) - new Date(state.inputYear,
                          state.inputMonth, state.inputDate, state.inputHour)))
                          /1000/60/60).toFixed(1),
            }
        case IS_HOURS_INPUT_DONE:
            return{
                ...state,
                isHourInputDone: action.payload,
            }
        case INPUT_MIN:
            return{
                ...state,
                inputMin: action.payload,
            }
        case MINS_OLD:
            const nowDate = new Date();
            const birthDate = new Date(
                state.inputYear ,
                state.inputMonth,
                state.inputDate,
                state.inputHour,
                state.inputMin
            );
            const diffInMs = nowDate - birthDate;

            const yearsOld =  (diffInMs / 1000 / 60 / 60 / 24 / 365.2425).toFixed(1);
            const monthsOld = (diffInMs / 1000 / 60 / 60 / 24 / 30.43).toFixed(1);
            const daysOld = (diffInMs / 1000 / 60 / 60 / 24).toFixed(1);
            const hoursOld = (diffInMs / 1000 / 60 / 60).toFixed(1);
            const minsOld = (diffInMs / 1000 / 60).toFixed(1);
            const secsOld = (diffInMs / 1000).toFixed(0);


    return {
        ...state,
        yearsOld,
        monthsOld,
        daysOld,
        hoursOld,
        minsOld,
        secsOld,
    };
        case IS_MINS_INPUT_DONE:{
            return{
                ...state,
                isMinInputDone: action.payload,
            }
        }
        default:
            return state;
    }
}

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() );

export const inputYear = (year) => ({type: INPUT_YEAR,payload: year,});
export const inputMonth = (month) => ({type: INPUT_MONTH, payload: month});
export const inputDate = (date) => ({type: INPUT_DATE, payload: date})
export const inputHour = (hour) => ({type: INPUT_HOUR, payload: hour})
export const inputMin = (min) => ({type: INPUT_MIN, payload: min})

export const calculateYearsOld = (currentYear) => ({type: YEARS_OLD,payload: currentYear,});
export const calculateMonthsOld = () => ({type: MONTHS_OLD,});
export const calculateDaysOld = () => ({type: DAYS_OLD,});
export const calculateHoursOld = () => ({type: HOURS_OLD,});
export const calculateMinsOld = () => ({type: MINS_OLD,});

export const yearsInputDone = (isDone) => ({type: IS_YEAR_INPUT_DONE, payload: isDone,});
export const monthsInputDone = (isDone) => ({type: IS_MONTH_INPUT_DONE, payload: isDone,});
export const daysInputDone = (isDone) => ({type: IS_DATE_INPUT_DONE, payload: isDone});
export const hoursInputDone = (isDone) => ({type: IS_HOURS_INPUT_DONE, payload: isDone});
export const minsInputDone = (isDone) => ({type: IS_MINS_INPUT_DONE, payload: isDone});

export const updateDate = (currentDate) => ({type: UPDATE_TIME, payload: currentDate});

export default store;