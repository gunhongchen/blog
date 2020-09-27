import axios from '../../axios'
function getDatas() {
    return axios.get(`/api/console/tag`)
}
function deleteData(params: {_id: string}) {
    return axios.delete(`/api/console/tag`,{params})
}
function addData(data: { name: string }) {
    return axios.post(`/api/console/tag`, data)
}
export {
    getDatas,
    deleteData,
    addData
}