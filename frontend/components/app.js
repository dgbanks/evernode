import React from 'react';
import { Route, Switch } from 'react-router-dom';
import auth0 from 'auth0-js';
import Splash from './authentication/splash';
import Dashboard from './authentication/dashboard';
import Callback from './authentication/callback';
import Auth from './authentication/auth';
import history from './authentication/history';
import { Auth0Config } from './authentication/auth0_config';
// import { makeMainRoutes } from '../auth0Sample/src/routes';
import AuthRoute from '../utils/route_util';

// const authRoutes = makeMainRoutes();

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

const App = () => (
  <div>
    <main>
      <Switch history={history}>
        <Route exact path="/" render={(props) => <Splash auth={auth} {...props} /> } />
        <Route path="/callback" render={(props) => {
          handleAuthentication(props);
          return <Callback auth={auth} {...props} />;
        }}/>
        <AuthRoute path="/dashboard" component={Dashboard} />
      </Switch>
    </main>
  </div>
);

export default App;
