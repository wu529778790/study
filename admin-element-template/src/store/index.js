/*
 * 全局状态管理
 * @Author: liangzc 
 * @Date: 2018-04-13 17:57:06 
 * @Last Modified by:   liangzc 
 * @Last Modified time: 2018-04-13 17:57:06 
 */
import Vue from 'vue';
import Vuex from 'vuex';
import global from './modules/global';
import user from './modules/user';
import permission from './modules/permission';
import errlog from './modules/errLog';
Vue.use(Vuex);

/**Default Module */
const store = new Vuex.Store({
  modules: {
    global,
    user,
    permission,
    errlog
  },
  strict: process.env.NODE_ENV !== 'production'
});
export default store;
