<script setup>
// import grabbingBox from "../../../packages/vue3/src/grabbing-box/grabbing-box.vue";
// import { GrabbingBox } from "../../../dist/vue3/grabbing-box";
// import "../../../dist/vue3/index.css";

// import { GrabbingBox } from 'vue-grabbing-box/dist/vue3';
// import 'vue-grabbing-box/dist/vue3/index.css';

import HelloWorld from "./components/HelloWorld.vue";
import { reactive, computed } from "vue";
import { ElMessage } from 'element-plus'

const formData = reactive({
  maxScale: 200,
  minScale: 20,
  scaleStep: 10,
  scaleButtons: true,
  scaleButtonsVertical: "top",
  scaleButtonsHorizontal: "right",
  scaleButtonsSpaceX: 10,
  scaleButtonsSpaceY: 20,
  emitClickOnDrag: false,
});
const scaleButtonsPosition = computed(() => {
  return `${formData.scaleButtonsVertical} ${formData.scaleButtonsHorizontal}`;
});
const onClick = () => {
  ElMessage({
    message: "Click event triggered on the upper-level of the grabbing box.",
    type: "warning",
  });
};
/**
 * 事件系统
 */
const onUpdate = (e) => {
  console.log("onUpdate", e);
};
const onZoomIn = (e) => {
  console.log("onZoomIn", e);
};
const onZoomOut = (e) => {
  console.log("onZoomOut", e);
};
const onMove = (e) => {
  console.log("onMove", e);
};
const onReset = (e) => {
  console.log("onReset", e);
};
</script>

<template>
  <div class="vue3-demo-page overflow-hidden" @click="onClick">
    <grabbing-box
      :maxScale="formData.maxScale"
      :minScale="formData.minScale"
      :scaleStep="formData.scaleStep"
      :init-scale="60"
      :scaleButtons="formData.scaleButtons"
      :scaleButtonsPosition="scaleButtonsPosition"
      :scaleButtonsSpaceX="formData.scaleButtonsSpaceX + 'px'"
      :scaleButtonsSpaceY="formData.scaleButtonsSpaceY + 'px'"
      :scrollSpeed="1"
      :throttleSpan="50"
      :emitClickOnDrag="formData.emitClickOnDrag"
      @update="onUpdate"
      @zoom-in="onZoomIn"
      @zoom-out="onZoomOut"
      @move="onMove"
      @reset="onReset"
      style="border: 1px solid #a4a4a4"
    >
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <a href="https://vuejs.org/" target="_blank">
          <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
        </a>
      </div>
      <HelloWorld msg="Vite + Vue" />
    </grabbing-box>

    <div class="form-container" @click.stop="void 0">
      <el-form
        :model="formData"
        inline
        size="small"
        style="margin-top: 20px; border: 1px solid #a4a4a4; padding: 10px"
      >
        <el-form-item label="Max Scale">
          <el-input-number
            v-model="formData.maxScale"
            :step="10"
            :min="150"
            :max="500"
            :disabled="!formData.scaleButtons"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="Min Scale">
          <el-input-number
            v-model="formData.minScale"
            :step="10"
            :min="0"
            :max="50"
            :disabled="!formData.scaleButtons"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="Scale Step">
          <el-input-number
            v-model="formData.scaleStep"
            :step="5"
            :disabled="!formData.scaleButtons"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="Scale Buttons">
          <el-switch v-model="formData.scaleButtons" />
        </el-form-item>

        <el-form-item label="Scale Buttons Position">
          <el-radio-group
            v-model="formData.scaleButtonsVertical"
            :disabled="!formData.scaleButtons"
            style="margin-right: 20px"
          >
            <el-radio label="top">top</el-radio>
            <el-radio label="bottom">bottom</el-radio>
          </el-radio-group>

          <el-radio-group
            v-model="formData.scaleButtonsHorizontal"
            :disabled="!formData.scaleButtons"
            style="margin-right: 20px"
          >
            <el-radio label="left">left</el-radio>
            <el-radio label="right">right</el-radio>
          </el-radio-group>

          <el-form-item label="Scale Buttons SpaceX">
            <el-input-number
              v-model="formData.scaleButtonsSpaceX"
              :step="5"
              :disabled="!formData.scaleButtons"
            ></el-input-number>
          </el-form-item>

          <el-form-item label="Scale Buttons SpaceY">
            <el-input-number
              v-model="formData.scaleButtonsSpaceY"
              :step="5"
              :disabled="!formData.scaleButtons"
            ></el-input-number>
          </el-form-item>

          <el-form-item label="Emit click on drag">
            <el-switch v-model="formData.emitClickOnDrag"></el-switch>
          </el-form-item>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.vue3-demo-page {
  padding: 20px;
  padding-top: 60px;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
