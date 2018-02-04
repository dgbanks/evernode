import auth0 from 'auth0-js';

export default class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({

      responseType: 'token id_token',
      scope: 'openid'
    });
  }

  login() {
    this.auth0.authorize();
  }
}