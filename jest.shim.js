if (!global.requestAnimationFrame) {
  global.requestAnimationFrame = function(callback) {
    setTimeout(callback, 0);
  };
}
