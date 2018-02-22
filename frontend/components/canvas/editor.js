import React from 'react';
import ReactQuill from 'react-quill';
import { connect } from 'react-redux';
import { createNode, editNode, deleteNode } from '../../actions/node_actions';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullscreen: false,
      node: { id: null, title: '', body: '', source_id: null }
    };
    this.handleSave = this.handleSave.bind(this);
  }

  componentWillReceiveProps(newProps) {
    console.log('componentWillReceiveProps EDITOR', newProps);
  }

  componentWillMount() {
    console.log('editorDidMount', this.props.node);
    if (this.props.node) {
      this.setState({ node: {
        id: this.props.node.id,
        title: this.props.node.title,
        body: this.props.node.body,
        source_id: this.props.node.id
      }});
    }
  }

  handleSave() {
    this.props.editNode(this.state.node).then(
      action => this.props.unmount(action)
    );
  }

  render() {
    console.log('render', this.state);
    return (
      <div className='editor'>
        <div className='editor-header'>
          <div>
            <input
              placeholder='New Node'
              value={this.state.node.title}
              onChange={e => this.setState({
                node: Object.assign({}, this.state.node, { title: e.target.value })
              })}
            />
            <div onClick={
              () => this.setState({ fullscreen: !this.state.fullscreen})
            }>
              <i className="fas fa-expand"></i>
            </div>
          </div>
        </div>
        <div className='rq-div'>
          <ReactQuill
            placeholder='Optional'
            defaultValue={this.state.node.body}
            onChange={(content, delta, source, editor) => this.setState({
              node: Object.assign({}, this.state.node, { body: editor.getHTML() })
            })}
          />
        </div>
        <div className='editor-footer'>
          <button onClick={this.handleSave}>Save Changes</button>
          <button onClick={this.props.unmount}>Discard Changes</button>
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
