import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Splash from './authentication/splash';
import Dashboard from './authentication/dashboard';
import Callback from './authentication/callback';

const App = () => (
  <div>
    <main>
      <Switch>
        <Route exact path="/" component={Splash} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/callback" component={Callback} />
      </Switch>
    </main>
  </div>
);

export default App;
