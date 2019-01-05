<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-img
            :src="ad.imgSrc"
            aspect-ratio="2.75"
          ></v-img>

          <v-card-title primary-title>
            <div>
              <h1 class="headline mb-3">{{ ad.title }}</h1>
              <div>{{ ad.description }}</div>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="orange">Edit</v-btn>
            <v-btn class="success">Buy</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Ad',

  computed: {
    ...mapGetters('ads', {
      adById: 'adById'
    }),

    id () {
      return this.$route.params.id;
    },

    ad () {
      return this.adById(this.id);
    },
  }
}
</script>