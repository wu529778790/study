/*
 * 用户信息Module
 * @Author: liangzc 
 * @Date: 2018-01-18 11:30:31 
 * @Last Modified by: wu529778790
 * @Last Modified time: 2018-04-16 13:24:37
 */
import {
  LOGOUT,
  INIT_USER,
  UPDATE_USER,
  UPDATE_ROLES,
  GET_USER_INFO
} from '@/store/types/user';
import { RESET_ROUTERS } from '@/store/types/permission';
import { DEL_VISITED_VIEWS } from '@/store/types/global';
const user = {
  state: {
    user: null, //用户信息
    /**
     * name 角色名称
     * permission 权限列表
     */
    role: null
  },
  getters: {
    id: (state, getters) => (getters.user || {}).id, //授权身份标识
    isLogin: (state, getters) => {
      //是否登录，校验本地存储的 id
      let user = getters.user;
      return user && !Vue.$utils.isEmpty(user.id);
    },
    user: state => state.user || {},
    role: state => state.role
  },
  mutations: {
    /**
     * 触发登出，暂时闲置
     */
    [LOGOUT]: state => {
      localStorage.removeItem('phton_u_info');
      state.user = null;
    },
    /**
     * 更新本地用户缓存(包含有效时间,默认1天)
     */
    [UPDATE_USER]: (state, userInfo) => {
      if (!Vue.$utils.isEmptyObject(userInfo)) {
        Vue.$utils.setLocalItem('phton_u_info', state.user = userInfo, {
          exp: 60 * 60 * 24,
          needCipher: true
        });
      }
    },
    /**
     * 缓存用户角色
     */
    [UPDATE_ROLES]: (state, role) => {
      state.role = role;
    }
  },
  actions: {
    /**
     * 登出事件
     */
    [LOGOUT]({ dispatch, commit }) {
      commit(LOGOUT);
      commit(UPDATE_USER, null);
      commit(UPDATE_ROLES, null);
      dispatch(DEL_VISITED_VIEWS);
      dispatch(RESET_ROUTERS);
    },
    /**
     * 初始化用户信息
     */
    [INIT_USER](context) {
      !context.state.user &&
        context.commit(
          UPDATE_USER,
          Vue.$utils.getLocalItem('phton_u_info', true) || {}
        );
    },
    /**
     * 更新缓存用户信息
     * @param {*} commit module
     * @param {Object} userInfo 用户信息
     */
    [UPDATE_USER]({ commit }, userInfo) {
      return new Promise(resolve => {
        commit(UPDATE_USER, userInfo);
        resolve(userInfo);
      });
    },
    /**
     * 设置用户角色
     * @param {*} role 用户角色
     */
    [UPDATE_ROLES]({ commit }, role) {
      return new Promise(resolve => {
        commit(UPDATE_ROLES, role);
        resolve(role);
      });
    },
    /**
     * 获取用户信息
     */
    [GET_USER_INFO]({ commit }) {
      return new Promise((resolve, reject) => {
        Vue.axios
          .post('service/getUserAndRole')
          .then(resp => {
            let data = resp.data;
            commit(UPDATE_USER, data.userInfo);
            commit(UPDATE_ROLES, data.role);
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
};

export default user;
