import axios from '../../axios';

// 评论
function comment(targetId, content) {
    return axios.post(`/api/comment/${targetId}/replices`, { content })
}
// 获取评论
function getComments(targetId) {
    return axios.get(`/api/comment/${targetId}/replices`)
}
// 回复
function reply(targetId, content, targetReplyId?) {
    return axios.post(`/api/reply/replices/${targetId}`, { content, targetReplyId: targetReplyId || '' })
}
// 获取回复
function getReplices(targetId) {
    return axios.get(`/api/reply/replices/${targetId}`)
}

export {
    reply,
    getReplices,
    comment,
    getComments
}