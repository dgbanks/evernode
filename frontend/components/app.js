import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Splash from './authentication/splash';
import Auth from './authentication/auth';
import CanvasShow from './canvas/canvas_show';

const auth = new Auth();

const App = () => (
  <Switch>
      <Route path='/canvases/:canvasId' component={CanvasShow} />
      <Route path='/' render={() => <Splash auth={auth} />} />
  </Switch>
);

export default App;
