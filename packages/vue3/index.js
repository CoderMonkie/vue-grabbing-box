import '../../assets/common.css';
import { version } from '../../package.json';

import GrabbingBox from './src/grabbing-box/index.js';

const install = (Vue) => {
  if (install.installed) return;
  install.installed = true;
  Vue.use(GrabbingBox);
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export {
  version,
  install as default,
  GrabbingBox,
}