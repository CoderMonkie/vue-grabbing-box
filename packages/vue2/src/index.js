import '../../../assets/common.css';

import GrabbingBox from './grabbing-box.vue';

export function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component(GrabbingBox.name, GrabbingBox);
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  GrabbingBox,
}