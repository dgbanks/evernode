import React from 'react';
import { connect } from 'react-redux';
import { authenticateUser } from '../../actions/session_actions';

class Callback extends React.Component {

  componentWillMount() {
    setTimeout(this.handleLogin(), 5000);
  }

  handleLogin() {
    let accessToken = localStorage.getItem('access_token');
    localStorage.clear();
    this.props.auth.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.props.authenticateUser({
          google_id: profile.sub.slice(14),
          first_name: profile.given_name
        }).then(() => this.props.history.replace('/'));
      }
    });
  }

  render() {
    const style = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      color: '#70b2d8',
      backgroundColor: 'white',
      fontSize: '200px'
    };
    return (
      <div style={style}>
        <i className="fas fa-spinner fa-pulse"></i>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  authenticateUser: user => dispatch(authenticateUser(user))
});

export default connect(null, mapDispatchToProps)(Callback);
