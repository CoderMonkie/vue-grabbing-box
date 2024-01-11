<!-- 
/**
 * 画布拖拽扩缩放组件
 */
 -->
 <template>
  <div
    ref="containerRef"
    class="grabbing-box-container w-full h-full overflow-hidden flex flex-col relative"
    :class="{
      'cursor-grab': !state.dragging,
      'cursor-grabbing': state.dragging,
    }"
  >
    <scale-button-group
      v-if="props.scaleButtons"
      :scaling="scaling"
      @zoom-in="zoomIn"
      @zoom-out="zoomOut"
      @reset="reset"
      class="scale-button-group"
      :class="{
        'custom-position-top': safeScaleButtonsPosition.top,
        'custom-position-bottom': safeScaleButtonsPosition.bottom,
        'custom-position-left': safeScaleButtonsPosition.left,
        'custom-position-right': safeScaleButtonsPosition.right,
      }"
      :style="`
        --scale-buttons-space-x: ${props.scaleButtonsSpaceX};
        --scale-buttons-space-y: ${props.scaleButtonsSpaceY};
      `"
    />

    <div
      ref="contentBoxRef"
      class="grabbing-box w-full h-full"
      style="
        transform-origin: center center;
        user-select: none;
        transform: matrix(1, 0, 0, 1, 0, 0);
      "
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup name="GrabbingBox">
import { reactive, ref, computed, onMounted, onBeforeUnmount } from "vue";
import { throttle, isPC } from "../../../utils";
import ScaleButtonGroup from "../scale-button-group/index.vue";

const emit = defineEmits(["zoom-in", "zoom-out", "reset", "move", "update"]);

const props = defineProps({
  useCapture: {
    type: Boolean,
    default: true,
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
  // 初始化为指定比例
  initScale: {
    type: Number,
    default: 100,
  },
  // 是否显示缩放按钮组
  scaleButtons: {
    type: Boolean,
    default: true,
  },
  // Scale buttons position
  scaleButtonsPosition: {
    type: String,
    default: "top right",
  },
  scaleButtonsSpaceX: {
    type: String,
    default: "10px",
  },
  scaleButtonsSpaceY: {
    type: String,
    default: "20px",
  },
  // 点击缩放按钮时的步长
  scaleStep: {
    type: Number,
    default: 10,
  },
  // 节流函数的时间间隔
  throttleSpan: {
    type: Number,
    default: 50,
  },
  /**
   * [#7](https://github.com/CoderMonkie/vue-grabbing-box/issues/7)
   * 阻止 drag 时的 click 事件
   *
   * 默认当 drag 后不触发 click 事件
   * 如有特殊需要，将`emitClickOnDrag`设为`true`
   */
  emitClickOnDrag: {
    type: Boolean,
    default: false,
  },
});
const containerRef = ref(null);
const contentBoxRef = ref(null);
const state = reactive({
  lastTransformData: {
    scale: 1,
    translateX: 0,
    translateY: 0,
  },
  lastPosition: {
    x: null,
    y: null,
    distance: 0, // 两指触点之间的距离
  },
  readyToDrag: false,
  readyToScale: false,
  dragging: false,
  isScaling: false,
  // 缩放导致偏移的比例
  scaleTranslateProportion: [0, 0], // TODO
  dragged: false, // fix #7 完成一次拖拽后标记为true，控制 click 事件是否取消冒泡等，适时重置
});

/**
 * 显示用缩放百分比
 */
const scaling = computed(() => {
  const { scale } = state.lastTransformData;
  // 要注意：1.1 * 100 = 110.00000000000001
  // 1.15*100=114.99999999999999
  return parseInt((scale * 10000) / 100);
});
const safeScaleButtonsPosition = computed(() => {
  const str = (props.scaleButtonsPosition || "").trim().toLowerCase();
  // 传空值的时候
  if (!str) return { right: true, top: true, left: false, bottom: false };

  const horizotal = str.includes("left") ? "left" : "right"; // 未传水平值的时候默认是 right
  const vertical = str.includes("bottom") ? "bottom" : "top"; // 未传垂直值的时候默认是 top

  return {
    top: vertical === "top",
    bottom: vertical === "bottom",
    left: horizotal === "left",
    right: horizotal === "right",
  };
});

/** 初始化为指定比例 */
const useInitSacle = () => {
  if (props.maxScale < props.minScale) {
    throw new Error(`[Props Error]maxScale should greater than minSacle`);
  }
  let initScale = props.initScale;
  if (initScale > props.maxScale) {
    initScale = props.maxScale;
  } else if (initScale < props.minScale) {
    initScale = props.minScale;
  }
  state.lastTransformData.scale = ensureScaleInRange(
    initScale / 100,
  );
  setMatrix(contentBoxRef.value);
};

const init = () => {
  useInitSacle();
  const bodyEvents = getBodyEvents();
  Object.entries(bodyEvents).forEach((kv) => {
    const [eventName, handler] = kv;
    // 注意：这里拦截阻止默认行为的不能加节流，且 passive 为 false
    bindEvent(document, eventName, handler, {
      passive: false,
      capture: false,
    });
  });

  const containerEvents = getContainerEvents();
  const bodyEventNames = Object.keys(bodyEvents);
  Object.entries(containerEvents).forEach((kv) => {
    const [eventName, handler] = kv;
    // 注意：如果使用节流函数，应避免间隔时间内被透传事件到顶层，使上面的屏蔽失效
    const _handler = bodyEventNames.includes(eventName)
      ? handler
      : throttle(handler, props.throttleSpan);
    bindEvent(containerRef.value, eventName, _handler, {
      capture: props.useCapture,
      passive: false,
    });
  });
};

/**
 * 需要阻止默认行为的事件
 * 如移动端的时候需要禁掉浏览器默认的动作识别（如下拉刷新、右划返回等）
 * PC端的时候取消 ctrl 加滚轮的默认行为
 * 应注意：
 * - passive 应设 false
 * - 全都应处理掉，不能使用节流函数
 */
const getBodyEvents = () => {
  return isPC()
    ? {
        wheel: (event) => {
          console.log("body wheel event", event);
          if (event.ctrlKey) {
            disableDefaultBehavior(event);
          }
        },
      }
    : {
        touchmove: disableDefaultBehavior,
      };
};

/**
 * 组件内要处理的事件
 */
const getContainerEvents = () => {
  return isPC()
    ? {
        mousedown: onMouseDown,
        mousemove: onMouseMove,
        mouseup: onMouseUp,
        mouseleave: onMouseLeave,
        wheel: onWheel,
      }
    : {
        touchstart: onTouchStart,
        touchmove: onTouchMove,
        touchend: onTouchEnd,
      };
};
/**
 * 阻止移动端浏览器的默认滑动（如下拉刷新与左划回退）
 */
const disableDefaultBehavior = (event) => {
  event.preventDefault();
};

const reset = () => {
  state.lastTransformData = {
    scale: 1,
    translateX: 0,
    translateY: 0,
  };
  setMatrix(contentBoxRef.value);
  emit("reset");
};
const zoomIn = () => {
  const { scale } = state.lastTransformData;
  const newScale = (scale * 100 + props.scaleStep) / 100;
  console.log("zoomIn", scale, newScale);
  state.lastTransformData.scale = Math.min(newScale, props.maxScale / 100);
  setMatrix(contentBoxRef.value);
  emit("zoom-in", state.lastTransformData);
};
const zoomOut = () => {
  const { scale } = state.lastTransformData;
  const newScale = (scale * 100 - props.scaleStep) / 100;
  console.log("zoomOut", scale, newScale);
  state.lastTransformData.scale = Math.max(newScale, props.minScale / 100);
  setMatrix(contentBoxRef.value);
  emit("zoom-out", state.lastTransformData);
};
const bindEvent = (element, eventName, handler, options) => {
  element.addEventListener(eventName, handler, options);
};
const unbindEvent = (element, eventName, handler) => {
  element.removeEventListener(eventName, handler);
};
const move = (element, options) => {
  const { translateX, translateY } = state.lastTransformData;
  const { deltaX, deltaY } = options;
  const [x, y] = [translateX + deltaX, translateY + deltaY];
  state.lastTransformData = {
    ...state.lastTransformData,
    translateX: x,
    translateY: y,
  };
  setMatrix(element);
  emit("move", state.lastTransformData);
};
const setMatrix = (element) => {
  const { scale, translateX, translateY } = state.lastTransformData;
  const safeScale = ensureScaleInRange(scale);
  element.style.transform = `matrix(${safeScale}, 0, 0, ${safeScale}, ${translateX}, ${translateY})`;
  state.lastTransformData.scale = safeScale;

  emit("update", state.lastTransformData);
};

/**
 * -------------------
 * PC端事件处理
 * -------------------
 */
const handleInnerClick = (event) => {
  // stop event propagation and prevent default behavior when have dragged
  if (!props.emitClickOnDrag && state.dragged) {
    event.stopPropagation();
    event.preventDefault();
    console.log(
      "grabbing-box-click: stop event propagation and prevent default behavior",
    );
  }
};
const onMouseDown = (event) => {
  state.readyToDrag = true;
  state.lastPosition = {
    x: event.clientX,
    y: event.clientY,
  };

  if (!props.emitClickOnDrag) {
    state.dragged = false;
    bindEvent(containerRef.value, "click", handleInnerClick, {
      capture: true,
    });
  }
};
const onMouseMove = (event) => {
  if (state.readyToDrag) {
    event.stopPropagation();
    event.preventDefault();
    state.dragging = true;
    const { clientX, clientY } = event;
    const { x, y } = state.lastPosition;
    const [deltaX, deltaY] = [clientX - x, clientY - y];

    move(contentBoxRef.value, { deltaX, deltaY });

    state.lastPosition = {
      x: clientX,
      y: clientY,
    };

    if (!props.emitClickOnDrag) {
      state.dragged = true;
    }
  }
};
const onMouseUp = () => {
  state.readyToDrag = false;
  state.dragging = false;
  unbindEvent(containerRef.value, "click", handleInnerClick); // 虽然这里取消监听，本次 click 还是能触发的
};
const onMouseLeave = () => {};
const onWheel = (e) => {
  const { ctrlKey, wheelDelta } = e;
  e.preventDefault();
  e.stopPropagation();
  // 缩放
  if (ctrlKey) {
    if (wheelDelta > 0) {
      zoomIn();
    } else {
      zoomOut();
    }
  }
  // 滚动（上下左右都可）
  else {
    const { deltaMode, wheelDeltaX, wheelDeltaY } = e;

    // 0=像素
    if (deltaMode === 0) {
      state.lastTransformData.translateX += wheelDeltaX;
      state.lastTransformData.translateY += wheelDeltaY;
    }
    setMatrix(contentBoxRef.value);
  }
};

/**
 * -------------------
 * 移动端事件适配
 * -------------------
 */
/** touchstart */
const onTouchStart = (event) => {
  if (event.touches.length === 1) {
    // 当前屏幕上只有一个触摸点的时候就是移动
    const { clientX, clientY } = event.touches[0];
    state.lastPosition = {
      x: clientX,
      y: clientY,
    };
    state.readyToDrag = true;
    state.dragging = false;
    state.readyToScale = false;
  } else if (event.touches.length === 2) {
    // 如果两个触摸点是缩放
    state.readyToScale = true;
    state.readyToDrag = false;
    state.dragging = false;

    const [touch1, touch2] = event.touches;
    // 算出当前两指之间的距离
    const x = touch1.clientX - touch2.clientX;
    const y = touch1.clientY - touch2.clientY;
    state.lastPosition.distance = Math.sqrt(x * x + y * y);
    // 缩放中心为双指点的中心,此时的双指中心只是containerRef上的,得转换成contentBoxRef上的,
    // 因为缩放中心的位置带来translate的变化,是根据当前触摸中心在contentBoxRef上的比例算出来的
    const scaleCenter = [
      (touch1.clientX + x / 2 - state.lastTransformData.x) /
        state.lastTransformData.scale,
      (touch1.clientY + y / 2 - state.lastTransformData.y) /
        state.lastTransformData.scale,
    ];
    // 缩放导致偏移的比例
    state.scaleTranslateProportion = [
      scaleCenter[0] / contentBoxRef.offsetWidth,
      scaleCenter[1] / contentBoxRef.offsetHeight,
    ];
  }
};
/** touchmove */
const onTouchMove = (event) => {
  event.preventDefault();
  event.stopPropagation();
  if (event.touches.length === 1 && state.readyToDrag) {
    state.dragging = true;

    const { clientX, clientY } = event.touches[0];
    const { x, y } = state.lastPosition;
    const [deltaX, deltaY] = [clientX - x, clientY - y];

    move(contentBoxRef.value, { deltaX, deltaY });
    state.lastPosition = {
      ...state.lastPosition,
      x: clientX,
      y: clientY,
    };
  } else if (event.touches.length === 2) {
    // 只要有两个触摸点就是缩放,可以从移动转换成缩放
    // scale(event.touches)

    // 单指触发 move 后变双指，此时没有记录双指数据，无法进行 scale，所以先触发一次 touchstart
    if (!state.readyToScale) {
      onTouchStart(event);
      return;
    }

    const [touch1, touch2] = event.touches;
    // state.lastTransformData.scale = calcScale(touch1, touch2);
    // setMatrix(contentBoxRef.value);

    // 算出当前两指的距离
    const distance = Math.sqrt(
      (touch1.clientX - touch2.clientX) * (touch1.clientX - touch2.clientX) +
        (touch1.clientY - touch2.clientY) * (touch1.clientY - touch2.clientY),
    );
    // 缩放大小为现在的两指距离除去上次的两指距离
    getScaling(distance / state.lastPosition.distance, false);

    // 记录这一次两指距离
    state.lastPosition.distance = distance;
  }
};
/** touchend */
const onTouchEnd = (event) => {
  state.readyToDrag = false;
  state.dragging = false;
  state.readyToScale = false;
  state.isScaling = false;
  state.lastPosition = {
    x: 0,
    y: 0,
    distance: 0,
  };
};
// ---------------------------------------
// 进行指定大小的缩放
const getScaling = (scale, useCenter = true) => {
  // 为0或者为1就不进行缩放
  if (scale === 0 && scale === 1) return;

  // 缩放前的contentBoxRef大小
  const oldSize = [
    contentBoxRef.offsetWidth * state.lastTransformData.scale,
    contentBoxRef.offsetHeight * state.lastTransformData.scale,
  ];
  let scaleTranslateProportion = state.scaleTranslateProportion;
  // 如果直接操作,不是双指进行缩放就设置touchZoom中心是缩放中心
  if (useCenter) {
    // 外层容器的中心,
    const scaleCenter = [
      (containerRef.offsetWidth / 2 - state.lastTransformData.x) /
        state.lastTransformData.scale,
      (containerRef.offsetHeight / 2 - state.lastTransformData.y) /
        state.lastTransformData.scale,
    ];
    // 缩放导致偏移的比例
    scaleTranslateProportion = [
      scaleCenter[0] / containerRef.offsetWidth,
      scaleCenter[1] / containerRef.offsetHeight,
    ];
  }
  // 设置缩放的偏移,之前纠结在使用两指的偏移位置来计算,实际上缩放后大小的变化不是两指间移动的距离
  // 变化大小其实就是缩放的大小乘原来的大小
  state.lastTransformData.x +=
    oldSize[0] * (1 - scale) * scaleTranslateProportion[0] || 0;
  state.lastTransformData.y +=
    oldSize[1] * (1 - scale) * scaleTranslateProportion[1] || 0;
  // 设置缩放
  state.lastTransformData.scale *= scale;

  setMatrix(contentBoxRef.value);
};
const ensureScaleInRange = (scale) => {
  if (scale * 100 > props.maxScale) {
    scale = props.maxScale / 100;
  } else if (scale * 100 < props.minScale) {
    scale = props.minScale / 100;
  }
  return scale;
};

onMounted(() => {
  init();
});
onBeforeUnmount(() => {
  Object.entries(getContainerEvents()).forEach((kv) => {
    const [eventName, handler] = kv;
    unbindEvent(containerRef.value, eventName, handler);
  });
  Object.entries(getBodyEvents()).forEach((kv) => {
    const [eventName, handler] = kv;
    unbindEvent(document, eventName, handler);
  });
});
</script>

<script>
/**
 * 画布拖拽扩缩放组件
 */
export default {
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
.grabbing-box-container {
  .cursor-grab,
  .cursor-grab * :not(:hover) {
    cursor: grab;
  }

  .cursor-grabbing,
  .cursor-grabbing * {
    cursor: grabbing;
  }

  .scale-button-group {
    --scale-buttons-space-x: 10px;
    --scale-buttons-space-y: 20px;
    &.custom-position-top {
      top: var(--scale-buttons-space-y);
      bottom: unset;
    }
    &.custom-position-bottom {
      bottom: var(--scale-buttons-space-y);
      top: unset;
    }
    &.custom-position-left {
      left: var(--scale-buttons-space-x);
      right: unset;
    }
    &.custom-position-right {
      right: var(--scale-buttons-space-x);
      left: unset;
    }
  }

  .grabbing-box * {
    -webkit-user-drag: none;
  }
}
</style>
