import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import auth0 from 'auth0-js';
import Splash from './authentication/splash';
import Callback from './authentication/callback';
import Auth from './authentication/auth';
import history from './authentication/history';
import CanvasShow from './canvas/canvas_show';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  console.log(location);
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

const App = () => (
  <Switch>
      <Route exact path='/' render={(props) => <Splash auth={auth} {...props} /> } />
      <Route path='/callback' render={(props) => {
        console.log('CALLBACK ROUTE');
        handleAuthentication(props);
        return <Callback auth={auth} {...props} />;
      }}/>
      <Route path='/canvases/:canvasId' component={CanvasShow} />
  </Switch>
);

export default App;
