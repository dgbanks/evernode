import React from 'react';
import { connect } from 'react-redux';

import CanvasIndex from '../canvas/canvas_index';
import { logout } from '../../actions/session_actions';

class Dashboard extends React.Component {


  render() {
    console.log('props', this.props);
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

const mapStateToProps = (state, ownProps) => ({
  currentUser: ownProps.currentUser
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
