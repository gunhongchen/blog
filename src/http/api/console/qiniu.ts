import axios from '../../axios';

function setInfo(body) {
    return axios.post('/api/console/qiniu', body);
}

function getInfo() {
    return axios.get('/api/console/qiniu');
}

function putInfo(body) {
    return axios.put('/api/console/qiniu', body)
}

function canuse() {
    return axios.get('/api/console/qiniu/canuse');
}

export {
    setInfo,
    getInfo,
    putInfo,
    canuse
}