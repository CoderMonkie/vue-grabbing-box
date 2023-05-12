import Vue from 'vue';

import {
  Button,
} from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';

const components = [
  Button,
];

components.forEach(c => {
  Vue.component(c.name, c)
})