import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Splash from './authentication/splash';
import Dashboard from './authentication/dashboard';
import Callback from './authentication/callback';
// import Auth from './authentication/auth';
import auth0 from 'auth0-js';
import history from './authentication/history';
import { Auth0Config } from './authentication/auth0_config';
import Login from './authentication/login';
import NewLogin from './authentication/NEW_AUTH';
import { makeMainRoutes } from '../auth0Sample/src/routes';

// console.log('auth0', auth0);

const authRoutes = makeMainRoutes();

// const auth = new auth0.WebAuth({
//   domain: Auth0Config.domain,
//   clientID: Auth0Config.clientID,
//   redirectUri: Auth0Config.callbackUrl,
//   audience: `https://${Auth0Config.domain}/userinfo`,
//   responseType: 'token id_token',
//   scope: 'openid profile'
// });
// 
// const handleAuthentication = ({location}) => {
//   if (/access_token|id_token|error/.test(location.hash)) {
//     console.log('HASHHASHHASH');
//     auth.handleAuthentication();
//   }
// };

// console.log(auth);

const App = () => (
  <div>
    <main>
      <Switch history={history}>
        {authRoutes}
      </Switch>
    </main>
  </div>
);

export default App;
