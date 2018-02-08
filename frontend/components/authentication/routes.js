import React from 'react';
import { Redirect, Route, Router } from 'react-router-dom';
import App from './App';
import Home from './Home';
import Profile from './Profile';
import Callback from './callback';
import Dashboard from './dashboard';
import Auth from './auth';
import history from './history';

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
          <Route exact path="/" render={(props) => <App auth={auth} {...props} />} />
          <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback auth={auth} {...props} />;
          }}/>
          <Route path="/dashboard" render={() => <Dashboard />} />
        </div>
      </Router>
  );
};


// <Route path="/profile" render={(props) => (
//   !auth.isAuthenticated() ? (
//     <Redirect to="/home"/>
//   ) : (
//     <Profile auth={auth} {...props} />
//   )
// )} />
