# vue-grabbing-box

[中文](README.zh-CN.md)

---

## Introdution

This is a container component (Vue component) similar to a canvas box, which displays your content (whether it is an image or any Vue component), and supports features such as:

- Mobile end
  - Single finger canvas drag and drop
  - Double finger scaling (zoom-in zoom-out)
  - You can also expand, shrink, and reset by clicking the button

- PC end
  - Click and hold to drag
  - Scroll wheel up and down to drag up and down
  - Scale by 'Ctrl'+'Wheel'
  - You can also zoom-in, zoom-out, and reset by clicking the button

![](docs/images/vue2-demo-captture.gif)

## Install

```bash
pnpm add vue-grabbing-box
# or
npm install vue-grabbing-box
# or
yarn add vue-grabbing-box
```

## Usage

### Vue@2

```js
import Vue from 'vue';
import GrabbingBox from 'vue-grabbing-box/vue2';
Vue.use(GrabbingBox);

// or
// if used in other lib
import GrabbingBox from 'vue-grabbing-box/vue2';

function install(Vue) {
  // ...
  // regist components for the lib it-self
  // ...

  Vue.use(GrabbingBox)
}
```

```vue
<template>
  <grabbing-box>
    <!-- here lays your content -->
  </grabbing-box>
</template>
```

|Property|Type|Default Value|Note|
|--|--|--|--|
|maxScale|Number|200|max limitation, unit percent|
|minScale|Number|20|min limitation, unit percent|
|scaleStep|Number|10|unit percent|
|scaleButtons|Boolean|true|whether show scale button-group，includes `+` `-` and `reset`|
|throttleSpan|Number|100|unit millisecond|

Note that used ElButton in v0.0.1
