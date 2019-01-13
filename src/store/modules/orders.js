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

  getters: {
    doneOrders: (state) => state.orders.filter( (order) => order.done ),

    undoneOrders: (state) => state.orders.filter( (order) => !order.done ),

    orders: (state, getters) => getters.undoneOrders.concat(getters.doneOrders)
  },

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
    },

    async fetchOrders ({ commit, rootGetters }) {
      commit('shared/clearError', null, { root: true });
      commit('shared/setLoading', true, { root: true });

      const resultOrders = [];

      try {
        const
          response = await fb.database().ref(`/users/${rootGetters['user/user'].id}/orders`).once('value'),
          orders = response.val();

        if (orders) {
          Object.keys(orders).forEach((key) => {
            const order = orders[key];

            resultOrders.push(
              new Order(order.name, order.phone, order.adId, order.done, key)
            );
          });
        }

        commit('loadOrders', resultOrders);
        commit('shared/setLoading', false, { root: true });
      } catch (error) {
        commit('shared/setLoading', false, { root: true });
        commit('shared/setError', error.message, { root: true });

        throw error;
      }
    },

    async markOrderDone ({ commit, rootGetters }, orderId) {
      commit('shared/clearError', null, { root: true });

      try {
        await fb.database().ref(`/users/${rootGetters['user/user'].id}/orders`).child(orderId).update({ done: true });
      } catch (error) {
        commit('shared/setError', error.message, { root: true });
        throw error;
      }
    }
  }
}