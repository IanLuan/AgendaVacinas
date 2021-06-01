import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './private-route'
import RedirectRoute from './redirect-route'

import Auth from './views/Auth/Auth';
import Painel from './views/Painel/Painel';


const Routes = () => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute exact path='/' component={ Painel } />
      <RedirectRoute exact path='/entrar' component={ Auth } />
    </Switch>
  </BrowserRouter>
);

export default Routes;