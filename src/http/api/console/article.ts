import { Article } from './../../../views/console/article/components/Article';
import axios from '../../axios'

const config = {
    headers: {
        "Content-Type": "multipart/form-data" 
    }
}
function getList(params?) {
    return axios.get('/api/article/console',{params})
}
function getOne(id) {
    return axios.get(`/api/article/${id}`)
}
function deleteData(params: {_id: string}) {
    return axios.delete('/api/article', {params})
}
function addData(data: Article) {
    return axios.post('/api/article', data)
}
function update(data) {
    return axios.put('/api/article', data, config)
}

function uploadImgToken() {
    return axios.get(`/api/article/uploadimg/token`)
}

export {
    getList,
    deleteData,
    addData,
    getOne,
    update,
    uploadImgToken
}