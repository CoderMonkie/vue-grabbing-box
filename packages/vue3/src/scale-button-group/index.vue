<!--
/**
 * Scale button group
 */
-->
<template>
  <div class="scale-btn-group flex items-center">
    <div
      class="scale-button btn-plus flex justify-center items-center"
      :class="{ 'is-disabled': scaleLimitOverMax }"
      @click.stop="zoomIn"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2z"
        />
      </svg>
      <!-- <Icon icon="ic:round-plus" :size="20" style="margin-top: 3px" /> -->
    </div>

    <div style="display: inline-block; margin: 0 8px">{{ scaling }}%</div>

    <div
      class="scale-button btn-minus flex justify-center items-center"
      :class="{ 'is-disabled': scaleLimitBelowMin }"
      @click.stop="zoomOut"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M18 12.998H6a1 1 0 0 1 0-2h12a1 1 0 0 1 0 2z"
        />
      </svg>
      <!-- <Icon icon="ic:round-minus" :size="20" style="margin-top: 3px" /> -->
    </div>

    <div class="scale-button btn-reset" @click.stop="reset">重置</div>
  </div>
</template>

<script setup name="ScaleButtonGroup">
import { computed } from "vue";

const emit = defineEmits(["zoom-in", "zoom-out", "reset"]);
const props = defineProps({
  // 当前缩放值
  scaling: {
    type: Number,
    default: 100,
  },
  // scale最大百分比
  maxScale: {
    type: Number,
    default: 200,
  },
  // scale最小百分比
  minScale: {
    type: Number,
    default: 20,
  },
});

const scaleLimitOverMax = computed(() => {
  return props.scaling >= props.maxScale;
});
const scaleLimitBelowMin = computed(() => {
  return props.scaling <= props.minScale;
});

const zoomIn = () => {
  emit("zoom-in");
};
const zoomOut = () => {
  emit("zoom-out");
};
const reset = () => {
  emit("reset");
};
</script>

<style scoped lang="scss">
.scale-btn-group {
  position: absolute;
  top: 20px;
  right: 10px;
  z-index: 999;
  user-select: none;
}

.scale-button {
  height: 28px;
  text-align: center;
  color: #606266;
  background: #fff;
  border: 1px solid #dcdfe6;
  cursor: pointer;
  box-sizing: border-box;
  vertical-align: middle;
  outline: none;

  &:hover:not(.is-disabled) {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
  &:active:not(.is-disabled) {
    color: #3a8ee6;
    border-color: #3a8ee6;
    outline: 0;
  }
  &.is-disabled {
    color: #c0c4cc;
    cursor: not-allowed;
    background-image: none;
    background-color: #fff;
    border-color: #ebeef5;
  }

  &.btn-plus,
  &.btn-minus {
    width: 28px;
    font-size: 1.25rem;
    border-radius: 50%;
    line-height: 24px;
  }
  &.btn-reset {
    padding: 5px 15px;
    font-size: 12px;
    border-radius: 2px;
    margin-left: 10px;
  }
}
</style>
