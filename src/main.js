import Vue from 'vue'
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "./api/http";
import VueSocketIO from "vue-socket.io";
Vue.use(
  new VueSocketIO({
    debug: true,
    // 服务器端地址
    connection: "http://localhost:3030",
    vuex: {},
  })
);

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
