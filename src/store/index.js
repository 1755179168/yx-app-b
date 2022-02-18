import Vue from 'vue';
import Vuex from 'vuex';
import login from './login';
import collapsed from './collapsed';
import list from './list';

Vue.use(Vuex);

export default new Vuex.Store({
//
  strict: true,
  modules: {
    collapsed,
    login,
    list,
  },
});
