import Vue from 'vue'
import App from './App.vue'

import './plugins/element-ui.js'

import GrabbingBox from '../../../dist/vue2'
import '../../../dist/vue2/index.css'
Vue.use(GrabbingBox)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
