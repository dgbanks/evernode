import React from 'react';
import Auth from './auth';

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.divStyles = {
      height: '100vh',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      animationName: 'fadeInColor',
      animationDuration: '5s',
      animationDelay: '1.5s'
    }
  }
  
  transitionColor() {
    let keyframe = `@keyframes fadeInColor { 
      from { background-color: white } 
      to { background-color: #70b2d8 }
    }`;
    document.styleSheets[0].insertRule(keyframe);
    setTimeout(() => new Auth().login(), 6000);
  }
  
  render() {
    {this.transitionColor()}
    return (
      <div>
        <div style={this.divStyles}>
          <h1 className='splashText'>Welcome to EVERNODE</h1>
        </div>
      </div>
    );
  }
}

export default Splash;