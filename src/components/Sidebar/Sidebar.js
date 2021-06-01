import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './sidebar.scss';

import calendar from '../../assets/calendar-icon-dark.svg';
import arrowRight from '../../assets/chevron-right.svg';
import folderIcon from '../../assets/folder-open.svg';
import writeIcon from '../../assets/write-icon.svg';
import avatar from '../../assets/avatar.jpeg';
import userIcon from '../../assets/user-icon-primary.svg';
import logoutIcon from '../../assets/logout-icon.svg';


const Sidebar = () => {
  const history = useHistory();
  const [active, setActive] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem("isLogged");
    history.push('/entrar');
  }

  return (
    
    <div className="sidebar">

      <div className="sidebar-header">
        <img className="calendar-icon" src={calendar} alt="calendar-icon"/>
        <h3 className="title sidebar-title">
          Agendamento<br></br>online
        </h3>
      </div>
      
      <div class="custom-dropdown">
        <div id="sidebar-userArea" className="sidebar-userArea dropbtn">
          <img className="sidebar-avatar" src={avatar}/>
          <div className="center-col">
            <span>Seja bem vindo</span>
            <span className="title">Johnny Clark</span>
          </div>
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

      <hr />

      <button onClick={() => {setActive(0)}} className={`btn sidebar-item mb-1  ${active === 0 ? "btn-primary active-item" : "btn-light"}`}>
        <img className="sidebar-item-icon" src={folderIcon} />
        Meus agendamentos
      </button>

      <button onClick={() => {setActive(1)}} className={`btn sidebar-item mb-1" ${active === 1 ? "btn-primary active-item" : "btn-light"}`}>
        <img className="sidebar-item-icon" src={writeIcon} />
        Agendar
      </button>

    </div>
  
  );

}

export default Sidebar