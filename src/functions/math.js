/**
 * @function clamp
 * @param {Number} number
 * @param {Number} min
 * @param {Number} max
 */
const clamp = (number, min, max) => Math.min(Math.max(number, min), max);

export { clamp };
