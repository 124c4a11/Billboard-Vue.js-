<template>
  <div v-if="!loading">
    <v-container fluid>
      <v-carousel>
        <v-carousel-item
          v-for="ad in promoAds"
          :key="ad.id"
          :src="ad.imgSrc"
        >
          <div class="v-carousel__item-link-wrapper">
            <v-btn
              :to="`/ad/${ad.id}`"
              class="error text--white"
            >{{ ad.title }}</v-btn>
          </div>
        </v-carousel-item>
      </v-carousel>
    </v-container>

    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex
          v-for="ad in ads"
          :key="ad.id"
          xs12
          sm6
          md4
        >
          <v-card>
            <v-img
              :src="ad.imgSrc"
              aspect-ratio="2"
            ></v-img>

            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ ad.title }}</h3>
                <div>{{ ad.description }}</div>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn :to="`/ad/${ad.id}`" flat color="light-blue">Open</v-btn>
              <app-buy-modal v-if="!isOwner(ad.ownerId)" :ad="ad"></app-buy-modal>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>

  <div v-else>
    <v-container>
      <v-layout row justify-center align-center>
        <v-progress-circular
          :size="50"
          :width="5"
          color="light-blue"
          indeterminate
        ></v-progress-circular>
      </v-layout>
    </v-container>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Home',

  computed: {
    ...mapGetters('ads', [
      'ads',
      'promoAds',
    ]),

    ...mapGetters('shared', [
      'loading'
    ]),

    ...mapGetters('user', [
      'user'
    ]),

    isOwner () {
      return (ownerId) => {
        if (this.user) return ownerId === this.user.id;
        return false;
      };
    }
  }
}
</script>


<style>
.v-carousel__item-link-wrapper {
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
