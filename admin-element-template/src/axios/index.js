/*
 * Axios 公共请求处理
 * @Author: liangzc 
 * @Date: 2018-04-13 17:47:37 
 * @Last Modified by:   liangzc 
 * @Last Modified time: 2018-04-13 17:47:37 
 */
import axios from 'axios';
import router from '@/router';
import store from '@/store';
import { LOGOUT } from '@/store/types/user';
import { UPDATE_CONFIG } from '@/store/types/global';
import Url from '@/axios/urls';

// # axios 请求额外参数

// axios({

//  silence: false 是否静默请求，静默状态下，不弹出 loading 框，不提示错误信息

//  errorHandle：false  是否手动处理错误信息，为 true 时，不提示错误信息，需要手动实现 catch

//  response: false  是否返回全部请求信息，为 true 时，返回response 信息，包括http 请求信息,为 false 时，仅返回 data 数据

// })

/**更新全局配置  */
store.dispatch(UPDATE_CONFIG, {
  url: Url
});
// axios.defaults.withCredentials = true; //暂时屏蔽Http单实例
!$globalConfig.debug && (axios.defaults.baseURL = Url.baseUrl); //debug模式用 proxyTable 实现跨域请求
axios.defaults.timeout = 30000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
let source = axios.CancelToken.source();
axios.interceptors.request.use(
  config => {
    if (!config.silence && config.loading) {
      //config.silence:是否静默
      config.loading = config.loading || {};
      config.loadingInstance = store._vm.$loading({
        target: config.loading.loadingTarget,
        text: config.loading.text,
        fullscreen: !config.loading.loadingTarget,
        customClass: config.loading.customClass
      });
    }
    let _configData = config.data || config.params || {};
    if (
      config.method === 'post' &&
      config.headers.post &&
      config.headers.post['Content-Type'] === 'application/json;charset=utf-8'
    ) {
      //POST JSON字符串
      if (store._vm.$utils.is('FormData', config.data)) {
        _configData = { [_configData.platform]: _configData.platform };
        config.data.forEach((value, key) => (_configData[key] = value));
      }
      config.data = JSON.stringify(_configData || {});
    } else {
      config.params && (config.params = _configData);
      config.data && (config.data = _configData);
    }
    $globalConfig.console && console.log('[url:::]', config.url);
    $globalConfig.console && console.log('[send:::]', _configData);
    config.cancelToken = source.token;
    return config;
  },
  err => {
    if (!(err.config && err.config.silence)) {
      //config.silence:是否静默
      err.config.loadingInstance && err.config.loadingInstance.close();
      !(err.config || {}).errorHandle && store._vm.$message.error(err.message);
    }
    return Promise.reject(err);
  }
);

//http response 拦截器
axios.interceptors.response.use(
  response => {
    !(response.config && response.config.silence) &&
      response.config.loadingInstance &&
      response.config.loadingInstance.close();
    let responseData = response.data;
    $globalConfig.console &&
      console.log(
        '[response:::]',
        response.config.response === true ? response : responseData
      );
    let msg = !responseData ?
      '请求异常，请重试' :
      responseData.ret === 0 || responseData.status === true ?
        null :
        responseData.errmsg || responseData.message || '响应失败，请重试';
    if (msg) {
      if (responseData && responseData.ret === '4') {
        source.cance(data.msg || '登录超时，请重新登录');
        store.dispatch(LOGOUT);
        router.replace({
          path: '/login',
          query: { redirect: router.currentRoute.fullPath }
        });
      } else {
        !(response.config && response.config.silence) &&
          !(response.config || {}).errorHandle &&
          store._vm.$message({ message: msg, type: 'warning' }); //config.silence:是否静默
      }
      return Promise.reject({
        message: msg,
        data: (responseData || {}).data,
        code: (responseData || {}).ret || (responseData || {}).status
      });
    }
    return response.config.response === true ? response : responseData;
  },
  error => {
    let errMsg =
      error.message && error.message.indexOf('timeout') !== -1 ?
        '请求超时，请重试' :
        error.message;
    if (!(error.config && error.config.silence)) {
      //config.silence:是否静默
      error.config.loadingInstance && error.config.loadingInstance.close();
      !(error.config || {}).errorHandle && store._vm.$message.error(errMsg);
    }
    $globalConfig.console && console.error(error);
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          store.dispatch(LOGOUT);
          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath }
          });
          break;
        default:
          break;
      }
    }
    return Promise.reject({ message: errMsg });
  }
);
/**
 * 带loading 的post 请求
 */
axios.posting = (url, data, loadingOpt) => {
  if (store._vm.$utils.is('Object', url)) {
    return axios(url);
  }
  if (data && data.loadingTarget) {
    loadingOpt = data;
    data = null;
  }
  return axios({
    url: url,
    data: data,
    loading: loadingOpt || {}
  });
};
export default axios;
