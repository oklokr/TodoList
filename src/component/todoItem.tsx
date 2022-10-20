import React from 'react'

function TodoItem({Element, label, text, allTime, startTime, endTime, fn_delete}) {
  return (
    <Element>
      {allTime 
        ? (
          <p className='times'>All day</p>
        )
        : (
          <p className='times'>
            <strong>{startTime}</strong>
            <span>{endTime}</span>
          </p>
        )
      }
      <p className=''>
        <strong>{label}</strong>
        <span>{text}</span>
      </p>
      <div className='btn_wrap'>
        {/* <button className='btn_modify'></button> */}
        <button className='btn_delete' onClick={fn_delete}>
          <span>삭제</span>
        </button>
      </div>
    </Element>
  )
}

export default TodoItem