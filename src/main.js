import Vue from 'vue'
import App from './App'
import router from './router'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css';
import VeLine from 'v-charts/lib/line.common'
import VeRing from 'v-charts/lib/ring.common'


Vue.config.productionTip = false
// Vue.use(ElementUI);
Vue.component(VeLine.name, VeLine)
Vue.component(VeRing.name, VeRing)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
