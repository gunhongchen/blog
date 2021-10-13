import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './http/axios'
import '@/components/player'

//  style
import 'element-ui/lib/theme-chalk/index.css';
import './assets/styles/style.scss';

// mavon-editor
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

// elementUI
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// vant
import 'vant/lib/icon/local.css';
import 'vant/lib/index.css'; 
import { 
  DropdownMenu, 
  DropdownItem,
  Cell,
  Icon,
  Sticky,
  Image as VanImage,
  Tag,
  ActionSheet,
  ImagePreview,
  Loading,
  Lazyload,
  NavBar,
} from 'vant';

Vue.use(NavBar);
Vue.use(Lazyload);
Vue.use(Loading);
Vue.use(ImagePreview);
Vue.use(ActionSheet);
Vue.use(Tag);
Vue.use(VanImage);
Vue.use(Sticky);
Vue.use(Icon);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Cell);

import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location)['catch'](err => err)
}

Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.filter('date', function (v, format) {
  // yyyy-MM-dd hh:mm:ss
  const date = new Date(v);
  if (!format) {
    return new Date(v).toLocaleString()
  } else {
    var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return format;
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
