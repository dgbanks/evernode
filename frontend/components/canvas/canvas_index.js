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
    this.state = { showForm: false, newTitle: '' };
  }

  componentWillMount() {
    this.props.fetchUserCanvases(this.props.currentUser.id);
  }

  handleForm(bool) {
    const title = this.state.newTitle || 'New Canvas';
    this.props.createCanvas({ title: title })
      .then(() => this.setState({ showForm: false, newTitle: '' }));
  }

  updateNewTitle() {
    return e => {
      e.preventDefault();
      this.setState({ newTitle: e.target.value });
    };
  }

  render() {
    const numberOfCanvases = this.props.currentUser.canvases.length;
    console.log(this.state);
    return (
      <div>
        <div className='index-header'>
          {
            numberOfCanvases ?
            <h1>{numberOfCanvases} Open { numberOfCanvases === 1 ? 'Canvas' : 'Canvases'} </h1> :
            <h1>You have no canvases</h1>
          }
          {
            this.state.showForm ?
            <div className='canvas-form'>
              <input placeholder='New Canvas' onChange={this.updateNewTitle()}/>
              <button onClick={() => this.setState({ showForm: false, newTitle: '' })}>Cancel</button>
              <button onClick={() => this.handleForm(true)}>Save</button>
            </div> :
            <button onClick={() => this.setState({ showForm: true })}>
              New Canvas
            </button>
          }
        </div>

        <div className='index'>
          {
            numberOfCanvases ?
            this.props.canvases.map(canvas => (
              <div key={canvas.id}>
                {canvas.title}
              </div>
            )) : <div></div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentUser: ownProps.currentUser,
  canvases: Object.keys(state.entities.canvases).map(id => state.entities.canvases[id])
});

const mapDispatchToProps = dispatch => ({
  createCanvas: canvas => dispatch(createCanvas(canvas)),
  fetchCanvas: canvasId => dispatch(fetchCanvas(canvasId)),
  fetchUserCanvases: ownerId => dispatch(fetchUserCanvases(ownerId)),
  editCanvas: canvas => dispatch(editCanvas(canvas)),
  deleteCanvas: canvasId => dispatch(deleteCanvas(canvasId))
});

export default connect(mapStateToProps, mapDispatchToProps)(CanvasIndex);
