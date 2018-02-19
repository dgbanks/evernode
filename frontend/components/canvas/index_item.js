import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { editCanvas, deleteCanvas } from '../../actions/canvas_actions';

class IndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rename: false,
      delete: false,
      newTitle: props.canvas.title
    };
  }

  updateNewTitle() {
    return e => {
      e.preventDefault();
      this.setState({ newTitle: e.target.value });
    };
  }

  handleRename() {
    this.props.editCanvas({
      id: this.props.canvas.id,
      title: this.state.newTitle
    }).then(action => this.setState({
      rename: false,
      newTitle: action.canvas.data.title
    }));
  }

  render() {
    const canvas = this.props.canvas;
    console.log(this.state);

    return (
      <div className='index-item'>
        <Link
          to={`/canvases/${canvas.id}`}
          style={{ textDecoration: 'none', color: 'black' }}>
          <h1>{canvas.title}</h1>
        </Link>
        {
          this.state.rename ?
          <div className='index-options-container rename'>
            <input value={this.state.newTitle} onChange={this.updateNewTitle()}/>
            {
              this.state.newTitle === canvas.title ||
              this.state.newTitle === '' ?
              <button onClick={
                () => this.setState({
                  rename: false,
                  newTitle: canvas.title
                })
              }>Cancel</button> :
              <button
                className='save'
                onClick={() => this.handleRename(canvas)}
              >
                Save New Title
              </button>
            }
          </div> :
          this.state.delete ?
          <div className='index-options-container'>
            <button onClick={() => this.setState({delete: false})}>
              Cancel
            </button>
            <button onClick={() => this.props.deleteCanvas(canvas.id)}>
              Confirm Delete
            </button>
          </div> :
          <div className='index-options-container'>
            <button onClick={() => this.setState({rename: true})}>
              Rename
            </button>
            <button onClick={() => this.setState({delete: true})}>
              Delete
            </button>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  canvas: ownProps.canvas
});

const mapDispatchToProps = dispatch => ({
  editCanvas: canvas => dispatch(editCanvas(canvas)),
  deleteCanvas: canvasId => dispatch(deleteCanvas(canvasId))
});

export default connect(null, mapDispatchToProps)(IndexItem);
