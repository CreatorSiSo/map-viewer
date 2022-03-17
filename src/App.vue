<template>
  <div class="App">
    <header>
      <PageHeader />
    </header>
    <main class="Main">
      <MapContainer />
    </main>
  </div>
</template>

<script>
import "./styles/global.css";
import MapContainer from "./components/MapContainer.vue";
import PageHeader from "./components/PageHeader.vue";

export default {
  components: {
    MapContainer,
    PageHeader,
  },
};
</script>

<style scoped>
.App {
  display: flex;
  flex-direction: column;
  min-width: 100vw;
  min-height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
}

.Main {
  display: flex;
  flex-grow: 1;
  min-width: 100%;
  min-height: 100%;
  max-width: 100%;
  max-height: 100%;
}
</style>
