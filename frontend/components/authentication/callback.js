import React from 'react';

class Callback extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentWillMount() {
    setTimeout(this.handleLogin, 1000);
  }

  handleLogin() {
    let accessToken = sessionStorage.getItem('access_token');
    sessionStorage.clear();
    this.props.auth.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.props.authenticateUser({
          google_id: profile.sub.slice(14),
          first_name: profile.given_name
        });
      }
    });
  }

  render() {
    return (
      <div className='spinner-div'>
        <i className="fas fa-spinner fa-pulse"></i>
      </div>
    );
  }
}

export default Callback;
