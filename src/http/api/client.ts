import axios from '../axios';

function getTags() {
    return axios.get('/api/article/tags')
}

export {
    getTags
}