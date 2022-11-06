import { IRegisterData } from '../interfaces/AuthData';
export default class Auth {
  BASE_URL: string;

  constructor() {
    // this.BASE_URL = 'http://localhost:3000';
    this.BASE_URL = 'https://api.reportr.solomonbarayev.dev';
  }

  private _customFetch(url: string, headers: Object) {
    return fetch(url, headers).then((res) =>
      res.ok ? res.json() : Promise.reject(res.statusText)
    );
  }

  register(data: IRegisterData) {
    return this._customFetch(`${this.BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  login(email: string, password: string) {
    return this._customFetch(`${this.BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  }

  checkToken = (token: string) => {
    return this._customFetch(`${this.BASE_URL}/employees/myprofile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  };
}
