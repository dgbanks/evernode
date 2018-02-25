import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Graph from './graph';
import Editor from './editor';
import { fetchCanvas } from '../../actions/canvas_actions';
import { createNode, editNode, deleteNode } from '../../actions/node_actions';

class CanvasShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: null };
    this.displayHeader = this.displayHeader.bind(this);
    this.unmountEditor = this.unmountEditor.bind(this);
    this.handleNodeClick = this.handleNodeClick.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    console.log('CanvasShow.componentDidMount');
    this.props.fetchCanvas(this.props.match.params.canvasId);
  }

  componentDidUpdate() {
    console.log('CanvasShow.componentDidUpdate');
  }

  displayHeader() {
    return (
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

  handleNodeClick(e) {
    this.setState({ selected: this.state.selected === e ? null : e });
  }

  handleSave(node) {
    this.props.editNode(node).then(
      action => {
        this.props.fetchCanvas(this.props.canvas.id);
        this.unmountEditor();
      }
    );
  }

  unmountEditor() {
    this.setState({ selected: null });
  }

  render() {
    let height = '100%', width = '100%';
    if (this.state.selected) {
      width = '60%';
    }

    if (!this.props.canvas) {
      return (
        <div style={{backgroundColor:'black'}}></div>
      );
    } else {
      return (
        <div className='canvas'>
          <Graph
            nodes={this.props.canvas.nodes}
            selected={this.state.selected}
            displayHeader={this.displayHeader}
            handleNodeClick={this.handleNodeClick}
            size={[width, height]}
          />

          {
            this.state.selected ?
            <div style={{
              display:'flex', alignItems:'center', width: '40%'
            }}>
              <div style={{
                backgroundColor:'white',height: '50px',width:'25px'
              }} onClick={this.unmountEditor}>
                <i style={{fontSize:'50px'}} className="fas fa-angle-right"></i>
              </div>
              <Editor
                node={this.state.selected}
                unmount={this.unmountEditor}
                editNode={this.props.editNode}
                handleSave={this.handleSave}
              />
            </div> :
            <div/>
          }
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  canvas: state.entities.canvases[ownProps.match.params.canvasId],
  nodes: state.entities.nodes,
  // links: state.entities.links
});

const mapDispatchToProps = dispatch => ({
  fetchCanvas: canvasId => dispatch(fetchCanvas(canvasId)),
  createNode: node => dispatch(createNode(node)),
  editNode: node => dispatch(editNode(node)),
  deleteNode: nodeId => dispatch(deleteNode(nodeId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CanvasShow));
