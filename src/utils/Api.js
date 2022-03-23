class Api {
    constructor({address, headers}) {

        this._address = address
        this._headers = headers
    }


    _handleResponse = (res) => {
        if (res.ok) {
            return res.json()
        }

        return Promise.reject(`Ошибка: ${res.status}`)
    }


    getInitialCards() {

        return fetch(`${this._address}/cards`, {

            headers: this._headers
        })
            .then((response) => this._handleResponse(response))
    }


    getUserInfo() {
        return fetch(`${this._address}/users/me`, {

            headers: this._headers
        })
            .then((response) => this._handleResponse(response))
    }

    editProfile(userData) {

        return fetch(`${this._address}/users/me`, {

            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({

                name: userData.name,
                about: userData.about,
            })
        })
            .then((response) => this._handleResponse(response))
    }


    addCard(cardObject) {

        return fetch(`${this._address}/cards`, {

            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({

                name: cardObject.name,
                link: cardObject.link
            })
        })
            .then((response) => this._handleResponse(response))
    }


    removeCard(id) {

        return fetch(`${this._address}/cards/${id}`, {

            method: 'DELETE',
            headers: this._headers
        })
            .then((response) => this._handleResponse(response))
    }

    updateAvatar(userData) {
        console.log (userData)
        return fetch(`${this._address}/users/me/avatar`, {

            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({

                avatar: userData,

            })
        })
            .then((response) => this._handleResponse(response))

    }
    changeLikeCardStatus(id, isLiked) {
        return fetch(`${this._address}/cards/${id}/likes`, {
            method: isLiked ? 'PUT' : 'DELETE',
            headers: this._headers
        })
            .then(this._handleResponse)
    }
}

    const api = new Api({

    address: 'https://mesto.nomoreparties.co/v1/cohort-35',
    headers: {
        authorization: '5e183b19-cf6d-4424-b043-3b49b544e6cf',
        'Content-Type': 'application/json'
    }
})
export default api;