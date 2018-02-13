import React from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const AuthRoute = ({ component: Component, path, loggedIn }) => (
  <Route path={path} render={(props) => (
    loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to="/" />
    )
  )} />
);

const mapStateToProps = state => ({
  loggedIn: Boolean(state.ui.session.currentUser)
});

export default withRouter(connect(mapStateToProps, null)(AuthRoute));
