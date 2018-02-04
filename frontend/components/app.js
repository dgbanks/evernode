import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Splash from './authentication/splash';

const App = () => (
  <div>
    <main>
      <Switch>
        <Route exact path="/" component={Splash} />
      </Switch>
    </main>
  </div>
);

export default App;
