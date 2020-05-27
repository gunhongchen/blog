import axios from 'axios';
import router from '../router'

// 一些默认的参数
// axios.defaults.baseURL = 'http://localhost:3000'

// 请求拦截器：在发送请求前拦截
// axios.interceptors.request.use(config => {
//   console.log('请求发送前拦截')
//   // config.headers.common['AccessToken'] = window.localStorage.getItem('_token') || ''
//   return config;
// }, error => {
//   return Promise.reject(error)
// })

// 响应拦截器：在请求响应之后拦截
axios.interceptors.response.use(response => {
  if(response.status === 200) {
      return response.data;
  }
  return response;
}, error => {
  if(error.response.status === 401) {
    router.push('/login')
  }
  // console.log(error.response)
  return Promise.reject(error.response.data)
})

export default axios;