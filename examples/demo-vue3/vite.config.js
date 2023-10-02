import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: '../dist/demo-vue3',
  },
  base: '/vue-grabbing-box/demo-vue3'
});
