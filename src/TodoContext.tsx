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
  userData: []
}

function fn_increment(state){
  const toLastDate = new Date(state.toYear, state.toMonth, 0).getDate();
  
  if((state.toMonth + 1) > 12 && state.toDate >= toLastDate) {
    return {...state, toYear: state.toYear + 1, toMonth: 1, toDate: 1 }
  }else if (state.toDate >= toLastDate) {
    return {
      ...state,
      toMonth: state.toMonth + 1,
      toDate: 1
    }
  }else {
    return {...state, toDate: state.toDate + 1}
  }
}
function fn_decrement(state){
  const toLastDate = new Date(state.toYear, state.toMonth - 1, 0).getDate();

  if(state.toMonth <= 1 && state.toDate <= 1) {
    return {...state, toYear: state.toYear - 1, toMonth: 12, toDate: toLastDate}
  }else if (state.toDate <= 1) {
    return {
      ...state,
      toMonth: state.toMonth - 1,
      toDate: toLastDate
    }
  }else {
    return {...state, toDate: state.toDate - 1}
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
    case 'DATE_DECREMENT':
      return fn_decrement(state);
    case 'DATE_INCREMENT':
      return fn_increment(state);
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