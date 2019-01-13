<template>
  <v-container>
    <v-layout v-if="!loading && orders.length !== 0" row justify-center>
      <v-flex xs12 sm6>
        <h1 class="text--secondary mb-3">Orders</h1>
        <v-list two-line>
          <v-list-tile
            v-for="order in orders"
            :key="order.id"
          >
            <v-list-tile-action>
              <v-checkbox
                v-model="order.done"
                @change="markDone(order)"
                color="success"
              ></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ order.name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ order.phone }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn
                :to="`/ad/${order.adId}`"
                color="light-blue"
                class="white--text"
              >Open</v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>

    <v-layout v-else-if="!loading && orders.length === 0" row justify-center>
      <v-flex xs12 sm6>
        <h1 class="text--secondary">You have no orders</h1>
      </v-flex>
    </v-layout>

    <div v-else class="text-xs-center">
      <v-progress-circular
        :size="50"
        :width="5"
        color="light-blue"
        indeterminate
      ></v-progress-circular>
    </div>
  </v-container>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Orders',

  computed: {
    ...mapGetters('shared', [
      'loading',
    ]),

    ...mapGetters('orders', [
      'orders'
    ])
  },

  methods: {
    ...mapActions('orders', [
      'fetchOrders',
      'markOrderDone'
    ]),

    markDone (order) {
      this.markOrderDone(order.id)
        .then( () => order.done = true )
        .catch( () => {} )
    }
  },

  created () {
    this.fetchOrders();
  }
}
</script>