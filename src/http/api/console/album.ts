import axios from '../../axios';

function addAlbum(body) {
    return axios.post(`/api/album/console`, body);
}

function albumToken() {
    return axios.get(`/api/album/console/token`);
}

function getAlbum(id) {
    return axios.get(`/api/album/console/${id}`);
}

function deleteAlbum(id) {
    return axios.delete(`/api/album/console/${id}`);
}

function editAlbum(body) {
    return axios.put(`/api/album/console`, body)
}

export {
    addAlbum,
    albumToken,
    getAlbum,
    deleteAlbum,
    editAlbum
}