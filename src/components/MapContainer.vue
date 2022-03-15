<template>
  <div
    class="MapContainer"
    @pointerdown.prevent=""
    @pointerup.prevent=""
    @pointermove="updatePosition"
    @wheel="updateZoom"
    :style="{ cursor: cursorStyle }"
  >
    <div class="ZoomContainer">
      <img
        class="MapImage"
        src="/assets/logo.svg"
        alt=""
        :style="{
          transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
        }"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { clamp } from "../composables/math.js";
import { usePointer } from "../composables/pointer.js";

export default {
  setup() {
    const { pressed } = usePointer();
    const cursorStyle = computed(() =>
      pressed.value === 0 ? "grabbing" : "grab"
    );

    const position = ref({ x: 0, y: 0 });
    const updatePosition = (pointerMoveEvent) => {
      // Check if the main mouse button is pressed
      if (pressed.value === 0) {
        position.value.x += pointerMoveEvent.movementX / zoom.value;
        position.value.y += pointerMoveEvent.movementY / zoom.value;
      }
    };

    const zoom = ref(1);
    const updateZoom = (wheelEvent) => {
      zoom.value += wheelEvent.wheelDelta * 0.001;
      zoom.value = clamp(zoom.value, 0.5, 5);
    };

    return {
      cursorStyle,
      zoom,
      updateZoom,
      position,
      updatePosition,
    };
  },
};
</script>

<style scoped>
.MapContainer {
  display: flex;
  min-height: inherit;
  min-width: inherit;
  overflow: hidden;
}

.ZoomContainer {
  display: flex;
  min-height: inherit;
  min-width: inherit;
  transform-origin: center center;
  outline: 1px dashed green;
}

.ZoomContainer > .MapImage {
  height: 100%;
  width: auto;
  transform-origin: center center;
  margin: auto;
  outline: 1px solid red;
}
</style>
