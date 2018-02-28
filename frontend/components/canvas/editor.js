import React from 'react';
import ReactQuill from 'react-quill';
import { connect } from 'react-redux';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullscreen: false,
      readOnly: true,
      node: { id: null, title: '', body: '', source_id: null }
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.newNode = this.newNode.bind(this);
  }

  componentWillMount() {
    if (this.props.node) {
      this.setState({ node: {
        id: this.props.node.id,
        title: this.props.node.title,
        body: this.props.node.body,
        source_id: this.props.node.id
      }});
    }
  }

  newNode() {
    this.setState({
      node: Object.assign(
        {}, this.state.node, { id: null, title: '', body: '' }
      )
    });
  }

  handleSave() {
    if (this.state.node.title) {
      this.setState({ readOnly: true });
      this.props.handleForm(this.state.node);
    }
  }

  handleDelete() {
    this.props.handleForm(this.state.node.id);
  }

  render() {
    console.log('state:', this.state);
    console.log('there is a title', Boolean(this.state.node.title));
    const disabled = !this.state.node.title ||
      (this.state.node.title === this.props.node.title &&
      this.state.node.body === this.props.node.body);

    return (
      <div className='editor'>
        <div className='editor-header'>
          <div>
            <input
              onClick={() => this.setState({ readOnly: false })}
              readOnly={this.state.readOnly}
              placeholder='New Node'
              value={this.state.node.title}
              onChange={e => this.setState({
                readOnly: false,
                node: Object.assign({}, this.state.node, { title: e.target.value })
              })}
            />
            <div onClick={
              () => this.setState({ fullscreen: !this.state.fullscreen })
            }>
              <i className="fas fa-expand"></i>
            </div>
          </div>
        </div>
        <div className='rq-div'>
          <ReactQuill
            autoFocus
            onFocus={() => this.setState({ readOnly: false })}
            readOnly={this.state.readOnly}
            placeholder='Optional'
            defaultValue={this.state.node.body}
            value={this.state.node.body}
            onChange={(content, delta, source, editor) => this.setState({
              readOnly: false,
              node: Object.assign({}, this.state.node, { body: editor.getHTML() })
            })}
          />
        </div>
        {
          this.state.readOnly ?
          <div className='editor-footer'>
            <button onClick={this.newNode}>Attach New Node</button>
            <button onClick={this.handleDelete}>Delete This Node</button>
          </div> :
          <div className='editor-footer'>
            <button onClick={this.handleSave} disabled={disabled}
            style={disabled ? {backgroundColor:'gray',color:'lightgray'} : {}}>
              Save Changes
            </button>
            <button onClick={this.props.unmount}>Discard Changes</button>
          </div>
        }
      </div>
    );
  }
}

export default Editor;
