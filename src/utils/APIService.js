class APIService {

    /* Retourne tous les channels où l'utilisateur associé à id 
    est soit propriétaire soit invité */
    getAllChannels(id) {
        return fetch('http://localhost:8080/allchannels/' + id)
            .then(res => res.json());
    }

    /* Retourne tous les channels où l'utilisateur associé à id
    est propriétaire */
    getMyChannels(id) {
        return fetch('http://localhost:8080/mychannels/' + id)
            .then(res => res.json());
    }

    /* Retourne les informations de l'utilisateur associé à id */
    getUser(id) {
        return fetch('http://localhost:8080/userinformations/' + id)
            .then(res => res.json());
    }

    /* Retourne les utilisateurs invités sur le channel associé à id */
    getGuests(id) {
        return fetch('http://localhost:8080/guests/' + id)
            .then(res => res.json());
    }

    /* Retourne tous les utilisateurs invités sur le channel associé à id
    (on ne retourne pas le propriétaire du channel) */
    getNoneGuests(id) {
        return fetch('http://localhost:8080/noneguest/' + id)
            .then(res => res.json());
    }
}

export default new APIService();

