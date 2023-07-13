import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// register globally
// -- using local-build
// import GrabbingBox from '../../../dist/vue2'
// import '../../../dist/vue2/index.css'
// -- using package from NPM
// import GrabbingBox from 'vue-grabbing-box'
// import 'vue-grabbing-box/dist/vue2/index.css'

Vue.use(ElementUI)
// Vue.use(GrabbingBox)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
