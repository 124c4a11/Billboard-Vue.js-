<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs12 sm6>
        <h1 class="text--secondary mb-3">Orders</h1>
        <v-list two-line>
          <v-list-tile
            v-for="order in orders"
            :key="order.id"
          >
            <v-list-tile-action>
              <v-checkbox
                :input:value="order.done"
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
  </v-container>
</template>


<script>
export default {
  name: 'Orders',

  data () {
    return {
      orders: [
        {
          id: '1',
          name: 'Name',
          phone: '8-345-34-43-84',
          adId: '123',
          done: false
        },
        {
          id: '1',
          name: 'Name',
          phone: '8-345-34-43-84',
          adId: '123',
          done: false
        },
      ]
    }
  },

  methods: {
    markDone (order) {
      order.done = true;
    }
  }
}
</script>