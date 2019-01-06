export default {
  namespaced: true,

  state: {
    loading: false,
    error: null
  },

  getters: {
    loading: (state) => state.loading,

    error: (state) => state.error
  },

  mutations: {
    setLoading (state, isLoading) {
      state.loading = isLoading;
    },

    setError (state, error) {
      state.error = error;
    },

    clearError (state) {
      state.error = null;
    }
  },

  actions: {
    setLoading ({ commit }, isLoading) {
      console.log('setLoadingAction');
      commit('setLoading', isLoading);
    },

    setError ({ commit }, error) {
      commit('setError', error);
    },

    clearError ({ commit }) {
      commit('clearError');
    }
  }
}