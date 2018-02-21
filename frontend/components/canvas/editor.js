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
    return (
      <div className='editor'>
        <ReactQuill
          value={this.props.node.title}
          style={{height:'100vh', backgroundColor:'white'}} />
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
