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
// use
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
  Button,
  TableColumn,
  Form,
  FormItem,
  Input,
  Select,
  Option,
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

Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
