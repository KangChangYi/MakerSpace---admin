import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'

import axios from 'axios'   //  使用axios

// axios.defaults.withCredentials = true
// axios.defaults.credentials = true
Vue.prototype.$axios = axios;

// Vue.http.options.withCredentials = true;
import global from './page/login'//引用文件
Vue.prototype.global = global//挂载到Vue实例上面

import mavonEditor from 'mavon-editor'     //markdown

import '../node_modules/mavon-editor/dist/css/index.css'  //markdown

import 'iview/dist/styles/iview.css'    // 使用 iview CSS

import VueResource from 'vue-resource';   //服务器请求

Vue.use(VueResource);     //服务器请求

Vue.use(mavonEditor)//markdown

Vue.config.productionTip = false
// 回到顶部

Vue.use(iView)
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  render: h => h(App),
  // data() {
  //   return {
  //     teamId: '',    //初始化
  //     token: '',
  //     power: '',
  //   }
  // }
})
