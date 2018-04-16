/**Pan <panfree23@gmail.com> */
import { asyncRoutes, constantRoutes } from '@/router';
import {
  UPDATE_ROUTES,
  RESET_ROUTERS,
  HAS_PERMISSION,
  GENERATE_ROUTES
} from '@/store/types/permission';

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param role 用户角色 {name, permission}
 * @param route
 */
function hasPermission(role, route) {
  if (role && Array.isArray(role.permission) && route.fullPath) {
    return role.permission.some(permission => permission === route.fullPath);
  }
  return true;
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRoutes
 * @param role 用户角色 {name, permission}
 */
function filterAsyncRouter(asyncRoutes, role) {
  const accessedRouters = asyncRoutes.filter(route => {
    if (hasPermission(role, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, role);
      }
      return true;
    }
    return false;
  });
  return accessedRouters;
}

/**
 * 路由权限过滤
 */
const permission = {
  state: {
    routes: constantRoutes, //全部路由
    accessedRouters: null //允许访问的路由
  },
  getters: {
    routes: state => state.routes,
    accessedRouters: state => state.accessedRouters
  },
  mutations: {
    /**
     * 设置全局路由和可访问路由
     */
    [UPDATE_ROUTES](state, routes) {
      state.accessedRouters = Vue.$utils.deepClone(routes);
      state.routes = Vue.$utils.deepClone(constantRoutes.concat(routes));
    },
    [RESET_ROUTERS](state) {
      state.routes = constantRoutes;
      state.accessedRouters = [];
    }
  },
  actions: {
    /**
     * 检测当前用户是否有权限访问
     */
    [HAS_PERMISSION]({ commit }, data) {
      return new Promise((resolve, reject) => {
        resolve(hasPermission(data.role, data.route));
      });
    },
    /**
     * 根据用户角色过滤可访问路由
     * @param {Array|String} role 角色信息
     */
    [GENERATE_ROUTES]({ commit, state }, role) {
      return new Promise(resolve => {
        let accessedRouters = [];
        role = role || {};
        if (role.name === 'admin' && role.permission === 'ALL') {
          accessedRouters = asyncRoutes;
        } else {
          accessedRouters = filterAsyncRouter(asyncRoutes, role);
        }
        commit(UPDATE_ROUTES, accessedRouters);
        resolve(accessedRouters);
      });
    },
    /**
     * 重置
     */
    [RESET_ROUTERS]({ commit }) {
      commit(RESET_ROUTERS);
    }
  }
};

export default permission;
