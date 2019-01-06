import Vue from 'vue';
import * as fb from 'firebase';
import router from './router';
import store from './store';

import './plugins/vuetify';
import App from './App.vue';


Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    fb.initializeApp ({
      apiKey: 'AIzaSyCLVu4_XzZEueUPlTto72lMQ5mLwjKlC9Y',
      authDomain: 'billboard-dc964.firebaseapp.com',
      databaseURL: 'https://billboard-dc964.firebaseio.com',
      projectId: 'billboard-dc964',
      storageBucket: 'billboard-dc964.appspot.com',
      messagingSenderId: '98307806189'
    });
  }
}).$mount('#app');
