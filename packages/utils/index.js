
/**
 * 判断是否桌面端
 * @returns {Boolean}
 */
export function isPC() {
  const userAgentInfo = navigator.userAgent;
  const agents = ["Android", "iPhone","SymbianOS", "Windows Phone","iPad", "iPod"];
  return !agents.some(n => userAgentInfo.includes(n));
}

/**
 * 节流函数
 * @param {Function} fn 函数
 * @param {Number} timespan 节流时间
 * @returns {Function}
 */
export function throttle(fn, timespan = 100) {
  let lastTime = 0;
  return function (...args) {
    if (typeof fn !== 'function') {
      throw new Error(`${fn} is not a function`)
    }
    const _this = this;
    if (Date.now() - lastTime < timespan) {
      return;
    }
    lastTime = Date.now();
    return fn.apply(_this, args);
  }
}
