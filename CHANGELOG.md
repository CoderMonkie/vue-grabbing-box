# vue-grabbing-box changelog

## 1.0.0-alpha.4 (2024.01.11)

- feature 增加配置项`initScale`(Vue3版)

## 1.0.0-alpha.4 (2024.01.10)

- feature 增加配置项`initScale`(Vue2版)

## 1.0.0-alpha.3 (2023.11.18)

- fix: unbind touchmove on document

## 1.0.0-alpha.2 (2023.10.02)
## 1.0.0-alpha.1 (2023.10.02)

release for vue@3

## 0.3.0 TODO

release for feature & improvement

## 0.2.0 TODO

release for vue@2.7

## 0.1.x (TODO)

### Features

- support locale options 
  (for the text on reset button)

## 0.1.8 (2023.07.13)

- fix: position of zoom button icons are not right (in EIS project)
- fix: [current scale calculation](https://github.com/CoderMonkie/vue-grabbing-box/issues/5)
- fix: register locally

## 0.1.7 (2023.06.11)

- [feature: emit events on interaction](https://github.com/CoderMonkie/vue-grabbing-box/issues/23)

- [feature: support horizontal scroll](https://github.com/CoderMonkie/vue-grabbing-box/issues/24)

- other improvement

## 0.1.6 (2023.05.25)

- fix: disable ctrlKey + wheel on document, but allow scroll

## 0.1.5 (2023.05.25)

- fix: scale buttons click with stop propagation

## 0.1.4 (2023.05.20)

- feature: cancel click event when have dragged  
  if really need the click event, set `emitClickOnDrag` to `true`  
  releated issue [#7](https://github.com/CoderMonkie/vue-grabbing-box/issues/7)

## 0.1.3 (2023.05.15)

- update [demo-vue2](https://codermonkie.github.io/vue-grabbing-box/demo-vue2/) & deploy to Github Pages.
- update README
- change default values
  - throttleSpan `100` -> `50`
  - scrollSpeed `3` -> `1`

## 0.1.2 (2023.05.11)

### Fix

- [iconify-error](https://github.com/CoderMonkie/vue-grabbing-box/issues/2)  
  use svg instead

## 0.1.1 (2023.05.11)

### Features

- Customize scale buttons position  
  combination of `top` `left` `bottom` `right`  
  specify space to edge

## 0.1.0 (2023.05.08)

- remove element-ui dependency  
  (not use ElButton anymore)
- remove libcss & need manually import css file

## 0.0.6 (2023-05-01)

release for vue@2  
(2.6.14)
