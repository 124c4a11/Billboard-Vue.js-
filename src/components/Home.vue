<template>
  <div>
    <v-container fluid>
      <v-carousel>
        <v-carousel-item
          v-for="ad in ads"
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
              aspect-ratio="2.75"
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
              <v-btn color="light-blue" class="white--text">Buy</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>


<script>
export default {
  name: 'Home',

  data () {
    return {
      ads: [
        {
          id: '1',
          title: 'Ad title',
          description: 'Ad description',
          imgSrc: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          promo: true
        },
        {
          id: '2',
          title: 'Ad title',
          description: 'Ad description',
          imgSrc: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
          promo: true
        },
        {
          id: '3',
          title: 'Ad title',
          description: 'Ad description',
          imgSrc: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
          promo: false
        },
      ]
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
