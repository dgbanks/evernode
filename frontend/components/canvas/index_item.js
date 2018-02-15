import React from 'react';
import { connect } from 'react-redux';
import { editCanvas, deleteCanvas } from '../../actions/canvas_actions';

class IndexItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = { displayOptions: false};
  }

  displayOptions() {
    if (this.state.displayOptions) {
      let keyframe = `@keyframes hideOptions {
        from { width: 300px }
        to { width: 100px }
      }`;
      document.styleSheets[0].insertRule(keyframe);
    } else {
      let keyframe = `@keyframes displayOptions {
        from { width: 100px }
        to { width: 300px }
      }`;
      document.styleSheets[0].insertRule(keyframe);
    }
  }

  render() {
    const canvas = this.props.canvas;
    const iconStyles = {
      fontSize: '20px'
    };
    return (
      <div className='index-item'>
        <h1>{canvas.title}</h1>
        <div className='index-options'>
          <i style={iconStyles}className="fas fa-angle-left"></i>
          Options
        </div>
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
