import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { d3action } from '../../actions/d3_actions';
import { fetchCanvas } from '../../actions/canvas_actions';

class CanvasShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchCanvas(this.props.match.params.canvasId)
      .then(action => d3action(action));
  }

  navbar() {
    return(
      <div className='canvas-nav'>
        <div className='x' onClick={() => this.props.history.goBack()}>
          <i className="fas fa-times"></i>
        </div>
        <div className='canvas-title'>
          <h1>Canvas: {this.props.canvas.title}</h1>
        </div>
      </div>
    );
  }

  render() {
    console.log('render');
    if (!this.props.canvas) {
      return (
        <div style={{backgroundColor:'black'}} className='spinner-div'>
          <i className="fas fa-spinner fa-pulse"></i>
        </div>
      );
    } else {
      return (
        <div className='canvas' id='canvas'>
          {this.navbar()}

        </div>
      );
    }

  }
}

const mapStateToProps = (state, ownProps) => ({
  canvas: state.entities.canvases[ownProps.match.params.canvasId]
});

const mapDispatchToProps = dispatch => ({
  fetchCanvas: canvasId => dispatch(fetchCanvas(canvasId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CanvasShow));
