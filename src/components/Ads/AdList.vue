<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs12 md8 lg6>
        <h1 class="text--secondary mb-3">My ads</h1>
        <v-card
          v-for="ad in myAds"
          :key="ad.id"
          class="evelation-10 mb-3"
        >
          <v-layout row wrap>
            <v-flex xs12 sm4>
              <v-img
                :src="ad.imgSrc"
                height="175"
              ></v-img>
            </v-flex>
            <v-flex xs12 sm8>
              <v-card-text>
                <h2 class="text--primary">{{ ad.title }}</h2>
                <p>{{ ad.description }}</p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  :to="`/ad/${ad.id}`"
                  color="light-blue"
                  class="white--text"
                >Open</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AdList',

  computed: {
    ...mapGetters('ads', {
      myAds: 'myAds'
    }),
  }
}
</script>