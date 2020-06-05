import axios from '../../axios';

function getCarousel() {
    return axios.get(`/api/album/carousel`);
}

function getAlbum(id) {
    return axios.get(`/api/album/${id}`)
}

export {
    getCarousel,
    getAlbum
}