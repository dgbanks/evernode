import React from 'react';
import history from './history';
import { connect } from 'react-redux';

class Splash extends React.Component {
  constructor(props) {
    super(props);
    console.log('hit SPLASH constructor', props);

    this.handleLogin = this.handleLogin.bind(this);
    this.transitionColor = this.transitionColor.bind(this);
  }

  componentWillMount() {
    if (this.props.currentUser) {
      history.replace('/dashboard');
    }
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

const mapStateToProps = state => ({
  currentUser: state.ui.session.currentUser
});

export default connect(mapStateToProps, null)(Splash);

/*
"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlFqQkRORFEyTVRJNU1EZENNalZDTmpFNVFqUkVNREU1UWpSQ016UTNORVV4UlRkQ056a3lRZyJ9.eyJnaXZlbl9uYW1lIjoiRGF2aWQiLCJmYW1pbHlfbmFtZSI6IkJhbmtzIiwibmlja25hbWUiOiJkYXZpZGdiYW5rczkxIiwibmFtZSI6IkRhdmlkIEJhbmtzIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS8tWGRVSXFkTWtDV0EvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQUEvNDI1MnJzY2J2NU0vcGhvdG8uanBnIiwiZ2VuZGVyIjoibWFsZSIsImxvY2FsZSI6ImVuIiwidXBkYXRlZF9hdCI6IjIwMTgtMDItMDhUMDY6MDc6NTMuMDc1WiIsImlzcyI6Imh0dHBzOi8vZXZlcm5vZGUuYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTA0ODY0ODA0MzQ3NDYwODI3MTc1IiwiYXVkIjoiVTNjMnlnNmx2bmY5SXV5Q0VMa3UxdklLS2lVWE5mVUwiLCJpYXQiOjE1MTgwNzAwNzMsImV4cCI6MTUxODEwNjA3MywiYXRfaGFzaCI6Im5TcDNQeXo2MktITDNmX2JrQldFRlEiLCJub25jZSI6IkYwR25fb2ljNUhMcmcuRFhrdXJjVkZyLXg1WU5lUnJ-In0.N_0wEnBQ0KA2jb2jo5Gyc9QLeeNRiuJ2wUo-3HrWjJsicz1GwUQKViYiBCxERs_lfg6H5VLIZ04IhXGghmhXw8bgQ8HbW7GPpk3oVA_Ln1ady2HNdr1CYDKE4oqXQTTYZ8MwlSGdUlSDQnJFkxhilol6n5HHvn2OcO0OJGa_d2dKdxMHvca9N3d7WZpg0P2PWU6YDg8ZMmWQ1P0neLZozuYJCVtM4gg_MmXRnB73j1KlA80Q7XPBwBNbjh3PqQ5tcfckKBFlZpvAPhG2Zj-b597XDS-eFRpo1blXbZdZr2uRW-WCbBC2Zu-w7TOx1ZkOlMKZXk85z4_K8mo4WDsWOg"

"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlFqQkRORFEyTVRJNU1EZENNalZDTmpFNVFqUkVNREU1UWpSQ016UTNORVV4UlRkQ056a3lRZyJ9.eyJnaXZlbl9uYW1lIjoiRGF2aWQiLCJmYW1pbHlfbmFtZSI6IkJhbmtzIiwibmlja25hbWUiOiJkYXZpZGdiYW5rczkxIiwibmFtZSI6IkRhdmlkIEJhbmtzIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS8tWGRVSXFkTWtDV0EvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQUEvNDI1MnJzY2J2NU0vcGhvdG8uanBnIiwiZ2VuZGVyIjoibWFsZSIsImxvY2FsZSI6ImVuIiwidXBkYXRlZF9hdCI6IjIwMTgtMDItMDhUMDY6MTc6NTkuMDY0WiIsImlzcyI6Imh0dHBzOi8vZXZlcm5vZGUuYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTA0ODY0ODA0MzQ3NDYwODI3MTc1IiwiYXVkIjoiVTNjMnlnNmx2bmY5SXV5Q0VMa3UxdklLS2lVWE5mVUwiLCJpYXQiOjE1MTgwNzA2NzksImV4cCI6MTUxODEwNjY3OSwiYXRfaGFzaCI6IkM4UUtPRGV2bEFwbWZuVk5qNlJnRVEiLCJub25jZSI6IjdDQzBZSnpJTGNocWhiSS1nTHZfSVBFYURNQ0djdEE0In0.ok8QCjAOpy-Xpy4ixQIIfIQOfAaXvZ4pR0SVfOi-oJ05URE3jLWJ2rqjKu1BYmRDms8F5hRBD_oCvj50zTDmRDiUqTzm7QuaAqpSeNfR2fl89oN4wlQ_BbdkttlISk1B-wlY7koj6A8djwyLmcbwNd8_TQ7kre5xpMNQquUTGEBfYPFCZ1iXXk-FEKEYDuG6-iVd4YoZZsITdf5NU19mhpQLzQQ-57l9T2shFTeFqnU37aMNKRlqVepI_g0gqNKQ2OrtnKktBZ7IWMsG_tuZX-t-cwaGoBUNVrSUwjlNkRcf6hbDfz8mNuAIq2dDjag7_zZ_Wo_OQVHCnyp3IZefrA"


*/
