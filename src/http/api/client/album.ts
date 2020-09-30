import axios from '../../axios';

function getCarousel() {
    return axios.get(`/api/album/carousel`);
}

function getAlbum(parentId) {
    return axios.get(`/api/album/${parentId}`)
}

export {
    getCarousel,
    getAlbum
}