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
            v-model="description"
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
          :disabled="loading"
          @click="triggerUpload"
          color="blue-grey"
          class="white--text ml-0 mb-4"
        >
          Upload
          <v-icon right dark>cloud_upload</v-icon>
        </v-btn>
        <input
          ref="fileInput"
          @change="onFileChange"
          type="file"
          style="display: none"
          accept="image/*"
        >
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex xs12 sm6>
        <img v-if="imgSrc" height="100" :src="imgSrc" alt="">
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
          :loading="loading"
          :disabled="!valid || !img || loading"
          @click="createAd"
          color="success"
          class="ml-0"
        >Create ad</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'NewAd',

  data () {
    return {
      promo: false,
      valid: false,
      img: null,
      imgSrc: '',

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

  computed: {
    ...mapGetters('shared', [
      'loading'
    ]),
  },

  methods: {
    ...mapActions('ads', [
      'createNewAd'
    ]),

    triggerUpload () {
      this.$refs.fileInput.click();
    },

    onFileChange (e) {
      const
        file = e.target.files[0],
        reader = new FileReader();

      reader.onload = () => this.imgSrc = reader.result;

      reader.readAsDataURL(file);

      this.img = file;
    },

    createAd () {
      if (this.$refs.form.validate() && this.img) {
        const ad = {
          title: this.title,
          description: this.description,
          img: this.img,
          promo: this.promo
        };

        this.createNewAd(ad)
          .then( () => this.$router.push('/list') )
          .catch( () => {} );
      }
    }
  }
}
</script>