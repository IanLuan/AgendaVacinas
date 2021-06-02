import React from 'react';
import './select.scss';

const Select = ({label, onChoose, options, id, className}) => {
  
  const labelItem = label ? <label htmlFor={id}>{label}</label> : null

  return (
    <div className="form-group select-box">
    {labelItem}
    <select className={`select ${className}`} id={id}>
      { options.map((option, index) => <option key={index}>{option}</option>) }
    </select>
  </div>
  );
}


export default Select