import React from 'react';
import { connect } from 'react-redux';

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
    console.log(this.props);
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

const mapStateToProps = ownProps => {
  console.log('newSplash mapStateToProps:', ownProps);
  return {auth: ownProps.auth};
};

export default connect(mapStateToProps, null)(Splash);
