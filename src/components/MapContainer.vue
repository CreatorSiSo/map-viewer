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
        :src="mapURI"
        alt=""
        :style="{
          transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
        }"
      />
    </div>
  </div>
  <MapOverlay />
</template>

<script>
import { ref, computed } from "vue";
import { clamp } from "../composables/math.js";
import { usePointer } from "../composables/pointer.js";
import MapOverlay from "./MapOverlay.vue";

export default {
  props: {
    maxZoom: { type: Number, default: 6 },
    minZoom: { type: Number, default: 0.6 },
    zoomSpeed: { type: Number, default: 0.0015 },
    mapURI: { type: String, default: "/assets/MapAzura.png" },
  },
  components: {
    MapOverlay,
  },
  setup(props) {
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

    const log = (...args) => console.log(args);

    const zoom = ref(1);
    const updateZoom = (wheelEvent) => {
      zoom.value += wheelEvent.wheelDelta * props.zoomSpeed;
      zoom.value = clamp(zoom.value, props.minZoom, props.maxZoom);
    };

    return {
      log,
      cursorStyle,
      zoom,
      updateZoom,
      position,
      updatePosition,
    };
  },
  components: { MapOverlay },
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
