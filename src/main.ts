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
import {
  Row,
  Col,
  Card,
  Container,
  Aside,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Main,
  Table,
  Header,
  Button,
  TableColumn,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Loading,
  Pagination,
  Popover,
  Divider,
  Timeline,
  TimelineItem,
  InfiniteScroll,
  Link,
  Popconfirm,
  Switch
 } from 'element-ui'

 Vue.use(Row)
 Vue.use(Col)
 Vue.use(Card)
 Vue.use(Container)
 Vue.use(Aside)
 Vue.use(Menu)
 Vue.use(Submenu)
 Vue.use(MenuItem)
 Vue.use(MenuItemGroup)
 Vue.use(Main)
 Vue.use(Table)
 Vue.use(TableColumn)
 Vue.use(Button)
 Vue.use(Form)
 Vue.use(FormItem)
 Vue.use(Input)
 Vue.use(Select)
 Vue.use(Option)
 Vue.use(Loading)
 Vue.use(Pagination)
 Vue.use(Popover)
 Vue.use(Divider)
 Vue.use(Header)
 Vue.use(Timeline)
 Vue.use(TimelineItem)
 Vue.use(InfiniteScroll)
 Vue.use(Link)
 Vue.use(Switch)
 Vue.use(Popconfirm)

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
