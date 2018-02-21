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
          <div className='editor-header'>

          </div>
          <input
          placeholder='New Node'
          onChange={e => this.setState({ title: e.target.value })}
          />
        </div>
        <div className='rq-div'>
          <ReactQuill
            onChange={delta => this.setState({ body: delta })}
          />
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
