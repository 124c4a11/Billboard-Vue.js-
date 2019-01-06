<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md5>
        <v-card class="elevation-12">
          <v-toolbar dark color="light-blue">
            <v-toolbar-title>Login form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" validation>
              <v-text-field
                v-model="email"
                :rules="emailRules"
                prepend-icon="person"
                name="email"
                label="E-mail"
                type="email"
                color="light-blue"
              ></v-text-field>
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"
                color="light-blue"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              @click="onSubmit"
              :loading="loading"
              :disabled="!valid || loading"
              color="light-blue"
              class="white--text"
            >Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';


export default {
  name: 'Login',

  data () {
    return {
      valid: false,

      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],

      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be at least 6 characters'
      ],
    }
  },

  computed: {
    ...mapGetters('shared', [
      'loading'
    ]),
  },

  methods: {
    ...mapActions('user', [
      'loginUser'
    ]),

    onSubmit () {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        };

        this.loginUser(user)
          .then(() => {
            this.$router.push('/');
          })
          .catch((error) => console.log(error));
      }
    }
  }
}
</script>