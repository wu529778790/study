/* 请求实例插件
 * @Author: wu529778790 
 * @Date: 2018-06-20 15:46:26 
 * @Last Modified by: wu529778790
 * @Last Modified time: 2018-06-20 16:12:45
 */

import axios from 'axios';
import { AXIOS_DEFAULT_CONFIG } from 'Config/index';
import {
  requestSuccessFunc,
  requestFailFunc,
  responseSuccessFunc,
  responseFailFunc
} from 'Config/interceptors/axios';

let axiosInstance = {};

axiosInstance = axios.create(AXIOS_DEFAULT_CONFIG);

// 注入请求拦截
axiosInstance.interceptors.request.use(requestSuccessFunc, requestFailFunc);
// 注入失败拦截
axiosInstance.interceptors.response.use(responseSuccessFunc, responseFailFunc);

export default axiosInstance;
