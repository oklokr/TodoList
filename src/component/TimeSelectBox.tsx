import React from 'react'

function SelectBox({name, chagne, disabled}) {
  
  const setNumber = (number) => {
    return String(number).length === 1 ? String(number).padStart(2, '0') : number;
  }

  const fn_timeSet = (type) => {
    let result = []

    if (type.includes("Hours")) {
      for (let i = 0; i < 12; i++) {
        result.push(
          <option key={i} value={i + 1}>{setNumber(i + 1)}</option>
        )
      }
    }

    if (type.includes("Minutes")) {
      for (let i = 0; i < 60; i++) {
        result.push(
          <option key={i} value={i + 1}>{setNumber(i + 1)}</option>
        )
      }
    }
    return result
  }
  return (
    <>
    <div className={`select ${disabled ? 'disabled' : ''}`}>
      <select name={name} onChange={chagne}>
        <option value="none" hidden>선택</option>
        {fn_timeSet(name)}
      </select>
    </div>
    </>
  )
}

export default SelectBox