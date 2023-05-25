# vue-grabbing-box changelog

## 1.0.0 TODO

release for vue@3

## 0.3.0 TODO

release for feature & improvement

## 0.2.0 TODO

release for vue@2.7

## 0.1.x (TODO)

### Features

- support i18n  
  (using vue-i18n, for the reset button)

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
