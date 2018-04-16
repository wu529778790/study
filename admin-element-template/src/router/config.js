/*
 * 路由配置
 * @Author: liangzc 
 * @Date: 2018-04-13 17:55:55 
 * @Last Modified by: liangzc
 * @Last Modified time: 2018-04-16 10:24:17
 */
const _import = file => () => import(`@/pages/${file}`);

/**
 * redirect : 顶部快捷导航是否支持跳转，redirect:'noredirect' 时不跳转
 * meta: {
 *     title: 菜单名称,
 *     icon: 侧边栏图标 iconfont,
 *     menu: 是否显示在侧边栏菜单,
 *     index: 菜单顺序，默认按照添加顺序生成菜单
 *   }
 **/
export const constantRoutes = [
  { path: '/login', component: _import('login/index') },
  { path: '/404', component: _import('errorPage/404') },
  { path: '/401', component: _import('errorPage/401') }
];

/**
 * 转换 import 导入
 */
let convertImport = route => {
  route.component = _import(route.component);
  if (Array.isArray(route.children) && route.children.length > 0) {
    route.children.forEach(child => convertImport(child));
  }
  return route;
};

/**
 * 动态扫描
 */
let modules = (r => {
  return r.keys().map(key => convertImport(r(key).default));
})(require.context('./', true, /^\.\/modules\/((?!\/)[\s\S])+\.js$/));
modules.unshift({
  path: 'home',
  component: _import('home/index'),
  meta: {
    title: '首页'
  }
});
modules.sort((prev, next) => (prev.meta.index || 0) >= (next.meta.index || 0));

/**
 * 权限动态配置路由
 */
export const asyncRoutes = [
  {
    path: '/',
    component: _import('layout/Layout'),
    redirect: '/home',
    children: modules
  },
  { path: '*', redirect: '/404' }
];
