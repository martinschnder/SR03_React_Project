class APIService {
    getAllChannels(id) {
        return fetch('http://localhost:8080/allchannels/' + id)
            .then(res => res.json());
    }

    getMyChannels(id) {
        return fetch('http://localhost:8080/mychannels/' + id)
            .then(res => res.json());
    }

    getUser(id) {
        return fetch('http://localhost:8080/userinformations/' + id)
            .then(res => res.json());
    }

    getUsers() {
        return fetch('http://localhost:8080/getusers')
            .then(res => res.json());
    }

    getGuests(id) {
        return fetch('http://localhost:8080/guests/' + id)
            .then(res => res.json());
    }

    getNoneGuests(id) {
        return fetch('http://localhost:8080/noneguest/' + id)
            .then(res => res.json());
    }
}

export default new APIService();

