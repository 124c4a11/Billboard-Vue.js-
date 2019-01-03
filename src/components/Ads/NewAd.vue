<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs12 sm6>
        <h1 class="text--secondary mb-3">Create new ad</h1>
        <v-form ref="form" v-model="valid" class="mb-3" validation>
          <v-text-field
            v-model="title"
            :rules="titleRules"
            required
            name="title"
            label="Ad title"
            type="text"
            color="light-blue"
          ></v-text-field>
          <v-textarea
            v-model="password"
            :rules="descriptionRules"
            name="descriptin"
            label="Ad description"
            color="light-blue"
          ></v-textarea>
        </v-form>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex xs12 sm6>
        <v-btn
          :loading="loading3"
          :disabled="loading3"
          @click="loader = 'loading3'"
          color="blue-grey"
          class="white--text ml-0 mb-4"
        >
          Upload
          <v-icon right dark>cloud_upload</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex xs12 sm6>
        <img height="100" src="" alt="">
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex xs12 sm6>
        <v-switch
          label="Add to promo?"
          v-model="promo"
          color="light-blue"
        ></v-switch>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex xs12 sm6>
        <v-btn
          :disabled="!valid"
          @click="createAd"
          color="success"
          class="ml-0"
        >Create ad</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
export default {
  name: 'NewAd',

  data () {
    return {
      promo: false,
      valid: false,

      title: '',
      titleRules: [
        v => !!v || 'Title is required',
      ],

      description: '',
      descriptionRules: [
        v => !!v || 'Description is required',
      ]
    }
  },

  methods: {
    createAd () {
      if (this.$refs.form.validate()) {
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.promo
        };
      }
    }
  }
}
</script>