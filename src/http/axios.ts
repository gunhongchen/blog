import axios from 'axios'

// 一些默认的参数
// axios.defaults.baseURL = 'http://localhost:3000'

// 请求拦截器：在发送请求前拦截
// axios.interceptors.request.use(config => {
//   console.log('请求发送前拦截')
//   config.headers.common['AccessToken'] = 'token'
//   return config;
// }, error => {
//   return Promise.reject(error)
// })

// 响应拦截器：在请求响应之后拦截
// axios.interceptors.response.use(response => {
//   console.log('请求响应后处理')
//   return response;
// }, error => {
//   return Promise.reject(error)
// })

export default axios;