class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;

    }

    _checkError(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`${res.status}: ${res.statusText}`)
    }

    getUser() {
        const request = this._baseUrl + `/users/me`;
        return fetch(request, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._checkError)
    }

    getInitialCards() {
        const request = this._baseUrl + `/cards`;
        return fetch(request, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._checkError)
    }

    getAppInfo() {
        return Promise.all([this.getInitialCards(), this.getUser()]);
    }

    setAvatar(data) {
        const request = this._baseUrl + `/users/me/avatar`;
        return fetch(request, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar,
            })
        })
            .then(this._checkError)
    }

    setUser(data) {
        const request = this._baseUrl + `/users/me`;
        return fetch(request, {
            method: `PATCH`,
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(this._checkError)
    }

    addNewCard(data) {
        const request = this._baseUrl + `/cards`;
        return fetch(request, {
            method: `POST`,
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this._checkError)
    }

    deleteCard(cardId) {
        const request = this._baseUrl + `/cards/${cardId}`;
        return fetch(request, {
            method: `DELETE`,
            headers: this._headers
        })
            .then(this._checkError)
    }

    addLike(cardId) {
        const request = this._baseUrl + `/cards/likes/${cardId}`;
        return fetch(request, {
            method: `PUT`,
            headers: this._headers
        })
            .then(this._checkError)
    }

    removeLike(cardId) {
        const request = this._baseUrl + `/cards/likes/${cardId}`;
        return fetch(request, {
            method: `DELETE`,
            headers: this._headers
        })
            .then(this._checkError)
    }
}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
    headers: {
        authorization: '18bfdc4b-0532-41bf-ac65-1c418f0be0ca',
        'Content-Type': 'application/json',
    }
});