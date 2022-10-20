import React, { useState } from 'react'
import TodoItem from '../component/todoItem'
import TodoCreate from '../features/TodoCreate';
import { useTodoState, useTodoDispatch } from '../TodoContext'

function TodayTemplate() {
  const state = useTodoState()
  const dispatch = useTodoDispatch();
  const {toYear, toMonth, toDate, userData} = state;
  const [open, setOpen] = useState(false);
  
  const fn_open = () => {
    setOpen(!open)
  }

  const setNumber = (number) => {
    return String(number).length === 1 ? String(number).padStart(2, '0') : number;
  }

  return (
    <>
      <div className="page_today">
        <div className='controll_wrap'>
          <strong>
            <span>{toYear}. {setNumber(toMonth)}</span>
            <span className='point'>{setNumber(toDate)}</span>
          </strong>
          <button className='btn_prev' onClick={() => dispatch({type: 'DATE_DECREMENT'})}></button>
          <button className='btn_next' onClick={() => dispatch({type: 'DATE_INCREMENT'})}></button>
        </div>
        <ul className='todoList_col'>
          {userData.map((item, index) => item.year === toYear && item.month === toMonth && item.date === toDate && (
            <TodoItem
              key={index} 
              Element={'li'} 
              startTime={item.startTime}
              endTime={item.endTime}
              allTime={item.allTime}
              label={item.label} 
              text={item.text}
              fn_delete={() => dispatch({type: 'DELETE', idx: index})}
            ></TodoItem>
          ))}
        </ul>
        <TodoCreate open={open} setOpen={setOpen} state={state} />
      </div>
      <button className={`btn_add ${open ? 'active' : ''}`} onClick={fn_open}>
        <span>추가하기</span>
      </button>
    </>
  )
}

export default TodayTemplate;