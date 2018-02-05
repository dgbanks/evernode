import React from 'react';
import Auth from './auth';

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      auth0: new Auth(),
      divStyles: {
        height: '100vh',
        width: '100%',
        backgroundColor: '#70b2d8',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        animationName: 'fadeInColor',
        animationDuration: '7s',
      }
    }
  }

  transitionColor() {
    let keyframe = `@keyframes fadeInColor { 
      from { background-color: white } 
      to { background-color: #70b2d8 }
    }`;
    document.styleSheets[0].insertRule(keyframe);
    setTimeout(() => this.state.auth0.login(), 15000);
  }

  render() {
    {this.transitionColor()}
    return (
      <div style={this.state.divStyles}>
        <div style={{display:'flex', flexDirection:'column', alignItems: 'center'}}>
          <h1 className='splashText'>Welcome to EVERNODE</h1>
          <a className='splashButton' onClick={() => this.state.auth0.login()}>
            Sign in with Google
          </a>
        </div>
      </div>
    );
  }
}

export default Splash;