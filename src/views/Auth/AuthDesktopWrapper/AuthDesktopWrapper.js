import React, { useState } from 'react';
import './authDesktopWrapper.scss';

import SignInCard from '../../../components/SignInCard/SignInCard';
import SignUpCard from '../../../components/SignUpCard/SignUpCard';

import calendar from '../../../assets/calendar-icon.svg';
import laisLogo from '../../../assets/lais-logo.svg';
import ufrnLogo from '../../../assets/ufrn-logo.svg';
import authBg from '../../../assets/auth-bg.jpg';
import userIcon from '../../../assets/user-icon.svg';

const AuthDesktopWrapper = () => {
  const [isLogin, setIsLogin] = useState(true)
  const form = isLogin ? <SignInCard /> : <SignUpCard />;
  const [textHeader, buttonTextHeader] =  isLogin ? 
    ["Não tem uma conta?", "Crie uma"] : ["Já tem conta?", "Entrar"] 

  const toggleLogin = () => setIsLogin(!isLogin);


  return (
    <div className="row">
      <div className="auth-side">
        <img className="auth-bg" src={authBg}/>

        <div className="auth-side-main">
          <img className="calendar-icon" src={calendar} alt="calendar-icon"/>
          <h1 className="title">Agendamento online</h1>
          <p className="auth-side-description font-light">Rápido e seguro</p>
          <p className="auth-side-description font-light">Evite filas e aglomeração.<br/>O seu bem é o bem de todos</p>
        </div>

        <div className="row auth-side-logos">
          <img className="lais-logo" src={laisLogo} alt="Logo Lais"/>
          <img className="ufrn-logo" src={ufrnLogo} alt="Logo UFRN"/>
        </div>
      </div>

      <div className="auth-body">
        <div className="row auth-header m-3">
          <span className="mr-3">{ textHeader }</span>
          <button className="btn btn-secondary" onClick={ toggleLogin }>
            <img className="user-icon mr-1" src={userIcon} alt="user-icon"/>
            { buttonTextHeader }
          </button>
        </div>

        { form }
    
      </div>

    </div>
  );

}

export default AuthDesktopWrapper;