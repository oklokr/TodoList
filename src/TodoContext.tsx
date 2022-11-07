import React, { createContext, useContext, useReducer } from 'react'

function getToDate() {
  let getDate = new Date();
  const toYear = getDate.getFullYear();
  const toMonth = getDate.getMonth() + 1;
  const toDate = getDate.getDate();
  const toDay = getDate.getDay();

  return [ toYear, toMonth, toDate, toDay ];
}
const [toYear, toMonth, toDate, toDay] = getToDate()

const initialState = {
  toYear: toYear,
  toMonth: toMonth,
  toDate: toDate,
  toDay: toDay,
  userData: [],
  userType: 'day',
}

function fn_dateChange(state, action){
  const toLastDate = new Date(state.toYear, state.toMonth, 0).getDate();

  if(toLastDate < action.weekDay && state.toMonth >= 12) {  // 다음 년도
    const firstMonth = 1;
    return {
      ...state,
      toYear: state.toYear + 1,
      toMonth: firstMonth,
      toDate: action.clickDate,
      toDay: new Date(state.toYear, state.toMonth, action.clickDate).getDay(),
    }
  }else if (!(Math.sign(action.weekDay) > 0) && state.toMonth <= 1) {  // 이전 년도
    const lastMonth = 12;
    return {
      ...state,
      toYear: state.toYear - 1,
      toMonth: lastMonth,
      toDate: action.clickDate,
      toDay: new Date(state.toYear - 1, lastMonth - 1, action.clickDate).getDay(),
    }
  }else if(toLastDate < action.weekDay){  // 다음 월
    return {
      ...state,
      toMonth: state.toMonth + 1,
      toDate: action.clickDate,
      toDay: new Date(state.toYear, state.toMonth, action.clickDate).getDay(),
    }
  }else if(!(Math.sign(action.weekDay) > 0)) {  // 이전 월
    return {
      ...state,
      toMonth: state.toMonth - 1,
      toDate: action.clickDate,
      toDay: new Date(state.toYear, state.toMonth - 2, action.clickDate).getDay(),
    }
  }else {
    return {
      ...state,
      toDate: action.clickDate,
      toDay: new Date(state.toYear, state.toMonth - 1, action.clickDate).getDay(),
    }
  }
}
function fn_todayIncrement(state){
  const toLastDate = new Date(state.toYear, state.toMonth, 0).getDate();
  
  if((state.toMonth + 1) > 12 && state.toDate >= toLastDate) {
    return {
      ...state,
      toYear: state.toYear + 1,
      toMonth: 1,
      toDate: 1,
      toDay: new Date(state.toYear, state.toMonth - 1, state.toDate + 1).getDay()
    }
  }else if (state.toDate >= toLastDate) {
    return {
      ...state,
      toMonth: state.toMonth + 1,
      toDate: 1,
      toDay: new Date(state.toYear, state.toMonth - 1, state.toDate + 1).getDay()
    }
  }else {
    return {
      ...state,
      toDate: state.toDate + 1,
      toDay: new Date(state.toYear, state.toMonth - 1, state.toDate + 1).getDay()
    }
  }
}
function fn_todayDecrement(state){
  const toLastDate = new Date(state.toYear, state.toMonth - 1, 0).getDate();

  if(state.toMonth <= 1 && state.toDate <= 1) {
    return {
      ...state,
      toYear: state.toYear - 1,
      toMonth: 12,
      toDate: toLastDate,
      toDay: new Date(state.toYear, state.toMonth - 1, state.toDate - 1).getDay()
    }
  }else if (state.toDate <= 1) {
    return {
      ...state,
      toMonth: state.toMonth - 1,
      toDate: toLastDate,
      toDay: new Date(state.toYear, state.toMonth - 1, state.toDate - 1).getDay()
    }
  }else {
    return {
      ...state,
      toDate: state.toDate - 1,
      toDay: new Date(state.toYear, state.toMonth - 1, state.toDate - 1).getDay()
    }
  }
}
function fn_toMonthIncrement(state){
  if((state.toMonth + 1) > 12) {
    return {
      ...state,
      toYear: state.toYear + 1,
      toMonth: 1,
    }
  }else {
    return {
      ...state,
      toMonth: state.toMonth + 1,
    }
  }
}
function fn_toMonthDecrement(state){
  if(state.toMonth <= 1) {
    return {
      ...state,
      toYear: state.toYear - 1,
      toMonth: 12,
    }
  }else {
    return {
      ...state,
      toMonth: state.toMonth - 1,
    }
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return {
        ...state,
        userData: state.userData.concat(action.inputData).sort((a, b) => (
          (a.year - b.year) |
          (a.month - b.month) |
          (a.date - b.date)
        ))
      }
    case 'DELETE': 
      return {
        ...state,
        userData: state.userData.filter((item, idx) => idx !== action.idx)
      }
    case 'TODAY_DECREMENT':
      return fn_todayDecrement(state)
    case 'TODAY_INCREMENT':
      return fn_todayIncrement(state);
    case 'DATE_CHANGE':
      return fn_dateChange(state, action);
    case 'TOMONTH_DECREMENT': 
      return fn_toMonthDecrement(state);
    case 'TOMONTH_INCREMENT': 
      return fn_toMonthIncrement(state); 
    case 'TYPE_CHANGE':
      return {...state, userType: action.userType}
    default:
      throw new Error("Dosen't have action type");
  }
}

const TodoStateContext = createContext(null);
const TodoDispatchContext = createContext(null);

export function TodoContext({children}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  )
}

export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}