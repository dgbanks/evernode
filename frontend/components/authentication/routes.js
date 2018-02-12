import React from 'react';
import { Redirect, Route, Router } from 'react-router-dom';
import Callback from './callback';
import Splash from './splash';
import Dashboard from './dashboard';
import Auth from './auth';
import history from './history';
import AuthRoute from '../../utils/route_util';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

export const AuthRoutes = () => {
  return (
    <Router history={history}>
        <div>
          <Route exact path="/" render={(props) => <Splash auth={auth} {...props} /> } />
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback auth={auth} {...props} />;
          }}/>
          <AuthRoute path="/dashboard" component={Dashboard} />
        </div>
      </Router>
  );
};
