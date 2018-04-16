/*
 * 路由全局配置
 * @Author: liangzc 
 * @Date: 2018-04-13 17:56:39 
 * @Last Modified by:   liangzc 
 * @Last Modified time: 2018-04-13 17:56:39 
 */
import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条样式
import { constantRoutes, asyncRoutes } from './config';

Vue.use(Router);

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
});

const whiteList = ['/login']; // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start();
  //初始化用户信息（详情 /store/modules/user）
  store.dispatch('initUser');
  document.title = to.meta.title || to.params.title || document.title;
  if (store.getters.isLogin) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      if (!store.getters.role) {
        store
          .dispatch('getUserInfo')
          .then(info => {
            store
              .dispatch('generateRoutes', info.role)
              .then(accessedRouters => {
                // 生成可访问的路由表
                router.addRoutes(accessedRouters); // 动态添加可访问路由表
                next({ ...to }); // hack方法 确保addRoutes已完成
              });
          })
          .catch(err => {
            store.dispatch('logout');
            next({
              path: '/login',
              query: {
                redirect: to.fullPath
              } //将跳转的路由path作为参数
            });
          });
      } else {
        store
          .dispatch('hasPermission', { role: store.getters.role, route: to })
          .then(has => {
            if (has) {
              next();
            } else {
              next({
                path: to.query.from === 'login' ? '/' : '/401',
                query: { noGoBack: true }
              });
            }
          });
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        } //将跳转的路由path作为参数
      });
      NProgress.done(); // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
    }
  }
});

router.afterEach(route => {
  NProgress.done();
});
export { constantRoutes, asyncRoutes };
export default router;
