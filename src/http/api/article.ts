import { Article } from './../../views/console/article/components/Article';
import axios from '../axios'

const config = {
    headers: {
        "Content-Type": "multipart/form-data" 
    }
}
function getList(params?) {
    return axios.get('/api/article',{params})
}
function getOne(id) {
    return axios.get(`/api/article/${id}`)
}

export {
    getList,
    getOne,
}