import React from 'react';
import CanvasIndex from '../canvas/canvas_index';

class Dashboard extends React.Component {
  componentWillMount() {
    this.props.successfulAuth();
  }

  render() {
    return (
      <div className='dash-main'>
        <nav className='navbar'>
          <h1>evernode</h1>
          <div>
            <p>(Logged in as {this.props.currentUser.first_name})</p>
            <a onClick={() => this.props.logout()}>Settings</a>
            <a onClick={() => this.props.logout()}>Logout</a>
          </div>
        </nav>

        <div className='dash-index'>
          <CanvasIndex currentUser={this.props.currentUser} />
        </div>
      </div>
    );
  }
}

export default Dashboard;
