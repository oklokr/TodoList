import React from "react"
import TodayTemplate from "../template/TodayTemplate"
import '../styles/content.scss'
import { useTodoState, useTodoDispatch } from '../TodoContext'
import WeekTemplate from "../template/WeekTemplate"
import TodoItem from "../component/todoItem"
import MonthTemplate from "../template/MonthTemplate"

function Content() {
  const state = useTodoState()
  const dispatch = useTodoDispatch();
  const {toYear, toMonth, toDate, userData, userType} = state;
  console.log('test')
  return (
    <main>
      {userType === 'day' && <TodayTemplate />}
      {userType === 'week' && <WeekTemplate />}
      {userType === 'month' && <MonthTemplate />}
      {(userType === 'day' || userType === 'week') && 
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
      }
    </main>
  )
}

export default Content