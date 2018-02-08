import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/user_actions';

class Dashboard extends React.Component {
  render() {
    console.log('props', this.props);
    return (
      <div>
        You are logged in, {this.props.currentUser.first_name}
        <a onClick={() => this.props.logout()}>Logout</a>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.ui.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
