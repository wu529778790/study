/* 路由拦截
 * @Author: wu529778790 
 * @Date: 2018-06-20 15:45:12 
 * @Last Modified by:   wu529778790 
 * @Last Modified time: 2018-06-20 15:45:12 
 */

export function routerBeforeEachFunc(to, from, next) {
  // 这里可以做页面拦截，很多后台系统中也非常喜欢在这里面做权限处理

  next();
}
