import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import Element from 'element-plus';
import 'element-plus/theme-chalk/index.css';

import { GrabbingBox } from '../../../dist/vue3/grabbing-box.js';
import '../../../dist/vue3/index.css';

const app = createApp(App);
app.use(GrabbingBox);
app.use(Element);
app.mount('#app');
