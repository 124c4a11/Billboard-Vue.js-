import * as fb from 'firebase';


class Order {
  constructor(
    name,
    phone,
    adId,
    done = false,
    id = null
  ) {
    this.name = name,
    this.phone = phone,
    this.adId = adId,
    this.done = done,
    this.id = id
  }
}


export default {
  namespaced: true,

  state: {
    orders: []
  },

  getters: {},

  mutations: {
    loadOrders: (state, orders) => state.orders = orders
  },

  actions: {
    async createOrder ({ commit }, { name, phone, adId, ownerId }) {
      const order = new Order(name, phone, adId);

      commit('shared/clearError', null, { root: true });

      try {
        await fb.database().ref(`/users/${ownerId}/orders`).push(order);
      } catch (error) {
        commit('shared/setError', error.message, { root: true });
        throw error;
      }
    }
  }
}