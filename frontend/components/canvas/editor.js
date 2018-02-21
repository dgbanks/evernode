import React from 'react';
import ReactQuill from 'react-quill';
import { connect } from 'react-redux';

import { createNode, editNode, deleteNode } from '../../actions/node_actions';

class Editor extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('editorDidMount', this.props.node);
  }

  render() {
    console.log('ReactQuill', ReactQuill);
    return (
      <div className='editor'>
        <div style={{height:'15%', width: '100%', border:"2px solid black"}}>

        </div>
        <div className='rq-div'>
          <ReactQuill
            style={{height:'92.5%'}}
            value={this.props.node.title}>
          </ReactQuill>
        </div>
        <div className='editor-footer'>
          <button>Save Changes</button>
          <button>Discard Changes</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  node: ownProps.node
});

const mapDispatchToProps = dispatch => ({
  createNode: node => dispatch(createNode(node)),
  editNode: node => dispatch(editNode(node)),
  deleteNode: nodeId => dispatch(deleteNode(nodeId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
