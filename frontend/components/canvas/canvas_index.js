import React from 'react';
import { connect } from 'react-redux';

import { createCanvas, fetchUserCanvases } from '../../actions/canvas_actions';
import IndexItem from './index_item';

class CanvasIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showForm: false, newTitle: '', };
  }

  componentWillMount() {
    this.props.fetchUserCanvases(this.props.currentUser.id);
  }

  handleForm() {
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
    const numberOfCanvases = this.props.canvases.length;
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
          {this.props.canvases.map(canvas => <IndexItem key={canvas.id} canvas={canvas} />)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentUser: ownProps.currentUser,
  canvases: Object.keys(state.entities.canvases)
    .map(id => state.entities.canvases[id])
});

const mapDispatchToProps = dispatch => ({
  createCanvas: canvas => dispatch(createCanvas(canvas)),
  fetchUserCanvases: ownerId => dispatch(fetchUserCanvases(ownerId))
});

export default connect(mapStateToProps, mapDispatchToProps)(CanvasIndex);
