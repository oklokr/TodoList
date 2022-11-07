import React, { useState } from "react";
import { useTodoState, useTodoDispatch } from '../TodoContext'

function Header() {
  const state = useTodoState()
  const dispatch = useTodoDispatch();
  const {userType} = state;
  const [open, setOpen] = useState(false);
  const changeType = (e) => {
    dispatch({type: 'TYPE_CHANGE', userType: e.target.name})
  }
  return (
    <header>
      <div className='view_wrap'>
        <button className={`btn_mewnu ${open ? 'active' : ''}`} onClick={() => setOpen(!open)}>
          <span>메뉴</span>
        </button>
        <div>
          <button className={`btn_month ${userType === 'month' ? 'active' : ''}`} name='month' onClick={changeType}>
            Month
          </button>
          <button className={`btn_week ${userType === 'week' ? 'active' : ''}`} name='week' onClick={changeType}>
            Week
          </button>
          <button className={`btn_day ${userType === 'day' ? 'active' : ''}`} name='day' onClick={changeType}>
            Today
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header