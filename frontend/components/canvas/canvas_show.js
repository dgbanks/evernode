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
    this.handleForm = this.handleForm.bind(this);
  }

  componentWillMount() {
    console.log('CanvasShow.componentDidMount');
    this.props.fetchCanvas(this.props.match.params.canvasId);
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
    console.log(e);
    // problem: multiple nodes with 'selected' class!
    this.setState({ selected: this.state.selected === e ? null : e });
  }

  handleForm(node) {
    console.log('handleForm');

    if (typeof(node) === 'number') {
      this.props.deleteNode(node)
        .then(() => this.props.fetchCanvas(this.props.canvas.id))
        .then(() => this.unmountEditor());
    } else if (node.id) {
      this.props.editNode(node)
        .then(() => this.props.fetchCanvas(this.props.canvas.id))
        .then(() => this.unmountEditor());
    } else {
      this.props.createNode(node)
        .then(() => this.props.fetchCanvas(this.props.canvas.id))
        .then(() => this.unmountEditor());
    }
  }

  unmountEditor() {
    console.log('unmountEditor');
    this.setState({ selected: null, readOnly: true });
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
          <div className='canvas-flex' style={{
            height: height,
            width: width,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          {this.displayHeader()}
          <Graph
            nodes={this.props.canvas.nodes}
            links={this.props.canvas.links}
            selected={this.state.selected}
            displayHeader={this.displayHeader}
            handleNodeClick={this.handleNodeClick}
          />
          </div>
          {
            this.state.selected ?
            <div style={{
              display:'flex', alignItems:'center', width: '40%'
            }}>
              <div style={{display:'flex', flexDirection:'column'}}>
                <div style={{
                  backgroundColor:'white', height: '50px', width:'25px'
                }} onClick={this.unmountEditor}>
                  <i style={{fontSize:'50px'}} className="fas fa-angle-right"></i>
                </div>
              </div>
              <Editor
                node={this.state.selected}
                canvasId={this.props.canvas.id}
                unmount={this.unmountEditor}
                handleForm={this.handleForm}
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
  canvas: state.entities.canvases[ownProps.match.params.canvasId]
});

const mapDispatchToProps = dispatch => ({
  fetchCanvas: canvasId => dispatch(fetchCanvas(canvasId)),
  createNode: node => dispatch(createNode(node)),
  editNode: node => dispatch(editNode(node)),
  deleteNode: nodeId => dispatch(deleteNode(nodeId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CanvasShow));
