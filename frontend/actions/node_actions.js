import * as NodeUtil from '../utils/node_api_util';

export const RECEIVE_NODE = 'RECEIVE_NODE';
export const RECEIVE_ALL_NODES = 'RECEIVE_ALL_NODES';
export const RECEIVE_NODE_ERRORS = 'RECEIVE_NODE_ERRORS';
export const REMOVE_NODE = 'REMOVE_NODE';

export const receiveNode = node => ({
  type: RECEIVE_NODE,
  node
});

export const receiveAllNodes = nodes => ({
  type: RECEIVE_ALL_NODES,
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
    .then(newNode => dispatch(receiveNode(newNode)))
    .catch(errors => dispatch(receiveNodeErrors(errors)))
);

export const fetchAllNodes = canvasId => dispatch => (
  NodeUtil.getNodes(canvasId)
    .then(nodes => dispatch(receiveAllNodes(nodes)))
    .catch(errors => dispatch(receiveNodeErrors(errors)))
);

export const fetchNode = nodeId => dispatch => (
  NodeUtil.getNode(nodeId)
    .then(node => dispatch(receiveNode(node)))
    .catch(errors => dispatch(receiveNodeErrors(errors)))
);
