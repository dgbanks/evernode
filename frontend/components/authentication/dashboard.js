import React from 'react';
import { connect } from 'react-redux';

class Dashboard extends React.Component {
  render() {
    console.log('props', this.props);
    return (
      <div>
        You are logged in, {this.props.currentUser.first_name}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.ui.session.currentUser
});

export default connect(mapStateToProps, null)(Dashboard);
