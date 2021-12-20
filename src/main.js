import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { MessageBox } from 'element-ui'
import './assets/tailwind.css'
import './assets/style/main.scss'

Vue.config.productionTip = false
Vue.prototype.$confirm = MessageBox.confirm

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
