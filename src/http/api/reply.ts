import axios from '../axios';

// 评论
function reply(targetId, content) {
    return axios.post(`/api/commont/${targetId}/replices`, {content})
}
// 获取评论
function getReplices(targetId) {
    return axios.get(`/api/commont/${targetId}/replices`)
}
// 回复
function comment( commentId, content) {
    return axios.post(`/api/reply/replices/${commentId}`, {content})
}

export {
    reply,
    getReplices,
    comment
}