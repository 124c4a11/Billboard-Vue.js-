import * as fb from 'firebase';


class User {
  constructor (id) {
    this.id = id;
  }
}


export default {
  namespaced: true,

  state: {
    user: null
  },

  getters: {
    user: (state) => state.user,

    isUserLogedIn: (state) => state.user !== null,
  },

  mutations: {
    setUser (state, user) {
      state.user = user;
    }
  },

  actions: {
    async registerUser ({ commit }, { email, password }) {
      commit('shared/clearError', null, { root: true });
      commit('shared/setLoading', true, { root: true });

      try {
        const user = await fb.auth().createUserWithEmailAndPassword(email, password);

        commit('setUser', new User(user.uid));
        commit('shared/setLoading', false, { root: true });
      } catch (error) {
        commit('shared/setLoading', false, { root: true });
        commit('shared/setError', error.message, { root: true });

        throw error;
      }
    },

    async loginUser ({ commit }, { email, password }) {
      commit('shared/clearError', null, { root: true });
      commit('shared/setLoading', true, { root: true });

      try {
        const user = await fb.auth().signInWithEmailAndPassword(email, password);

        commit('setUser', new User(user.uid));
        commit('shared/setLoading', false, { root: true });
      } catch (error) {
        commit('shared/setLoading', false, { root: true });
        commit('shared/setError', error.message, { root: true });

        throw error;
      }
    },

    autoLoginUser ({ commit }, payload) {
      commit('setUser', payload.uid);
    },

    logoutUser ({ commit }) {
      fb.auth().signOut();
      commit('setUser', null);
    }
  }
}