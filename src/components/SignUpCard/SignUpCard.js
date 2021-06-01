import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './signUpCard.scss';

import TextField from '../TextField/TextField';
import { Button, Modal} from 'react-bootstrap/'


const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
 
  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}


const SignUpCard = ({ toggleLogin }) => {
  const history = useHistory();
  const email = useFormInput('');
  const name = useFormInput('');
  const password = useFormInput('');
  const confirmPassword = useFormInput('');

  const [errors, setErrors] = useState([]);
  const [passwordError, setPasswordError] = useState('');
  const [isEmailOnly, setIsEmailOnly] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const hasError = key => {
    return errors.indexOf(key) !== -1;
  }

  const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);

    let errors = [];

    // email
    const expression = /\S+@\S+/;
    let validEmail = expression.test(String(email.value).toLowerCase());

    if (!validEmail) {
      errors.push("emailField");
    }
    
    if(!isEmailOnly) {

      if (name.value == "") {
        errors.push("nameField");
      }

      // password
      let expressionPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      let validPassword = expressionPassword.test(password.value);

      if (!validPassword) {
        errors.push("passwordField");
        setPasswordError("A senha precisa ter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial.");
      }

      expressionPassword = /^.{8,}$/
      validPassword = expressionPassword.test(String(password.value).toLowerCase());

      if (!validPassword) {
        errors.push("passwordField");
        setPasswordError("A senha precisa ter no mínimo 8 caracteres.");
      }

      // confirm password
      if (password.value != confirmPassword.value) {
        errors.push("confirmPasswordField");
      }
    }

    setErrors(errors);

    if (errors.length > 0) {
      setIsLoading(false);
      return false;
    } else {

      if(isEmailOnly) {
        setIsEmailOnly(false);
        setIsLoading(false);
      } else {
        setSuccess(true);
        localStorage.setItem('isLogged', true)
        setTimeout(() => { 
          history.push('/');
        }, 2000);
      }
    }
    
  }

  const title = isEmailOnly ? "Preencha o campo abaixo" : "Preencha os campos abaixo";

  const formComplete = isEmailOnly ? null
    : (
      <>
      <TextField
        id="nameField"
        label="Nome" 
        hasError={ hasError("nameField") } 
        type="name" 
        value={name.value} 
        onChange={name.onChange} 
        errorMessage="Seu nome é obrigatório."
      />

      <TextField
        id="passwordField"
        label="Senha" 
        hasError={ hasError("passwordField") } 
        type="password" 
        value={password.value} 
        onChange={password.onChange} 
        errorMessage={ passwordError }
      />

      <TextField
        id="confirmPasswordField"
        label="Confirmação de senha" 
        hasError={ hasError("confirmPasswordField") } 
        type="password" 
        value={confirmPassword.value} 
        onChange={confirmPassword.onChange} 
        errorMessage="A confirmação de senha não confere."
      />

      </>
    );

    
  const legalText = isEmailOnly ? null 
  : <p className="legal-text">Ao assinar você concorda com os <button className="button-link" onClick={() => setModalShow(true)}>termos de serviço</button> e <button className="button-link" onClick={() => setModalShow(true)}>política de privacidade</button></p>;

  const successAlert = success ? 
    <div className="alert alert-success full-width" role="alert">
      Cadastro realizado!
    </div>
  : null

  const buttonContent = isLoading
  ? (
    <span className="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span>  
  )
  : (
    <>Entrar</>
  );


  return (
    <div className="signUp-col">
      <div className="signUp-card my-card">
        <h3 className="font-bold card-title">{title}</h3>
        <p>É rápido, simples e seguro</p>

        <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>

          {successAlert}

          <TextField
            id="emailField"
            label="Email" 
            hasError={ hasError("emailField") } 
            type="email" 
            value={email.value} 
            onChange={email.onChange} 
            errorMessage="Email inválido."
          />

          { formComplete }

          <p className="has-account-question">Já tem uma conta? <button type="button" className="button-link" onClick={() => toggleLogin() }>Entrar</button></p>

          <button className="btn btn-primary btn-block font-bold mt-2" type="submit" disabled={!email.value.length > 0}>{buttonContent}</button>
        </form>
      </div>

      {legalText}

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="modal-custom"
        scrollable
      >
        <Modal.Body>
          <h5 className="title text-primary mb-3">Termos e Política de privacidade</h5>
          <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 
          <br></br>
          <br></br>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 
          <br></br>
          <br></br>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="modal-button btn-light" onClick={() => setModalShow(false)}>Fechar</Button>
        </Modal.Footer>
      </Modal>
      
    </div>
  );
}

export default SignUpCard;