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

export {
    setInfo,
    getInfo,
    putInfo
}