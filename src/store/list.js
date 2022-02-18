export default {
  namespaced: true,
  state: {
    data: [],
    show: true,
    title: '',
    childrenTitle: '',
  },
  mutations: {
    data(state, payload) {
      state.data = payload;
    },
    title(state, payload) {
      state.title = payload;
    },
    childrenTitle(state, payload) {
      state.childrenTitle = payload;
    },
    show(state, payload) {
      state.show = payload;
    },
  },
};
