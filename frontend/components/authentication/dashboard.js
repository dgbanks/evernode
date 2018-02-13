import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/user_actions';

class Dashboard extends React.Component {


  render() {
    console.log('props', this.props);
    return (
      <div>
        <nav className='navbar'>
          <h1>evernode</h1>
          {this.props.currentUser.first_name}
        </nav>
        <a onClick={() => this.props.logout()}>Logout</a>
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
