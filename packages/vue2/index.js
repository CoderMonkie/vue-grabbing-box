import '../../assets/common.css';
import { version } from './package.json'

import GrabbingBox from './src/grabbing-box/index.js';

const install = (Vue) => {
  if (install.installed) return;
  install.installed = true;
  Vue.component(GrabbingBox.name, GrabbingBox);
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version,
  install,
  GrabbingBox,
}