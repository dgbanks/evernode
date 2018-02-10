import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import auth0 from 'auth0-js';
import Splash from './authentication/splash';
import Dashboard from './authentication/dashboard';
import Callback from './authentication/callback';
import Auth from './authentication/auth';
import history from './authentication/history';
import { Auth0Config } from './authentication/auth0_config';
import { AuthRoutes } from './authentication/routes';
import AuthRoute from '../utils/route_util';

// const authRoutes = AuthRoutes();

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

const App = () => (
  <div>
    <main>
      <Switch>
        {AuthRoutes()}
      </Switch>
    </main>
  </div>
);

export default App;
