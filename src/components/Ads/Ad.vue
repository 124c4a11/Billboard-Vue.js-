<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card v-if="!loading">
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
            <app-edit-ad-modal v-if="isOwner" :ad="ad"></app-edit-ad-modal>
            <app-buy-modal v-if="!isOwner" :ad="ad"></app-buy-modal>
          </v-card-actions>
        </v-card>

        <div v-else class="text-xs-center">
          <v-progress-circular
            :size="50"
            :width="5"
            color="light-blue"
            indeterminate
          ></v-progress-circular>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import { mapGetters } from 'vuex';
import AppEditAdModal from './EditAdModal';

export default {
  name: 'Ad',

  components: {
    AppEditAdModal
  },

  computed: {
    ...mapGetters('ads', [
      'adById'
    ]),

    ...mapGetters('shared', [
      'loading'
    ]),

    ...mapGetters('user', [
      'user'
    ]),

    id () {
      return this.$route.params.id;
    },

    ad () {
      return this.adById(this.id);
    },

    isOwner () {
      if (this.user) return this.ad.ownerId === this.user.id;
      return false;
    }
  }
}
</script>