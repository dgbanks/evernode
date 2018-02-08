import React from 'react';
import history from './history';
import { connect } from 'react-redux';
import { authenticateUser } from '../../actions/user_actions';

class Splash extends React.Component {
  constructor(props) {
    super(props);
    console.log('hit SPLASH constructor', props);

    this.handleLogin = this.handleLogin.bind(this);
    this.transitionColor = this.transitionColor.bind(this);
  }

  transitionColor() {
    let keyframe = `@keyframes fadeInColor {
      from { background-color: white }
      to { background-color: #70b2d8 }
    }`;
    document.styleSheets[0].insertRule(keyframe);
  }

  handleLogin() {
    // console.log('this.props.auth', this.props.auth);
    console.log(this.props);
    // this.props.auth.authorize();
  }

  render() {
    console.log(this.props);
    // this.props.auth.isAuthenticated();
    this.transitionColor();
    // window.auth.parseHash();

    // console.log(this.props.auth);

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

const mapDispatchToProps = dispatch => ({
  authenticateUser: user => dispatch(authenticateUser(user))
});

export default connect(null, mapDispatchToProps)(Splash);
