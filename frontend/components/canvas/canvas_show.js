import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import {d3action} from '../../actions/d3_actions';
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
  }

  componentDidMount() {
    console.log('CanvasShow.componentDidMount');
    this.props.fetchCanvas(this.props.match.params.canvasId);
      // .then(action => d3action(action, this.handleNodeClick));
  }

  componentDidUpdate() {
    console.log('CanvasShow.componentDidUpdate');
    // this.props.fetchCanvas(this.props.match.params.canvasId)
    //   .then(action => d3action(action, this.handleNodeClick));
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

  unmountEditor(action) {
    this.setState({ selected: null });
    // this.props.fetchCanvas(this.props.canvas.id);
    console.log(d3.select(`#node${action.node.data.id}`));
  }

  render() {
    console.log('render');
    console.log(this.state);
    if (!this.props.canvas) {
      return (
        <div style={{backgroundColor:'black'}} className='spinner-div'>
        </div>
      );
    } else {
      return (
        <div className='canvas'>
          <Graph
            nodes={this.props.canvas.nodes}
            selected={this.state.selected}
            displayHeader={this.displayHeader}
            handleNodeClick={this.handleNodeClick}
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
              />
            </div> :
            <div/>
          }
        </div>
      );

      // return (
      //   <div className='canvas'>
      //     {this.displayHeader()}
      //     <div className='canvas-body'>
      //       <Graph
      //         nodes={this.props.canvas.nodes}
      //         selected={this.state.selected}
      //         displayHeader={this.displayHeader}
      //         handleNodeClick={this.handleNodeClick}
      //       />
      //       {
      //         this.state.selected ?
      //         <div style={{
      //           display:'flex', alignItems:'center', width: '40%'
      //         }}>
      //           <div style={{
      //             backgroundColor:'white',height: '50px',width:'25px'
      //           }} onClick={this.unmountEditor}>
      //             <i style={{fontSize:'50px'}} className="fas fa-angle-right"></i>
      //           </div>
      //           <Editor
      //             node={this.state.selected}
      //             unmount={this.unmountEditor}
      //             editNode={this.props.editNode}
      //           />
      //         </div> :
      //         <div/>
      //       }
      //     </div>
      //   </div>
      // );

      // return (
      //   <div style={{
      //     display:'flex',
      //     alignItems:'center',
      //     backgroundColor: 'black'
      //   }}>
      //     <div className='canvas' id='canvas'>
      //       {this.displayHeader()}
      //     </div>
      //     <div style={{
      //       backgroundColor:'white',
      //       height: '50px',
      //       width:'25px'
      //     }} onClick={this.unmountEditor}>
      //       <i style={{fontSize:'50px'}} className="fas fa-angle-right"></i>
      //     </div>
      //     {
      //       this.state.selected ?
      //       <Editor
      //         node={this.state.selected}
      //         unmount={this.unmountEditor}
      //         createNode={this.props.createNode}
      //         editNode={this.props.editNode}
      //         deleteNode={this.props.deleteNode} /> :
      //       <div/>
      //     }
      //   </div>
      // );
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
