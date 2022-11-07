import React, { useState } from 'react'
import TodoCreate from '../features/TodoCreate'
import { useTodoState } from '../TodoContext'


function Footer() {
  const state = useTodoState()
  const [open, setOpen] = useState(false);
  const fn_open = () => {
    setOpen(!open)
  }
  
  return (
    <footer>
      {open &&
        <div className='create_wrap'>
          <TodoCreate open={open} setOpen={setOpen} state={state} />
        </div>
      }
      <button className={`btn_add ${open ? 'active' : ''}`} onClick={fn_open}>
        <span>추가하기</span>
      </button>
    </footer>
  )
}

export default Footer