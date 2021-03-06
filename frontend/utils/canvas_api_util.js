import axios from 'axios';

export const postCanvas = canvas => (
  axios.post('http://localhost:3000/api/canvases', { canvas })
);

export const getCanvas = canvasId => (
  axios.get(`http://localhost:3000/api/canvases/${canvasId}`)
);

export const getCanvases = ownerId => (
  axios.get('http://localhost:3000/api/canvases', { ownerId })
);

export const patchCanvas = canvas => (
  axios.patch(`http://localhost:3000/api/canvases/${canvas.id}`, {canvas})
);

export const deleteCanvas = canvasId => (
  axios.delete(`http://localhost:3000/api/canvases/${canvasId}`)
);
