import axios from '../../axios';


// 获取评论
function getComments(targetId) {
    return axios.get(`/api/console/comment/${targetId}/replices`)
}

// 发布评论
function publishComments(targetId, commentId, isPublish) {
    return axios.put(`/api/console/comment/${targetId}/replices/${commentId}`, {publish: isPublish})
}
// 删除评论
function deleteComments(targetId, commentId) {
    return axios.delete(`/api/console/comment/${targetId}/replices/${commentId}`)
}

// 获取回复
function getReplices(targetId) {
    return axios.get(`/api/console/reply/replices/${targetId}`)
}

// 删除回复
function deleteReplices(commentId, replyId) {
    return axios.delete(`/api/console/reply/${commentId}/replices/${replyId}`)
}

// 发布回复
function publishReplices(replyId, isPublish) {
    return axios.put(`/api/console/reply/replices/${replyId}`, {publish: isPublish})
}


export {
    getComments,
    publishComments,
    deleteComments,
    getReplices,
    deleteReplices,
    publishReplices
}