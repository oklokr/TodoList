import React, { useEffect } from 'react'
import { useTodoState, useTodoDispatch } from '../TodoContext'

function WeekTemplate() {
  const state = useTodoState()
  const dispatch = useTodoDispatch();
  const {toYear, toMonth, toDay, toDate} = state;

  const setNumber = (number) => {
    return String(number).length === 1 ? String(number).padStart(2, '0') : number;
  }

  const fn_setWeek = () => {
    const array = [];

    for(let i = 0; i < 7; i++) {
      const weekDay = (toDate - toDay) + i;
      const weekDate = new Date(toYear, toMonth - 1, weekDay).getDate()

      array.push(
        <button
          key={i}
          className={`btn ${toDate === weekDay ? 'active' : ''}`}
          onClick={() => dispatch({type: 'DATE_CHANGE', clickDate: weekDate, weekDay: weekDay})}
        >
          {weekDate}
        </button>
      )
    }
    return array
  }

  useEffect(() => {
    // console.log(state)
  }, [state])

  return (
    <>
      <div className='controll_wrap week'>
        <strong>
          <span>{toYear}. {setNumber(toMonth)}</span>
        </strong>
        <div className='point'>
          {fn_setWeek()}
        </div>
        <button className='btn_prev' onClick={() => dispatch({type: 'TODAY_DECREMENT'})}></button>
        <button className='btn_next' onClick={() => dispatch({type: 'TODAY_INCREMENT'})}></button>
      </div>
    </>
  )
}

export default WeekTemplate