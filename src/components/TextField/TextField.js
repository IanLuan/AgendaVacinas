import React from 'react';
import PropTypes from 'prop-types';
import './textfield.scss';


const TextField = ({id, label, type, value, onChange, hasError, errorMessage}) => {
  
  return (
    <div className="mb-2 row full-width">
      <label htmlFor={id} className="form-label field-label">{label}</label>
      <input 
        type={type} 
        className={
          hasError
            ? "form-control text-field is-invalid"
            : "form-control text-field"
        }
        id={id}
        aria-describedby={ `${id}FieldFeedback` }
        required
        value={value}
        onChange={onChange}
      />
      <div id={ `${id}FieldFeedback` } className="invalid-feedback">
        {errorMessage}
      </div>
    </div>
  );
}

TextField.defaultProps = {
  hasError: false,
};

TextField.propTypes = {
  id: PropTypes.string.isRequired
};

export default TextField;