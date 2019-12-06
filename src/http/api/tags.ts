import axios from '../axios'
function getDatas() {
    return axios.get(`/api/tag`)
}
function deleteData(params: {_id: string}) {
    return axios.delete(`/api/tag`,{params})
}
function addData(data: { name: string }) {
    return axios.post(`/api/tag`, data)
}
export {
    getDatas,
    deleteData,
    addData
}