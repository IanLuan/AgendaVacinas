import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Auth from './views/Auth/Auth';


const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/entrar" component={Auth} />
    </Switch>
  </BrowserRouter>
);

export default Routes;