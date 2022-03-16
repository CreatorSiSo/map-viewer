function throttle(callback, wait, immediate = false) {
  let timeout = null;
  let initialCall = true;

  return () => {
    const callNow = immediate && initialCall;
    const next = () => {
      callback.apply(this, arguments);
      timeout = null;
    };

    if (callNow) {
      initialCall = false;
      next();
    }

    if (!timeout) {
      timeout = setTimeout(next, wait);
    }
  };
}

export { throttle };
