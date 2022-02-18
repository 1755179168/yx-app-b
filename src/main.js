import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/ant-design-vue';
import '@/assets/style/reset.less';
// Vue.config.productionTip = false;
import event from '@/event';

import '@/mock/index';
// Vue.component('char', Veline);
Vue.prototype.$event = event;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
