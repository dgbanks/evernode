import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import auth0 from 'auth0-js';
import Splash from './authentication/splash';
import Callback from './authentication/callback';
import Auth from './authentication/auth';
import history from './authentication/history';

// const authRoutes = AuthRoutes();

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

const App = () => (
  <Switch>
    <Route exact path='/' render={(props) => <Splash auth={auth} {...props} /> } />
    <Route path='/callback' render={(props) => {
      handleAuthentication(props);
      return <Callback auth={auth} {...props} />;
    }}/>
  </Switch>
);

export default App;




// <Switch>
//   {AuthRoutes()}
// </Switch>
