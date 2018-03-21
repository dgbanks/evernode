import * as NodeUtil from '../utils/node_api_util';
import { receiveLink, receiveLinkErrors } from './link_actions';

export const RECEIVE_NODE = 'RECEIVE_NODE';
export const RECEIVE_CANVAS_NODES = 'RECEIVE_CANVAS_NODES';
export const RECEIVE_NODE_ERRORS = 'RECEIVE_NODE_ERRORS';
export const REMOVE_NODE = 'REMOVE_NODE';


export const receiveNode = node => ({
  type: RECEIVE_NODE,
  node
});

export const receiveAllNodes = nodes => ({
  type: RECEIVE_CANVAS_NODES,
  nodes
});

export const receiveNodeErrors = errors => ({
  type: RECEIVE_NODE_ERRORS,
  errors
});

export const removeNode = node => ({
  type: REMOVE_NODE,
  node
});

export const createNode = node => dispatch => (
  NodeUtil.postNode(node)
    .then(newNode => {
      console.log('newNode', newNode.data.links_to[0]);
      dispatch(receiveNode(newNode));
      dispatch(receiveLink(newNode.data.links_to[0]));
    })
    .catch(errors => dispatch(receiveNodeErrors(errors)))
);

export const fetchCanvasNodes = canvasId => dispatch => (
  NodeUtil.getNodes(canvasId)
    .then(nodes => dispatch(receiveAllNodes(nodes)))
    .catch(errors => dispatch(receiveNodeErrors(errors)))
);

export const fetchNode = nodeId => dispatch => (
  NodeUtil.getNode(nodeId)
    .then(node => dispatch(receiveNode(node)))
    .catch(errors => dispatch(receiveNodeErrors(errors)))
);

export const editNode = node => dispatch => (
  NodeUtil.patchNode(node)
    .then(editedNode => dispatch(receiveNode(editedNode)))
    .catch(errors => dispatch(receiveNodeErrors(errors)))
);

export const deleteNode = nodeId => dispatch => (
  NodeUtil.deleteNode(nodeId)
    .then(node => dispatch(removeNode(node)))
    .catch(errors => dispatch(receiveNodeErrors(errors)))
);
