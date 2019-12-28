import axios from '../axios';

function login(data) {
    return axios.post('/api/auth/login', data)
}

// 验证token
function testToken() {
    return axios.post('/api/auth/token')
}

export {
    login,
    testToken
}