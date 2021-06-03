import React from 'react';
import { BrowserRouter, Switch} from 'react-router-dom';
import PrivateRoute from '../../private-route';
import './painel.scss';

import Sidebar from '../../components/Sidebar/Sidebar';
import AgendamentosView from './AgendamentosView/AgendamentosView';
import AgendarView from './AgendarView/AgendarView';
import MobileBottomBar from '../../components/MobileBottomBar/MobileBottomBar';

import searchIcon from '../../assets/search-icon.svg'; 



const Painel = () => {
  
  return (
  <BrowserRouter>
    <div className="painel">
      <Sidebar />

      <div className="search-input-box">
        <img src={searchIcon} className="search-input-icon" alt="search-icon" />
        <input type="text" className="search-input" placeholder="Pesquisar" />
      </div>

      <MobileBottomBar />
      
      <Switch>
        <PrivateRoute exact path='/' component={ AgendamentosView } />
        <PrivateRoute exact path='/agendar' component={ AgendarView } />
      </Switch>
    </div>
  </BrowserRouter>
  );

}

export default Painel