import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Callback from './callback';
import Dashboard from './dashboard';
import { authenticateUser, logout } from '../../actions/session_actions';

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = { success: false };

    this.handleLogin = this.handleLogin.bind(this);
    this.transitionColor = this.transitionColor.bind(this);
    this.successfulAuth = this.successfulAuth.bind(this);
  }

  componentWillMount() {
    if (/access_token|id_token|error/.test(location.hash)) {
      this.props.auth.handleAuthentication(this.successfulAuth);
      this.props.history.replace('/');
    }
  }

  successfulAuth() {
    this.setState({ success: this.props.currentUser ? false : true });
  }

  transitionColor() {
    let keyframe = `@keyframes fadeInColor {
      from { background-color: white }
      to { background-color: #70b2d8 }
    }`;
    document.styleSheets[0].insertRule(keyframe);
  }

  handleLogin() {
    this.props.auth.login();
  }

  render() {
    this.transitionColor();

    const divStyles = {
      height: '100vh',
      width: '100%',
      backgroundColor: '#70b2d8',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      animationName: 'fadeInColor',
      animationDuration: '4s'
    };

    if (this.props.currentUser) {
      return (
        <Dashboard
          logout={this.props.logout}
          successfulAuth={this.successfulAuth}
          currentUser={this.props.currentUser}/>
      );
    } else {
      if (this.state.success) {
        return (
          <Callback
            auth={this.props.auth}
            authenticateUser={this.props.authenticateUser}
          />
        );
      } else {
        return (
          <div style={divStyles}>
            <div style={{display:'flex', flexDirection:'column', alignItems: 'center'}}>
              <h1 className='splashText'>Welcome to EVERNODE</h1>
              <a className='splashButton' onClick={() => this.handleLogin()}>
                Sign in with Google
              </a>
            </div>
          </div>
        );
      }
    }
  }
}

const mapStateToProps = state => ({
  currentUser: state.ui.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  authenticateUser: user => dispatch(authenticateUser(user)),
  logout: () => dispatch(logout())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Splash));
