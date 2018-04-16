/*
 * 错误日志
 * @Author: liangzc 
 * @Date: 2018-04-08 10:19:49 
 * @Last Modified by: liangzc
 * @Last Modified time: 2018-04-08 10:58:55
 */
import { PUSH_LOG, CLEAR_LOG } from '@/store/types/error';
const errlog = {
  state: {
    errLog: []
  },
  getters: {
    errLog: state => state.errLog
  },
  mutations: {
    /**
     * 记录错误日志
     */
    [PUSH_LOG]: (state, log) => {
      state.errLog.unshift(log);
    },
    /**
     * 清除错误日志
     */
    [CLEAR_LOG]: (state, log) => {
      state.errLog = [];
    }
  },
  actions: {
    /**
     * 记录错误日志
     * @param {Object} log 错误日志
     */
    pushLog({ commit }, log) {
      commit(PUSH_LOG, log);
    },
    clearLog({ commit }) {
      commit(CLEAR_LOG);
    }
  }
};

export default errlog;
