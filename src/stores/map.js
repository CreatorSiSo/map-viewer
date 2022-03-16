import { defineStore } from "pinia";
import { clamp } from "../functions/math.js";

export const useMap = defineStore("map", {
  state: () => {
    return {
      zoom: 1,
      minZoom: 0.6,
      maxZoom: 6,
      zoomSpeed: 0.0015,
      mapURI: "/assets/MapAzura.png",
    };
  },
  actions: {
    zoomBy(amount) {
      const previouszoom = this.zoom;
      this.zoom = clamp(this.zoom + amount, this.minZoom, this.maxZoom);
      console.log(this.zoom - previouszoom);
    },
    zoomTo(value) {
      this.zoom = clamp(value, this.minZoom, this.maxZoom);
    },
  },
});
