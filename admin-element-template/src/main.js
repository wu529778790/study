import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import Axios from './axios';
import store from './store';
import { DatePicker, FilterSelect } from './components';
import { Validator, Utils, EventBus } from './plugins';
$globalConfig.debug && require('./mock/index');

Vue.use(Utils);
Vue.use(Validator);
Vue.use(EventBus);

//install axios
let installAxios = () => {
  Vue.axios = Axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return Axios;
      }
    }
  });
};
installAxios();

Vue.use(ElementUI);
Vue.component(DatePicker.name, DatePicker);
Vue.component(FilterSelect.name, FilterSelect);

Vue.config.errorHandler = function(err, vm, info) {
  console.error(info, '\n', err);
  store.dispatch('pushLog', {
    err,
    url: window.location.href
  });
};

window.Vue = Vue;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
