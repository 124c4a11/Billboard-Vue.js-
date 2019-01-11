<template>
  <v-dialog v-model="modal" width="400">
    <v-btn slot="activator" color="light-blue" class="white--text ml-2">Buy</v-btn>
    <v-card>
      <v-card-title class="headline">Do you wan't to buy it?</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="name"
          name="name"
          label="Your name"
          type="text"
          color="light-blue"
        ></v-text-field>
        <v-text-field
          v-model="phone"
          name="phone"
          label="Your phone"
          type="text"
          color="light-blue"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="localLoading"
          @click="onCancel"
          flat
          color="error"
        >Close</v-btn>
        <v-btn
          :disabled="localLoading"
          :loading="localLoading"
          @click="onSave"
          class="success"
        >Buy it!</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import { mapActions } from 'vuex';

export default {
  name: 'BuyModal',

  props: { ad: Object },

  data () {
    return {
      modal: false,
      localLoading: false,
      name: '',
      phone: ''
    }
  },

  methods: {
    ...mapActions('orders', [
      'createOrder'
    ]),

    onCancel () {
      this.modal = false;

      this.name = '';
      this.phone = '';
    },

    onSave () {
      if (this.name !== '' && this.phone !== '') {
        this.localLoading = true;

        this.createOrder({
          name: this.name,
          phone: this.phone,
          adId: this.ad.id,
          ownerId: this.ad.ownerId
        })
        .finally(() => {
          this.name = '';
          this.phone = '';
          this.localLoading = false;
          this.modal = false;
        });
      }
    }
  }
}
</script>
