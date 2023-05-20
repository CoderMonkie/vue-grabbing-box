<template>
  <div id="app" @click="onClick">
    <grabbing-box
      ref="grabbingBoxRef"
      :maxScale="formData.maxScale"
      :minScale="formData.minScale"
      :scaleStep="formData.scaleStep"
      :scaleButtons="formData.scaleButtons"
      :scaleButtonsPosition="scaleButtonsPosition"
      :scaleButtonsSpaceX="formData.scaleButtonsSpaceX + 'px'"
      :scaleButtonsSpaceY="formData.scaleButtonsSpaceY + 'px'"
      :scrollSpeed="1"
      :throttleSpan="50"
      :emitClickOnDrag="formData.emitClickOnDrag"
      style="border: 1px solid gray"
    >
      <img alt="Vue logo" src="./assets/logo.png" />
      <HelloWorld msg="Welcome to Your Vue.js App" />
    </grabbing-box>

    <el-form
      :model="formData"
      inline
      size="small"
      style="margin-top: 20px; border: 1px solid gray; padding: 10px"
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
          <el-switch
            v-model="formData.emitClickOnDrag"
          ></el-switch>
        </el-form-item>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  data() {
    return {
      formData: {
        maxScale: 200,
        minScale: 20,
        scaleStep: 10,
        scaleButtons: true,
        scaleButtonsVertical: "top",
        scaleButtonsHorizontal: "right",
        scaleButtonsSpaceX: 10,
        scaleButtonsSpaceY: 20,
        emitClickOnDrag: false,
      },
    };
  },
  computed: {
    scaleButtonsPosition() {
      return `${this.formData.scaleButtonsVertical} ${this.formData.scaleButtonsHorizontal}`;
    },
  },
  watch: {
    formData: {
      handler() {
        this.$forceUpdate();
      },
      deep: true,
    },
  },
  methods: {
    onClick() {
      this.$message({
        message: 'Clicked outside the grabbing box.',
        type: 'warning'
      })
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
