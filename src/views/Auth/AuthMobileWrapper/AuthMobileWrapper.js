import React, { useState } from 'react';
import './authMobileWrapper.scss';

import SignInCard from '../../../components/SignInCard/SignInCard';
import SignUpCard from '../../../components/SignUpCard/SignUpCard';

import calendar from '../../../assets/calendar-icon.svg';
import laisLogo from '../../../assets/lais-logo.svg';
import ufrnLogo from '../../../assets/ufrn-logo.svg';
import authBg from '../../../assets/auth-bg.jpg';
import userIcon from '../../../assets/user-icon.svg';

const AuthMobileWrapper = () => {
  const [isLogin, setIsLogin] = useState(true)

  const toggleLogin = () => setIsLogin(!isLogin);

  const form = isLogin ? <SignInCard toggleLogin={toggleLogin}/> 
  : <div className="signup-bg">
      <SignUpCard toggleLogin={toggleLogin} />
      <div className="row auth-mobile-logos">
        <img className="lais-logo logo-no-filter" src={laisLogo} alt="Logo Lais"/>
        <img className="ufrn-logo logo-no-filter" src={ufrnLogo} alt="Logo UFRN"/>
      </div>
    </div>;

  const header = isLogin ? ( 
    <div className="auth-mobile-header row justify-content-between">
      <img className="calendar-icon" src={calendar} alt="calendar-icon"/>
      <button className="btn btn-secondary" onClick={ toggleLogin }>
        <img className="user-icon mr-1" src={userIcon} alt="user-icon"/>
        Criar conta
      </button>
    </div>
  )
  : (
    <div className="auth-mobile-header row justify-content-center">
      <img className="calendar-icon" src={calendar} alt="calendar-icon"/>
      <span className="title">Agendamento Online</span>
    </div>
  )

  const signInLogos = isLogin ?
    <div className="row auth-mobile-logos mobile-logo-bottom">
      <img className="lais-logo" src={laisLogo} alt="Logo Lais"/>
      <img className="ufrn-logo" src={ufrnLogo} alt="Logo UFRN"/>
    </div>
  : null;

  return (
    <div className="auth-mobile">
      <img className="auth-bg" src={authBg}/>

      {header}

      {form}

      {signInLogos}
    </div>
  );

}

export default AuthMobileWrapper;