/**
 * @function debounce
 * @param {() =>} callback
 * @param {Number} cooldown
 */
function debounce(callback, cooldown) {
  let timeoutId = null;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback.apply(null, args);
    }, cooldown);
  };
}

export { debounce };
