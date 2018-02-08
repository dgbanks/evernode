import React, { Component } from 'react';
// import { Navbar, Button } from 'react-bootstrap';
// import './App.css';

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        <nav>
          <div>
            <div>
              <a href="#">Auth0 - React</a>
            </div>
            <a
              className="btn-margin"
              onClick={this.goTo.bind(this, 'home')}
            >
              Home
            </a>
            {
              !isAuthenticated() && (
                  <a
                    className="btn-margin"
                    onClick={this.login.bind(this)}
                  >
                    Log In
                  </a>
                )
            }
            {
              isAuthenticated() && (
                  <a
                    className="btn-margin"
                    onClick={this.goTo.bind(this, 'profile')}
                  >
                    Profile
                  </a>
                )
            }
            {
              isAuthenticated() && (
                  <a
                    className="btn-margin"
                    onClick={this.logout.bind(this)}
                  >
                    Log Out
                  </a>
                )
            }
          </div>
        </nav>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
