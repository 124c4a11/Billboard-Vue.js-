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
      }
    ]
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
    }
  }
}