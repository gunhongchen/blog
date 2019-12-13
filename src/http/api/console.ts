import axios from '../axios';

function login(data) {
    return axios.post('/api/auth/login', data)
}

export {
    login
}