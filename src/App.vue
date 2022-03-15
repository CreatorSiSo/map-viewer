<script setup>
import "./styles/global.css";
import MapContainer from "./components/MapContainer.vue";
</script>

<template>
  <main class="main">
    <!-- <div id="MapOverlay">Overlay</div> -->

    <MapContainer />
  </main>
</template>

<style scoped>
.main {
  display: flex;
  position: relative;
  min-width: 100vw;
  max-width: 100vw;
  min-height: 100vh;
  max-height: 100vh;
}

#MapOverlay {
  position: absolute;
  inset: 0;
}
</style>
