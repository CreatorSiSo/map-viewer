<template>
  <div
    class="MapContainer"
    @pointerdown.prevent=""
    @pointerup.prevent=""
    @pointermove="updatePosition"
    @wheel="handleWheelEvent"
    :style="{ cursor: cursorStyle }"
  >
    <div class="ZoomContainer">
      <img class="MapImage" :src="mapStore.mapURI" alt="" ref="mapImage" />
    </div>
  </div>
  <MapOverlay />
</template>

<script setup>
import { ref, computed } from "vue";

import { throttle } from "../functions/throttle.js";
import { clamp } from "../composables/math.js";
import { usePointer } from "../composables/pointer.js";
import { useMap } from "../stores/map.js";

import MapOverlay from "./MapOverlay.vue";

const mapStore = useMap();
const mapImage = ref(null);

const { pressed } = usePointer();
const cursorStyle = computed(() => (pressed.value === 0 ? "grabbing" : "grab"));

const position = ref({ x: 0, y: 0 });
const updatePosition = (pointerMoveEvent) => {
  // Check if the main mouse button is pressed
  if (pressed.value === 0) {
    position.value.x += pointerMoveEvent.movementX / localZoom;
    position.value.y += pointerMoveEvent.movementY / localZoom;
  }
};

const syncCooldown = 250;
let startTimestamp = 0;
let localZoom = mapStore.zoom;

const animateZoom = (timestamp) => {
  localZoom += zoomDelta.value;
  localZoom = clamp(localZoom, mapStore.minZoom, mapStore.maxZoom);
  mapImage.value.style.transform = `scale(${localZoom})`;
  zoomDelta.value = 0;

  if (timestamp < startTimestamp + syncCooldown) {
    window.requestAnimationFrame(animateZoom);
  } else {
    mapStore.zoom = localZoom;
  }
};

const updateZoom = throttle(
  () => {
    startTimestamp = performance.now();
    window.requestAnimationFrame(animateZoom);
  },
  syncCooldown,
  true
);

const zoomDelta = ref(0);
const handleWheelEvent = (wheelEvent) => {
  zoomDelta.value += wheelEvent.wheelDelta * mapStore.zoomSpeed;
  updateZoom(zoomDelta);
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
}

.ZoomContainer > .MapImage {
  height: 100%;
  width: auto;
  transform-origin: center center;
  margin: auto;
}
</style>

<!-- const log = (...args) => console.log(args); -->
