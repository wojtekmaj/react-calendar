if (!global.requestAnimationFrame) {
  global.requestAnimationFrame = function requestAnimationFrame(callback) {
    setTimeout(callback, 0);
  };
}
