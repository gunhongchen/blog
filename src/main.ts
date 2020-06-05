import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './http/axios'

//  style
import 'element-ui/lib/theme-chalk/index.css';
import './assets/styles/style.scss';

// mavon-editor
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

// elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.filter('date', function (v, format) {
  if (!format) {
    return new Date(v).toLocaleString()
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
