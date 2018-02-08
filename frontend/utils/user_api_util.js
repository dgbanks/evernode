import axios from 'axios';

export const authenticateUser = user => (
  axios.post('http://localhost:3000/api/users/auth', { user })
);

export const destroySession = () => (
  axios.delete('http://localhost:3000/api/session')
);
