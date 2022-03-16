import { defineStore } from "pinia";

export const useMap = defineStore("map", {
  state: () => {
    return {
      zoom: 1,
      maxZoom: 6,
      minZoom: 0.6,
      zoomSpeed: 0.0015,
      mapURI: "/assets/MapAzura.png",
    };
  },
});
