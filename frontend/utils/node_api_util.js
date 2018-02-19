import axios from 'axios';

export const postNode = node => (
  axios.post('http://localhost:3000/api/nodes', { node })
);

export const getNode = nodeId => (
  axios.get(`http://localhost:3000/api/nodes/${nodeId}`)
);

export const getNodes = canvasId => (
  axios.get('http://localhost:3000/api/nodes', { canvasId })
);

export const patchNode = node => (
  axios.patch(`http://localhost:3000/api/nodes/${node.id}`, {node})
);

export const deleteNode = nodeId => (
  axios.delete(`http://localhost:3000/api/nodes/${nodeId}`)
);
