import decode from "jwt-decode";
export default class AuthService {
  constructor(domain) {
    this.domain = domain || "http://165.227.198.233:3001";
    this.fetch = this.fetch.bind(this);
    this.login = this.login.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  login(username, password) {
    //console.log("Attempting Login to ", this.domain, username, password);
    return this.fetch(`${this.domain}/login`, {
      method: "POST",
      body: JSON.stringify({
        username,
        password
      })
    }).then(res => {
      this.setToken(res.token);
      return Promise.resolve(res);
    });
  }

  register(username, password, firstName, lastName, email) {
    //console.log("Attempting to register ", this.domain, username, password);
    return this.fetch(`${this.domain}/register`, {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
        firstName,
        lastName,
        email,
      })
    }).then(res => {
        this.setToken(res.token);
        return Promise.resolve(res);
    });
  }

  updateFields(firstName, lastName, email, username) {
    if (typeof firstName === 'undefined') {
      firstName = '';
    }
    if (typeof lastName === 'undefined') {
      lastName = '';
    }
    if (typeof email === 'undefined') {
      email = '';
    }

    return this.fetch(`${this.domain}/updateFields`, {
      method: 'POST',
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        username,
      })
    })
    .then(res => {
      this.setToken(res.token);
      return Promise.resolve(res);
    })
    .then(() => console.log(this.getToken()));
  }

  updatePassword(password, username) {
    return this.fetch(`${this.domain}/updatePassword`, {
      method: 'POST',
      body: JSON.stringify({
        password,
        username,
      })
    })
    .then(res => alert(res.message))
    .then(res => console.log(res));
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      {
        const decoded = decode(token);
        if (decoded.exp < Date.now() / 1000) {
          return true;
        } else {
          return false;
        }
      }
    } catch (err) {
      return false;
    }
  }

  setToken(idToken) {
    localStorage.setItem("id_token", idToken);
  }

  getToken() {
    return localStorage.getItem("id_token");
  }

  logout() {
    localStorage.removeItem("id_token");
  }

  getProfile() {
    return decode(this.getToken());
  }

  fetch(url, options) {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };

    if (this.loggedIn()) {
      headers["Authorization"] = "Bearer " + this.getToken();
    }

    return fetch(url, {
      headers,
      ...options
    })
      .then(this._checkStatus)
      .then(response => response.json());
  }

  _checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
}
