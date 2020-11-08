import axios from '../../axios';

function addAlbum(body) {
    return axios.post(`/api/console/album`, body);
}

function albumToken() {
    return axios.get(`/api/console/album/token`);
}

function getAlbum(id) {
    return axios.get(`/api/console/album/${id}`);
}

function deleteAlbum(id, partentId) {
    return axios.delete(`/api/console/album/${id}?parentId=${partentId}`);
}

function editAlbum(body) {
    return axios.put(`/api/console/album`, body)
}

export {
    addAlbum,
    albumToken,
    getAlbum,
    deleteAlbum,
    editAlbum
}