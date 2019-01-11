<template>
  <v-container>
    <v-layout v-if="!loading && myAds.length !== 0" row justify-center>
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
                <h2 class="headline">{{ ad.title }}</h2>
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

    <v-layout v-else-if="!loading && myAds.length === 0" row justify-center>
      <v-flex xs12 md8 lg6>
        <h1 class="text--secondary">You have no ads</h1>
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
import { mapGetters } from 'vuex';

export default {
  name: 'AdList',

  computed: {
    ...mapGetters('shared', [
      'loading'
    ]),

    ...mapGetters('ads', [
      'myAds'
    ])
  }
}
</script>