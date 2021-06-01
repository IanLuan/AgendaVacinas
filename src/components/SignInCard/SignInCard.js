import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './signInCard.scss';

import api from '../../services/api'
import TextField from '../TextField/TextField';


const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
 
  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    setValue,
    onChange: handleChange
  }
}


const SignInCard = ({ toggleLogin }) => {
  const history = useHistory();

  const email = useFormInput('');
  const password = useFormInput('');
  const [errors, setErrors] = useState([]);
  const [hasLoginError , setHasLoginError] = useState(false);
  const [isLoading , setIsLoading] = useState(false);

  const hasError = key => {
    return errors.indexOf(key) !== -1;
  }

  const handleSubmit = async e => {
    e.preventDefault();

    let errors = [];

    if (email.value === "") {
      errors.push("emailField");
    }

    if (password.value === "") {
      errors.push("passwordField");
    }

    setErrors(errors);

    if (errors.length > 0) {
      return false;
    } else {
      setIsLoading(true);

      const payload = { email: email.value, password: password.value };
      await api.post('/auth/login', payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        localStorage.setItem('isLogged', true)
        setHasLoginError(false);
        history.push("/");
      })
      .catch((error) => {
        setHasLoginError(true);
        setIsLoading(false);
        password.setValue("");
      });
    }

  }

  let alert = null;

  if(hasLoginError) {
    alert = (
    <div className="alert alert-danger full-width" role="alert">
      Email ou senha incorretos!
    </div>
    )
  } else {
    alert = null;
  }

  const buttonContent = isLoading
  ? (
    <span className="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span>  
  )
  : (
    <>Entrar</>
  );

  return (
    <div className="signIn-card my-card">
      <h3 className="font-bold card-title">Preencha os campos abaixo</h3>

      <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>

        { alert }

        <TextField
          id="emailField"
          label="Email" 
          type="email" 
          value={email.value} 
          onChange={email.onChange} 
          hasError={ hasError("emailField") } 
          errorMessage="É necessário informar um email."
        />

        <TextField
          id="passwordField"
          label="Senha" 
          type="password" 
          value={password.value} 
          onChange={password.onChange} 
          hasError={ hasError("passwordField") } 
          errorMessage="É necessário informar uma senha."
        />

        <a className="link">Esqueceu sua senha?</a>

        <button className="btn btn-primary btn-block font-bold" type="submit">{buttonContent}</button>
      </form>

    </div>
  );
}

export default SignInCard;