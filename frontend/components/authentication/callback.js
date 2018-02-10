import React from 'react';
import { connect } from 'react-redux';
import { authenticateUser } from '../../actions/user_actions';

class Callback extends React.Component {

  componentWillMount() {
    console.log('componentWillMount: localStorage', localStorage);
    if (localStorage.access_token) {
      let accessToken = localStorage.getItem('access_token');
      this.props.auth.auth0.client.userInfo(accessToken, (err, profile) => {
        if (profile) {
          console.log('profile', profile);
          this.props.authenticateUser({
            google_id: profile.sub.slice(14),
            first_name: profile.given_name
          }).then(() => this.props.history.replace('/dashboard'));
        }
      });
    }
  }

  render() {
    console.log(this.props);

    const style = {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
    };

    return (
      <div style={style}>
        <h1>THIS WAS SUPPOSED TO BE THE LOADING SVG</h1>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  authenticateUser: user => dispatch(authenticateUser(user))
});

export default connect(null, mapDispatchToProps)(Callback);
