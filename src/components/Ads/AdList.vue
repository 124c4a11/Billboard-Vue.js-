<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs12 md8 lg6>
        <h1 class="text--secondary mb-3">My ads</h1>
        <v-card
          v-for="ad in ads"
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
export default {
  name: 'AdList',

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