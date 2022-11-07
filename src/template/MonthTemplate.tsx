import React from 'react'
import { useTodoState, useTodoDispatch } from '../TodoContext'
import axios from 'axios'

const getRequestUrl = (year, month) => `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?ServiceKey=s8S%2FhLLqpcl4TB%2Ft42TrH7NmP9E0nWZ583K4DUcCLJPZESRFKCC24XyEI0AqpH9vqQugEXX4lBQ5xb7Rx49lIQ%3D%3D&solYear=${year}&solMonth=${month}`;

function MonthTemplate() {
  const state = useTodoState()
  const dispatch = useTodoDispatch();
  const {toYear, toMonth, toDate} = state;
  // const [holiday, setholiday] = useState();
  // const getHoliday = async () => {
  //   try {
  //     const response = await axios.get(getRequestUrl(toYear, toMonth));
  //     const getData = response.data.response.body.items ? response.data.response.body.items.item : null;
  //     console.log('test1')
  //     // setholiday(getData)
  //   }catch(e) {
  //     console.log(e)
  //   }
  // }
  // getHoliday()

  const monthItem = () => {
    const toDays = new Date();
    const toFirstDay = new Date(toYear, toMonth - 1, 1);
    const toLastDay = new Date(toYear, toMonth, 0);
    const sumDates = toFirstDay.getDay() + toLastDay.getDate() + (6 - toLastDay.getDay());
    let array = [];
    let result = [];
    for(let i = 0; i < sumDates; i++) {
      const fullMonths = new Date(toYear, toMonth - 1, -(toFirstDay.getDay() - 1) + i);
      array.push({
        date: fullMonths.getDate(),
        holiday: fullMonths.getDay() === 0,
        toDay: Number(`${toDays.getFullYear()}${toDays.getMonth() + 1}${toDays.getDate()}`) === Number(`${fullMonths.getFullYear()}${fullMonths.getMonth() + 1}${fullMonths.getDate()}`),
      });
    }
    for(let i = 1; i < Math.round(sumDates / 7) + 1; i++) {
      result.push(array.splice(0, 7))
    }

    return result
  }

  const setNumber = (number) => {
    return String(number).length === 1 ? String(number).padStart(2, '0') : number;
  }

  return (
    <>
      <div className='controll_wrap month'>
        <strong>{toYear}. {setNumber(toMonth)}</strong>
        <button className='btn_prev' onClick={() => dispatch({type: 'TOMONTH_DECREMENT'})}></button>
        <button className='btn_next' onClick={() => dispatch({type: 'TOMONTH_INCREMENT'})}></button>
      </div>
      <table className='calendar_wrap'>
        <thead>
          <tr>
            <th>일</th>
            <th>월</th>
            <th>화</th>
            <th>수</th>
            <th>목</th>
            <th>금</th>
            <th>토</th>
          </tr>
        </thead>
        <tbody>
          {monthItem().map((item, week) => {
            return <tr key={week}>
              {item.map((item, idx) => {
                return <td key={idx} className={item.toDay ? 'active' : ''}>{item.date}</td>
              })}
            </tr>
          })}
        </tbody>
      </table>
    </>
  )
}

export default MonthTemplate;