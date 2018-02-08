import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
// import App from './app';
import { makeMainRoutes } from './authentication/routes';

const Root = ({store}) => (
  <Provider store={store}>
    {makeMainRoutes()}
  </Provider>
);
export default Root;
