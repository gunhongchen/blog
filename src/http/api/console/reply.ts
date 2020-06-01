import axios from '../../axios';

// 获取评论和回复
function getComments(targetId) {
    return axios.get(`/api/console/commont/${targetId}/replices`)
}


export {
    getComments
}