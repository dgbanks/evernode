import axios from 'axios';

export const authenticateUser = user => (
  axios.post('http://localhost:3000/api/users/auth',
  {user})
);
