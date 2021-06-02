import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from '../../private-route';
import RedirectRoute from '../../redirect-route';
import './painel.scss';

import Sidebar from '../../components/Sidebar/Sidebar';
import AgendamentosView from './AgendamentosView/AgendamentosView';

import searchIcon from '../../assets/search-icon.svg'; 



const Painel = () => {
  
  return (
  <BrowserRouter>
    <div className="painel">
      <Sidebar />

      <div className="search-input-box">
        <img src={searchIcon} className="search-input-icon" />
        <input type="text" className="search-input" placeholder="Pesquisar" />
      </div>


      <Switch>
        <PrivateRoute exact path='/' component={ AgendamentosView } />
        <RedirectRoute exact path='/agendar' component={ AgendamentosView } />
      </Switch>
    </div>
  </BrowserRouter>
  );

}

export default Painel