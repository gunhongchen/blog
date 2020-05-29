import axios from '../../axios';
 

function getTags () {
    return axios.get(`/api/tag`);
}

export {
    getTags
}