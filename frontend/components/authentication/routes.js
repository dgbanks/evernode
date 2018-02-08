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

export const makeMainRoutes = () => {
  return (
    <Router history={history}>
        <div>
          <AuthRoute path="/dashboard" component={Dashboard} />
          <Route exact path="/" render={(props) => <Splash auth={auth} {...props} /> } />
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback auth={auth} {...props} />;
          }}/>
        </div>
      </Router>
  );
};

// <Route exact path="/" render={(props) => <App auth={auth} {...props} />} />
// <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />

// <Route path="/profile" render={(props) => (
//   !auth.isAuthenticated() ? (
//     <Redirect to="/home"/>
//   ) : (
//     <Profile auth={auth} {...props} />
//   )
// )} />
