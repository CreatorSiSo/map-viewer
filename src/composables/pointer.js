import { ref, onMounted, onUnmounted } from "vue";

export function usePointer() {
  const pressed = ref(-1);

  function down(pointerEvent) {
    pressed.value = pointerEvent.button;
  }

  function up() {
    pressed.value = -1;
  }

  onMounted(() => {
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
  });

  onUnmounted(() => {
    window.removeEventListener("pointerdown", down);
    window.removeEventListener("pointerup", up);
  });

  return { pressed /* , x, y */ };
}
