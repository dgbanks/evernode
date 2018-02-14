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
