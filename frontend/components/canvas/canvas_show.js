import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

class CanvasShow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>HELLO</h1>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  canvas: state.entities.canvases[ownProps.match.params.canvasId]
});

const mapDispatchToProps = dispatch => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CanvasShow));
