import Vue from 'vue'
import App from './App.vue'
import Fragment from './components/Fragment'

Vue.config.productionTip = false
Vue.use(Fragment)

new Vue({
  render: h => h(App),
}).$mount('#app')
