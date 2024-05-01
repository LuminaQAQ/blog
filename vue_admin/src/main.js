import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { Message } from 'element-ui';

import axios from 'axios';

Vue.config.productionTip = false;
Vue.use(ElementUI);

axios.defaults.baseURL = "http://127.0.0.1:8888";
// axios.defaults.baseURL = "http://10.240.149.64:8888";
Vue.prototype.$axios = axios;
Vue.prototype.$message = Message;

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
