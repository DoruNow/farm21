import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
  },
  mutations: {
    setLoggedIn(state, payload) {
      state.isLoggedIn = payload.isLoggedIn;
    },
  },
  actions: {},
  modules: {},
});
