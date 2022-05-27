const REST_API = 'http://localhost:8080';

class APIService {
    getAllChannels() {
        return fetch(REST_API + '/allchannels')
            .then(res => res.json());
    }

}

export default new APIService();

