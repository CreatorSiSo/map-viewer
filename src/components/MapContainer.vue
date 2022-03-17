<template>
  <div
    class="MapContainer"
    @pointerdown.prevent=""
    @pointerup.prevent=""
    @pointermove="handleMoveEvent"
    @wheel="handleWheelEvent"
    :style="{ cursor: cursorStyle }"
  >
    <div class="ImageWrapper" ref="imageWrapper">
      <img class="MapImage" :src="mapStore.mapURI" alt="" />
    </div>
    <MapOverlay />
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { usePointer } from "../composables/pointer.js";
import MapOverlay from "./MapOverlay.vue";

import { useMap } from "../stores/map.js";

const mapStore = useMap();
const imageWrapper = ref(null);

watch(
  () => mapStore.zoom,
  (zoom) => {
    imageWrapper.value.style.setProperty(
      "--transition-time",
      `${mapStore.time}ms`
    );
    imageWrapper.value.style.setProperty("--zoom", zoom);
  }
);

const handleWheelEvent = (wheelEvent) => {
  mapStore.zoomBy(wheelEvent.wheelDelta * mapStore.zoomSpeed);
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
    position.value.x += pointerMoveEvent.movementX / mapStore.zoom;
    position.value.y += pointerMoveEvent.movementY / mapStore.zoom;
  }
};
</script>

<style scoped>
.MapContainer {
  display: flex;
  overflow: hidden;
  position: relative;
  min-width: 100%;
  min-height: 100%;
  max-width: 100%;
  max-height: 100%;
}

.MapContainer .ImageWrapper {
  --zoom: 0.5;
  --position: 0px, 0px;

  transform: scale(var(--zoom));
  transform-origin: center center;
}

.ImageWrapper .MapImage {
  width: 100%;
  max-width: 100%;
  transform: translate(var(--position));
}
</style>
