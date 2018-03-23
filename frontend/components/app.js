import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Splash from './authentication/splash';
import CanvasShow from './canvas/canvas_show';

const App = () => (
  <Switch>
      <Route path='/canvases/:canvasId' component={CanvasShow} />
      <Route path='/' component={Splash} />
  </Switch>
);

export default App;
