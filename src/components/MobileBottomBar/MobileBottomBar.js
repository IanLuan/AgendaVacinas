import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './mobileBottomBar.scss';

import folderIcon from '../../assets/folder-open.svg';
import writeIcon from '../../assets/write-icon.svg';


const MobileHeader = () => {
  const history = useHistory();
  const myLocation = useLocation();
  const [active, setActive] = useState();

  useEffect(() => {
    if(myLocation.pathname === "/") {
      setActive(0)
    } else {
      setActive(1)
    }
  }, [])

  return (
    <div className="mobile-bottom-bar">
      <div 
        onClick={() => {
          setActive(0)
          history.push('/');
        }} 
        className={`mobile-bottom-item ${active === 0 ? 'active-item' : ''}`}
      >
        <img className="bottom-item-icon mb-1" src={folderIcon} alt="folder-icon"/>
        <span className="bottom-item-text">Agendamentos</span>
      </div>

      <div 
        onClick={() => {
          setActive(1)
          history.push('/agendar');
        }} 
        className={`mobile-bottom-item ${active === 1 ? 'active-item' : ''}`}
      >
        <img className="bottom-item-icon mb-1" src={writeIcon} alt="folder-icon"/>
        <span className="bottom-item-text">Agendar</span>
      </div>
    </div>
  
  );

}

export default MobileHeader