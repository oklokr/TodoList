import React from 'react'
import { useTodoState, useTodoDispatch } from '../TodoContext'

function TodayTemplate() {
  const state = useTodoState()
  const dispatch = useTodoDispatch();
  const {toYear, toMonth, toDate} = state;

  const setNumber = (number) => {
    return String(number).length === 1 ? String(number).padStart(2, '0') : number;
  }

  return (
    <>
      <div className='controll_wrap today'>
        <strong>
          <span>{toYear}. {setNumber(toMonth)}</span>
          <span className='point'>{setNumber(toDate)}</span>
        </strong>
        <button className='btn_prev' onClick={() => dispatch({type: 'TODAY_DECREMENT'})}></button>
        <button className='btn_next' onClick={() => dispatch({type: 'TODAY_INCREMENT'})}></button>
      </div>
    </>
  )
}

export default TodayTemplate;