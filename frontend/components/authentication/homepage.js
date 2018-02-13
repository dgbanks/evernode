import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Splash from './newSplash';
import Dashboard from './dashboard';

class Home extends React.Component {
  constructor(props) {
    super(props);
    console.log('homepage props:', props.auth);
  }

  render() {
    if (this.props.currentUser) {
      return <Dashboard currentUser={this.props.currentUser} />;
    } else {
      return <Splash auth={this.props.auth} />;
    }
  }
}

const mapStateToProps = state => ({
  currentUser: state.ui.session.currentUser
});

export default withRouter(connect(mapStateToProps, null)(Home));
