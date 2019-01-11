<template>
  <v-dialog v-model="modal" width="400">
    <v-btn depressed slot="activator" class="warning">Edit</v-btn>
    <v-card>
      <v-card-title class="headline">Edit ad</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="editedTitle"
          name="title"
          label="Title"
          type="text"
          color="light-blue"
        ></v-text-field>
        <v-textarea
          v-model="editedDescription"
          name="description"
          label="Ad description"
          color="light-blue"
        ></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="onCancel" flat color="error">Cancel</v-btn>
        <v-btn @click="onSave" class="success">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import { mapActions } from 'vuex';

export default {
  name: 'EditAdModal',

  props: { ad: Object },

  data () {
    return {
      modal: false,
      editedTitle: this.ad.title,
      editedDescription: this.ad.description
    }
  },

  methods: {
    ...mapActions('ads', [
      'updateAd'
    ]),

    onCancel () {
      this.modal = false;

      this.editedTitle = this.ad.title;
      this.editedDescription = this.ad.description;
    },

    onSave () {
      if (this.editedTitle !== '' && this.editedDescription !== '') {
        this.updateAd({
          id: this.ad.id,
          title: this.editedTitle,
          description: this.editedDescription
        });

        this.modal = false;
      }
    }
  }
}
</script>
