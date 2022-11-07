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
    startMeridiem: '',
    endMeridiem: '',
    allTime: false,
  })
  const { createTitle, createText, createStartHours, createStartMinutes, createEndHours, createEndMinutes, startMeridiem, endMeridiem, allTime } = createData;
  const [animation, setAnimation] = useState(false);
  
  const fn_create = () => {
    const setNumber = (number) => {
      return String(number).length === 1 ? String(number).padStart(2, '0') : number;
    }
    const meridiem = (text) => {
      if(text === 'am') return '오전'
      if(text === 'pm') return '오후'
    }
    dispatch({
      type: 'CREATE',
      inputData: {
        year: toYear,
        month: toMonth,
        date: toDate,
        startTime: `${meridiem(startMeridiem)} ${setNumber(createStartHours)}시 ${setNumber(createStartMinutes)}분`,
        endTime: `${meridiem(endMeridiem)} ${setNumber(createEndHours)}시 ${setNumber(createEndMinutes)}분`,
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
      startMeridiem: '',
      endMeridiem: '',
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
  }, [open])

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
          <div>
            <strong>시작시간</strong>
            <div className={`select ${allTime ? 'disabled' : ''}`}>
              <select name={"startMeridiem"} onChange={fn_change} value={startMeridiem}>
                <option value="none" hidden>선택</option>
                <option value="am">오전</option>
                <option value="pm">오후</option>
              </select>
            </div>
            <TimeSelectBox name={"createStartHours"} change={fn_change} disabled={allTime} />
            <span>시</span>
            <TimeSelectBox name={"createStartMinutes"} change={fn_change} disabled={allTime} />
            <span>분</span>
          </div>
          <div>
            <strong>종료시간</strong>
            <div className={`select ${allTime ? 'disabled' : ''}`}>
            <select name={"endMeridiem"} onChange={fn_change} value={endMeridiem}>
                <option value="none" hidden>선택</option>
                <option value="am">오전</option>
                <option value="pm">오후</option>
              </select>
            </div>
            <TimeSelectBox name={"createEndHours"} change={fn_change} disabled={allTime} />
            <span>시</span>
            <TimeSelectBox name={"createEndMinutes"} change={fn_change} disabled={allTime} />
            <span>분</span>
          </div>
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