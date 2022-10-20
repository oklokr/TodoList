import React from 'react'

function Input({ type, name, value, onChange, placeholder }) {
  return (
    <div className='input'>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  )
}

export default Input