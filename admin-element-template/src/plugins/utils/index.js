/*
 * @Author: liangzc 
 */
/**
 * @param {Vue} Vue
 * @param {Object} options {utils: {replace: Function,...}}
 */
let install = function(Vue, options) {
  if (install.installed) return;
  Vue.$utils = Vue.prototype.$utils = Object.assign(
    {},
    require('./ui.tool'),
    require('./default'),
    (options || {}).utils || {}
  ); //添加vm实例验证属性
};
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install);
}
module.exports = install;
