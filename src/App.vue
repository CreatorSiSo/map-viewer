<template>
  <main class="main">
    <MapContainer />
  </main>
</template>

<script>
import "./styles/global.css";
import MapContainer from "./components/MapContainer.vue";

export default {
  components: {
    MapContainer,
  },
};
</script>

<style scoped>
.main {
  display: flex;
  position: relative;
  min-width: 100vw;
  max-width: 100vw;
  min-height: 100vh;
  max-height: 100vh;
}
</style>
