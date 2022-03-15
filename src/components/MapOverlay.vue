<template>
  <div class="MapOverlay" @click="$emit('zoom', -1)">
    <div class="ZoomButtonsContainer">
      <button @click="$emit('zoom', 1)" class="ZoomButton Plus">P</button>
      <button @click="$emit('zoom', -1)" class="ZoomButton Minus">M</button>
    </div>
  </div>
</template>

<script></script>

<style scoped>
.MapOverlay {
  display: flex;
  position: absolute;
  min-width: inherit;
  min-height: inherit;
}

.ZoomButtonsContainer {
  display: flex;
  width: fit-content;
  flex-direction: column;
  gap: 0.8rem;
  margin-top: min(3rem, 10vh);
  filter: drop-shadow(4px 4px 6px rgba(0, 0, 0, 0.1));
}

.ZoomButton {
  width: 5rem;
  height: 5rem;
  padding-inline-end: 1rem;
  text-align: end;
  cursor: pointer;
  border: none;
  /* border-radius: 0 1rem 1rem 0; */

  font-size: 3rem;
  font-weight: 900;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
  color: white;
  clip-path: polygon(
    0% 0%,
    86% 0%,
    99% 0%,
    98% 27%,
    91% 29%,
    100% 30%,
    99% 74%,
    94% 80%,
    98% 90%,
    94% 100%,
    57% 98%,
    0% 100%
  );
  transition: width 150ms;
}

.ZoomButton:hover {
  width: 6rem;
}

.ZoomButton.Plus {
  background-color: #80de82;
}

.ZoomButton.Minus {
  background-color: #dd6a6a;
}
</style>
