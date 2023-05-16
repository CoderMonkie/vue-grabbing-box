# vue-grabbing-box

[English](README.md)

---

[TOC]

## 介绍

这是一个类似画布盒子的容器组件（vue 组件），将你的内容（无论是图片还是任何 vue 组件）展示出来，并提供：

- 移动端
  - 单指实现画布拖拽
  - 双指实现扩缩放
  - 另可通过点击按钮实现扩大缩小及重置
- PC端
  - 单击按住拖动
  - 滚动轮上下滚动 == 上下拖动
  - `Ctrl`+`Wheel`的扩缩放
  - 另可通过点击按钮实现扩大缩小及重置

直观上图：
![](docs/images/vue2-demo-captture.gif)

试一下：[demo-vue2](https://codermonkie.github.io/vue-grabbing-box/demo-vue2/)

## 更新记录

[changelog](./CHANGELOG.md)

## 使用

### Vue@2

[demo-vue2](./example/demo-vue2/)

```bash
pnpm add vue-grabbing-box
# or
npm install vue-grabbing-box
# or
yarn add vue-grabbing-box
```

```js
import Vue from 'vue';
import GrabbingBox from 'vue-grabbing-box'; // 直接引入默认 vue2
// 或
import GrabbingBox from 'vue-grabbing-box/dist/vue2`; // 指定 vue2（推荐）
// v0.1.0起，不再将css一并打包进js文件，需要单独引入样式
import 'vue-grabbing-box/dist/vue2/index.css';

Vue.use(GrabbingBox);

// 组件级安装（局部安装）也是支持的，只是就一个组件而已，又不是组件库，就没必要了
// 而且组件单独安装必需要单独引入样式
import GrabbingBox from 'vue-grabbing-box/packages/vue2/src/grabbing-box';
import 'vue-grabbing-box/dist/vue2/index.css';
Vue.use(GrabbingBox);
// 或
Vue.component(GrabbingBox.name, GrabbingBox);
```

```vue
<template>
  <grabbing-box>
    <!-- 这里是内容区域，放你自己的内容 -->
  </grabbing-box>
</template>
```

~~*注：scale 按钮组中使用了 ElButton*~~  
v0.1.0起不再依赖 ElementUI 的 ElButton 组件

### Vue@3

TODO

## API

|属性名|类型|默认值|说明|
|--|--|--|--|
|maxScale|Number|200|放大最高比例限制，单位百分比|
|minScale|Number|20|缩小的最小比例限制，单位百分比|
|scaleStep|Number|10|放大缩小的步长，点击按钮时用，单位同上|
|scaleButtons|Boolean|true|是否显示 scale 按钮组，包括放大（+）缩小（-）和重置|
|scaleButtonsPosition|String|`top right`|`v0.1.1` 指定缩放按钮组的位置, `top \| right \| bottom \| left`|
|scaleButtonsSpaceX|String|`10px`|`v0.1.1` 指定与边的横向距离|
|scaleButtonsSpaceY|String|`20px`|`v0.1.1` 指定与边的纵向距离|
|throttleSpan|Number|~~100~~ 50(from `v0.1.3`)|事件节流时间间隔，单位毫秒|
|scrollSpeed|Number|~~3~~ 1(from `v0.1.3`)|`v0.0.6` PC端鼠标滚动轮上下滚动倍速，可设范围`1`~`6`|
