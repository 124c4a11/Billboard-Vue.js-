export default {
  namespaced: true,

  state: {
    orders: []
  },

  getters: {},

  mutations: {
    createOrder: (state, order) => state.orders.push(order),
  },

  actions: {
    async createOrder () {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 4000);
      });
    }
  }
}