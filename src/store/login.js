export default {
  namespaced: true,
  state: {
    user: null,
    login: 'false',
    role: '',
  },
  mutations: {
    user(state, payload) {
      state.user = payload;
    },
    login(state, payload) {
      state.login = payload;
    },
    role(state, payload) {
      state.role = payload;
    },
  },
};
