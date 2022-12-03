import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  plugins: [createPersistedState({
    paths: ['client']
  })],
  state () {
    return {
      client: null
    }
  },
  mutations: {
    setItem (state,item) {
      state.client = item
    }
  },
  getters: {
    client (state) {
      return state.client
    }
  },
  actions: {
  },
  modules: {
  }
})
