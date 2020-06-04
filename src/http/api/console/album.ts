import axios from '../../axios';

function addAlbum(params) {
    return axios.post(`/api/album`, params);
}

function albumToken() {
    return axios.get(`/api/album/token`);
}

function getAlbum(id) {
    return axios.get(`/api/album/${id}`);
}

function deleteAlbum(id) {
    return axios.delete(`/api/album/${id}`);
}

export {
    addAlbum,
    albumToken,
    getAlbum,
    deleteAlbum
}