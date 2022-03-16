<template>
  <div
    class="MapContainer"
    @pointerdown.prevent=""
    @pointerup.prevent=""
    @pointermove="handleMoveEvent"
    @wheel="handleWheelEvent"
    :style="{ cursor: cursorStyle }"
  >
    <img class="MapImage" :src="mapStore.mapURI" alt="" ref="imageWrapper" />
  </div>
  <MapOverlay />
</template>

<script setup>
import { defineProps, ref, computed, watch } from "vue";
import { usePointer } from "../composables/pointer.js";
import MapOverlay from "./MapOverlay.vue";

import { throttle } from "../functions/throttle.js";
import { clamp } from "../functions/math.js";
import { useMap } from "../stores/map.js";

const props = defineProps({
  minZoom: {
    type: Number,
    default: 0.6,
  },
  maxZoom: {
    type: Number,
    default: 6,
  },
});

const mapStore = useMap();
const imageWrapper = ref(null);

let localZoom = mapStore.zoom;
let zoomDelta = 0;

const syncZoom = throttle(() => (mapStore.zoom = localZoom), 500);

const animateZoom = () => {
  localZoom += zoomDelta;
  localZoom = clamp(localZoom, props.minZoom, props.maxZoom);
  imageWrapper.value.style.setProperty("--zoom", localZoom);
};

const handleWheelEvent = (wheelEvent) => {
  zoomDelta = wheelEvent.wheelDelta * mapStore.zoomSpeed;
  window.requestAnimationFrame(animateZoom);
  syncZoom();
};

const { pressed } = usePointer();
const cursorStyle = computed(() => (pressed.value === 0 ? "grabbing" : "grab"));

const position = ref({ x: 0, y: 0 });
watch(
  () => `${position.value.x}px, ${position.value.y}px`,
  (newPosition) => {
    imageWrapper.value.style.setProperty("--position", newPosition);
  }
);

const handleMoveEvent = (pointerMoveEvent) => {
  // Check if the main mouse button is pressed
  if (pressed.value === 0) {
    position.value.x += pointerMoveEvent.movementX / localZoom;
    position.value.y += pointerMoveEvent.movementY / localZoom;
  }
};
</script>

<style scoped>
.MapContainer {
  display: flex;
  min-height: inherit;
  min-width: inherit;
  overflow: hidden;
  transform-origin: center center;
}

.MapContainer > .MapImage {
  --zoom: 1;
  --position: 0px, 0px;

  height: 100%;
  width: auto;
  margin: auto;
  transform-origin: center center;
  transform: scale(var(--zoom)) translate(var(--position));
  /* transition: scale 100ms; */
}
</style>
