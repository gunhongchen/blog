import axios from '../../axios';

function addAlbum(params) {
    return axios.post(`/api/album`, params);
}

function albumToken() {
    return axios.get(`/api/album/token`)
}

export {
    addAlbum,
    albumToken
}