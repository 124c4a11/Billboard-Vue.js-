import Vue from 'vue';
import * as fb from 'firebase';
import router from './router';
import store from './store';
import fbconfig from './fbconfig';

import './plugins/vuetify';
import App from './App.vue';
import BuyModal from './components/Shared/BuyModal';


Vue.config.productionTip = false;


Vue.component('app-buy-modal', BuyModal);


new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    fb.initializeApp (fbconfig);

    fb.auth().onAuthStateChanged((user) => {
      if (user) this.$store.dispatch('user/autoLoginUser', user);
    });

    this.$store.dispatch('ads/fetchAds');
  }
}).$mount('#app');
