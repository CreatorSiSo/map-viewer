import { defineStore } from "pinia";
import { clamp } from "../functions/math.js";

export const useMap = defineStore("map", {
  state: () => {
    return {
      zoom: 0.5,
      minZoom: 0.5,
      maxZoom: 10,
      zoomSpeed: 0.0015,
      mapURI: "/assets/MapCombined.jpg",
    };
  },
  actions: {
    zoomBy(amount) {
      this.zoom = clamp(this.zoom + amount, this.minZoom, this.maxZoom);
    },
    zoomTo(value) {
      this.zoom = clamp(value, this.minZoom, this.maxZoom);
    },
  },
});
