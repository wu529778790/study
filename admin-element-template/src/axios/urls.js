/*
 * 全局URL配置
 * @Author: liangzc 
 * @Date: 2018-04-13 17:48:21 
 * @Last Modified by:   liangzc 
 * @Last Modified time: 2018-04-13 17:48:21 
 */
const Config = {
  prod: 'http://pay81.phtonspark.com', //Production
  uat: 'http://pay81.phtonspark.com', //UAT
  sit: 'http://dev.phtonspark.com', //SIT
  dev: 'http://localhost:9000' //DEV
};

const REQUEST_URL = Config[process.env.ENV_CONFIG];

const Url = {
  baseUrl: `${REQUEST_URL}/api`,

  /**资源路径 */
  asserts: `${REQUEST_URL}/asserts`
};
export default Url;
