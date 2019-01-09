import * as fb from 'firebase';


class Ad {
  constructor (
    title,
    description,
    imgSrc = '',
    ownerId,
    promo = false,
    id = null,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imgSrc = imgSrc;
    this.ownerId = ownerId;
    this.promo = promo;
  }
}


export default {
  namespaced: true,

  state: {
    ads: []
  },

  getters: {
    ads: (state) => state.ads,

    promoAds: (state) => state.ads.filter( (ad) => ad.promo ),

    myAds: (state) => state.ads,

    adById: (state) => (adId) => state.ads.find( (ad) => ad.id === adId ),
  },

  mutations: {
    createAd (state, ad) {
      state.ads.push(ad);
    },

    loadAds (state, ads) {
      state.ads = ads;
    }
  },

  actions: {
    async createNewAd ({ commit, rootGetters }, ad) {
      commit('shared/clearError', null, { root: true });
      commit('shared/setLoading', true, { root: true });

      try {
        const newAd = new Ad(
          ad.title,
          ad.description,
          ad.imgSrc,
          rootGetters['user/user'].id,
          ad.promo
        );

        const fbAd = await fb.database().ref('ads').push(newAd);

        commit('shared/setLoading', false, { root: true });

        commit('createAd', {
          ...newAd,
          id: fbAd.key
        });
      } catch (error) {
        commit('shared/setError', error.message, { root: true });
        commit('shared/setLoading', false, { root: true });

        throw error;
      }
    },

    async fetchAds ({ commit }) {
      const resultAds = [];

      commit('shared/clearError', null, { root: true });
      commit('shared/setLoading', true, { root: true });

      try {
        const
          response = await fb.database().ref('ads').once('value'),
          ads = response.val();

        Object.keys(ads).forEach((key) => {
          const ad = ads[key];

          resultAds.push(new Ad(
            ad.title,
            ad.description,
            ad.imgSrc,
            ad.ownerId,
            ad.promo,
            key
          ));
        });

        commit('loadAds', resultAds);
        commit('shared/setLoading', false, { root: true });
      } catch (error) {
        commit('shared/setError', error.message, { root: true });
        commit('shared/setLoading', false, { root: true });

        throw error;
      }
    }
  }
}