class authApi {
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
    }

    _checkError(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`${res.status}: ${res.statusText}`)
    }

    register(email, password) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then((res) => this._checkError(res))
    }

    auth(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then((res) => this._checkError(res))
    }

    checkToken(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then((res) => this._checkError(res))
    }
}

const auth = new authApi ('https://auth.nomoreparties.co');
export default auth;