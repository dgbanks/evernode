import React from 'react';
import { connect } from 'react-redux';

import {
  createCanvas,
  fetchCanvas,
  fetchUserCanvases,
  editCanvas,
  deleteCanvas
} from '../../actions/canvas_actions';

class CanvasIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }

  render() {
    if (this.props.currentUser.canvases[0]) {
      return (
        <div>
          <h1>this is the canvas index</h1>
        </div>
      );
    } else {
      return (
        <div>
          <h1>You have no canvases</h1>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentUser: ownProps.currentUser
});

const mapDispatchToProps = dispatch => ({
  createCanvas: canvas => dispatch(createCanvas(canvas)),
  fetchCanvas: canvasId => dispatch(fetchCanvas(canvasId)),
  fetchUserCanvases: ownerId => dispatch(fetchUserCanvases(ownerId)),
  editCanvas: canvas => dispatch(editCanvas(canvas)),
  deleteCanvas: canvasId => dispatch(deleteCanvas(canvasId))
});

export default connect(mapStateToProps, mapDispatchToProps)(CanvasIndex);
