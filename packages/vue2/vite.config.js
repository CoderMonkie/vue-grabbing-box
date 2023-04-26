import { defineConfig } from "vite";
import path from 'path';
import libCss from 'vite-plugin-libcss';
import { createVuePlugin } from 'vite-plugin-vue2';

export default defineConfig(({ command, mode }) => {
  const isProd = mode === 'production';

  // 构建时去除 console 和 debugger
  const buildDrop = ['console', 'debugger'];
  if (command === 'build' && !isProd) {
    // 开发模式下
    buildDrop.length = 0;
  }
  console.log('build-drop', buildDrop);

  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    plugins: [
      createVuePlugin(),
      libCss(),
    ],
    build: {
      lib: {
        entry: path.resolve(__dirname, 'index.js'),
        name: 'GrabbingBox',
        fileName: 'grabbing-box',
      },
      outDir: '../../dist/vue2',
      cssCodeSplit: true,
      sourcemap: !isProd,
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: ['vue', 'element-ui'],
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            vue: 'Vue',
            'element-ui': 'ElementUI',
          }
        }
      }
    },
    esbuild: {
      drop: buildDrop,
    },
  };
});