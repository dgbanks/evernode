import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { authenticateUser } from '../../actions/session_actions';

class Callback extends React.Component {
  constructor(props) {
    super(props);
    console.log('constructor', props);
    this.handleLogin = this.handleLogin.bind(this);
    // console.log('parseHash inside callback:', props.auth.auth0.parseHash());
  }

  componentWillMount() {
    console.log('componentWillMount');
    setTimeout(this.handleLogin(), 5000);
  }

  handleLogin() {
    console.log('handleLogin');
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
    console.log('render');
    return (
      <div className='spinner-div'>
        <i className="fas fa-spinner fa-pulse"></i>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  authenticateUser: user => dispatch(authenticateUser(user))
});

export default withRouter(connect(null, mapDispatchToProps)(Callback));
