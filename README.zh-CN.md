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

功能简单实用，窃以为实现的不错，所以分享一下，这个，开发背景（组件背后的故事，忙就快写 bug 去吧，别往下看了）：  
开发之初，是因为做了一个仿钉钉的流程设计器包括回显查看功能（基于 bpmn.js 做的那版领导不满意，更倾向于这种钉钉风格），而且主要是在钉钉上看（因为推送消息作为入口），面向领导编程的我们，就要考虑把它做的方便易用，于是就有了这个适配移动端的【可拖拽可缩放】`vue-grabbing-box` 组件。

背景的背景：  
公司业务上有项目要审批流程功能，于是在没有设计器的情况下，后端大佬用 bpmn 工具生成出一个基于业务上要的流程图拿到 bpmn 文件，然后手动人肉修改节点属性，直接放到代码里跑（至于为什么会这样，干过几年的程序员应该都懂，领导要快速出一个功能，才不管你咋实现，只管你是否能上线）。  
现在，流程跑起来了，没有直观的查看功能，好嘛，来个查看功能（设计器都没有，你说你要查看？）能实现吗，必须能啊，毕竟工资是老板发的，咱也不忍心拒绝（--喂，你是说拒绝需求还是拒绝工资啊？）。  
反正都是相通的，直接设计器搞起。搞了一版 bpmn.js 自定义渲染的美化版，其中也是需要在读取旧有 bpmn 文件时稍做转换（因为坐标信息问题），费了些功夫自以为美美哒，奈何领导不认，领导要的是 dd 风格的，于是，从头再来。  
这下可好了，属于是：需求一句话，开发干秃顶。  
需要把旧有的 bpmn 文件读取识别，并转换数据结构，这可是 graph 转 tree 啊。。。  
主要是常用到的那两种网关麻烦（inclusiveGateway 和 exclusiveGateway），要适时提取公共节点，还有它的分支（也就是 flow）也会作为节点展示，网关属性里包括分支跟子节点，也就是它串起来的路径跟之前完全不一样了。  
OK，发量换代码，成交。  
成功转换了，但个别情况，会在分支里存在相同节点，这种如果不能接收，那就改流程图吧。

> 另，来到这家公司开上了历史的倒车用上了 vue2  
> 所以是先开发了 vue2 版的，后续会再做一版 vue3 的

## 使用

### Vue@2

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
// 注：打包 ESM 时可以通过插件自动引入样式，而 umd 不行，需要再引入样式
// import 'vue-grabbing-box/dist/vue2/index.css';
// 或
import GrabbingBox from 'vue-grabbing-box/dist/vue2`; // 指定 vue2

Vue.use(GrabbingBox);

// 组件级安装（局部安装）也是支持的，只是就一个组件而已，又不是组件库，就没必要了
// 而且组件单独安装必需要单独引入样式
import GrabbingBox from 'vue-grabbing-box/packages/vue2/src/grabbing-box';
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

### Vue@3

TODO

## API

|属性名|类型|默认值|说明|
|--|--|--|--|
|maxScale|Number|200|放大最高比例限制，单位百分比|
|minScale|Number|20|缩小的最小比例限制，单位百分比|
|scaleStep|Number|10|放大缩小的步长，点击按钮时用，单位同上|
|scaleButtons|Boolean|true|是否显示 scale 按钮组，包括放大（+）缩小（-）和重置|
|throttleSpan|Number|100|事件节流时间间隔，单位毫秒|
