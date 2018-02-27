import axios from 'axios';

export const postLink = link => (
  axios.post('http://localhost:3000/api/links', { link })
);

export const getLink = linkId => (
  axios.get(`http://localhost:3000/api/links/${linkId}`)
);

export const getLinks = sourceId => (
  axios.get('http://localhost:3000/api/links', { sourceId })
);

export const patchLink = link => (
  axios.patch(`http://localhost:3000/api/links/${link.id}`, { link })
);

export const deleteLink = linkId => (
  axios.delete(`http://localhost:3000/api/links/${linkId}`)
);
