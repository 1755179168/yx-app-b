export default {
  //
  namespaced: true,
  state: {
    collapsed: false,
  },
  mutations: {
    isClose(state, payload) {
      state.collapsed = payload;
    },
  },
};
