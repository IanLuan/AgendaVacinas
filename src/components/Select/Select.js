import React from 'react';
import './select.scss';

const Select = ({label, onChoose, options, id, className, startOption}) => {
  
  const labelItem = label ? <label className="mb-1" htmlFor={id}>{label}</label> : null

  return (
    <div className="form-group select-box my-col">
    {labelItem}
    <select onChange={(e) => {onChoose(e.target.value)}} className={`select ${className}`} id={id}>
      <option value="">{startOption}</option>
      { options.map((option, index) => <option key={index} value={option}>{option}</option>) }
    </select>
  </div>
  );
}


export default Select