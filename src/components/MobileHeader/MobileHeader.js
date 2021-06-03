import React from 'react';
import { useHistory } from 'react-router-dom';
import './mobileHeader.scss';

import calendar from '../../assets/calendar-icon-dark.svg';
import arrowRight from '../../assets/chevron-right.svg';
import avatar from '../../assets/avatar.jpeg';
import userIcon from '../../assets/user-icon-primary.svg';
import logoutIcon from '../../assets/logout-icon.svg';


const MobileHeader = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("isLogged");
    history.go("/entrar")
  }

  return (
    <div className="mobile-header">
      <div className="my-row align-items-center">
        <div className="row">
          <img className="calendar-icon-mobile mr-1" src={calendar} alt="calendar-icon"/>
          <h3 className="title text-secondary mb-0 mobile-header-title">
            Agendamento<br/>online
          </h3>
        </div>

        <div className="custom-dropdown">
          <div id="sidebar-userArea" className="sidebar-userArea dropbtn">
            <img className="sidebar-avatar mr-1" src={avatar}/>
            <img className="arrow-down" src={arrowRight} />
          </div>

          <div className="dropdown-content">
            <button className="btn btn-link">
              <img src={userIcon} className="dropdown-icon"/>
              Meu perfil
            </button>

            <button onClick={handleLogout} className="btn btn-link">
              <img src={logoutIcon} className="dropdown-icon"/>
              Sair
            </button>
          </div>
        </div>
      </div>
    </div>
  
  );

}

export default MobileHeader