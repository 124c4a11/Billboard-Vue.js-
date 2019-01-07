<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawerIsOpen"
      app
      temporary
    >
      <v-list>
        <v-list-tile
          v-for="(link, ndx) in links"
          :key="ndx"
          :to="link.url"
        >
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title v-text="link.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app dark color="light-blue">
      <v-toolbar-side-icon
        @click="drawerIsOpen = !drawerIsOpen"
        class="hidden-md-and-up"
      ></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" class="logo-link">Billboard</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          v-for="(link, ndx) in links"
          :key="ndx"
          :to="link.url"
          flat
        >
          <v-icon left>{{ link.icon }}</v-icon>
          {{ link.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <template v-if="error">
      <v-snackbar
        :multi-line="true"
        :value="true"
        @input="closeError"
        color="error"
      >
        {{ error }}

        <v-btn
          dark
          flat
          @click="closeError"
        >
          Close
        </v-btn>
      </v-snackbar>
    </template>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';


export default {
  name: 'App',

  data () {
    return {
      drawerIsOpen: false,

      links: [
        { title: 'Login', icon: 'lock', url: '/login' },
        { title: 'Registration', icon: 'face', url: '/registration' },
        { title: 'Orders', icon: 'bookmark_border', url: '/orders' },
        { title: 'New ad', icon: 'note_add', url: '/new' },
        { title: 'My ads', icon: 'list', url: '/list' },
      ]
    }
  },

  computed: {
    ...mapGetters('shared', [
      'error'
    ]),
  },

  methods: {
    ...mapActions('shared', [
      'clearError'
    ]),

    closeError () {
      this.clearError();
    }
  }
}
</script>


<style scoped>
  .logo-link {
    text-decoration: none;
    color: #fff;
  }
</style>
