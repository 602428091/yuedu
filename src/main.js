import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.axios=axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

axios.interceptors.request.use(
  config=>{
    if(localStorage.getItem("token")){
      config.headers.Authorization=`token ${localStorage.getItem("token")}`;
    }
    return config
  },
  err=>{
    return Promise.reject(err)
  }
)
