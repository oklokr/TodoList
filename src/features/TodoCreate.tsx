import React, { useEffect, useState } from 'react'
import Input from '../component/Input';
import TimeSelectBox from '../component/TimeSelectBox';
import { useTodoDispatch } from '../TodoContext';

function TodoCreate({open, state, setOpen}) {
  const dispatch = useTodoDispatch();
  const {toYear, toMonth, toDate} = state;
  const [createData, setCreateData] = useState({
    createTitle: '',
    createText: '',
    createStartHours: '',
    createStartMinutes: '',
    createEndHours: '',
    createEndMinutes: '',
    allTime: false,
  })
  const { createTitle, createText, createStartHours, createStartMinutes, createEndHours, createEndMinutes, allTime } = createData;
  const [animation, setAnimation] = useState(false);

  const fn_create = () => {
    dispatch({
      type: 'CREATE',
      inputData: {
        year: toYear,
        month: toMonth,
        date: toDate,
        startTime: `${createStartHours}시 ${createStartMinutes}분`,
        endTime: `${createEndHours}시 ${createEndMinutes}분`,
        allTime: allTime,
        label: createTitle,
        text: createText,
      }
    })
    setCreateData({
      createTitle: '',
      createText: '',
      createStartHours: '',
      createStartMinutes: '',
      createEndHours: '',
      createEndMinutes: '',
      allTime: false,
    })
    setOpen(false);
  }

  const fn_change = (e) => {
    const { value, name } = e.target;
    setCreateData({
      ...createData,
      [name]: value,
    })
  }
  useEffect(() => {
    if (open) {
      setTimeout(() => setAnimation(true), 100);
    }else  {
      setTimeout(() => setAnimation(false), 100);
    }
  })

  return open && (
    <div className={`input_wrap ${animation ? 'open' : ''}`}>
      <dl className='set_text'>
        <dt>내용 입력</dt>
        <dd>
          <Input
            type="text"
            name="createTitle"
            value={createTitle}
            onChange={fn_change}
            placeholder='제목을 입력해주세요'
          />
          <Input
            type="text"
            name="createText"
            value={createText}
            onChange={fn_change}
            placeholder='내용을 입력해주세요'
          />
        </dd>
      </dl>
      <dl className="set_times">
        <dt>
          시간 선택
          <label className='checkBox'>
            <input type="checkbox" name="allTime" checked={allTime} onChange={(e) => {
              const {name} = e.target;
              setCreateData({
                ...createData,
                [name]: !allTime
              })
            }} />
            <span>하루 종일</span>
          </label>
        </dt>
        <dd className='select_wrap'>
          <TimeSelectBox name={"createStartHours"} chagne={fn_change} disabled={allTime} />
          <span>:</span>
          <TimeSelectBox name={"createStartMinutes"} chagne={fn_change} disabled={allTime} />
          <span>~</span>
          <TimeSelectBox name={"createEndHours"} chagne={fn_change} disabled={allTime} />
          <span>:</span>
          <TimeSelectBox name={"createEndMinutes"} chagne={fn_change} disabled={allTime} />
        </dd>
      </dl>
      <button className={`btn ${
        (createStartHours &&
        createStartMinutes &&
        createEndHours &&
        createEndMinutes) || allTime ? '' : 'disabled'}`} onClick={fn_create}>추가하기</button>
    </div>
  )
}

export default TodoCreate