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
    },

    updateAd (state, { id, title, description }) {
      const ad = state.ads.find( (item) => item.id === id );

      ad.title = title;
      ad.description = description;
    }
  },

  actions: {
    async createNewAd ({ commit, rootGetters }, ad) {
      commit('shared/clearError', null, { root: true });
      commit('shared/setLoading', true, { root: true });

      const img = ad.img;

      try {
        const newAd = new Ad(
          ad.title,
          ad.description,
          '',
          rootGetters['user/user'].id,
          ad.promo
        );

        const
          fbAd = await fb.database().ref('ads').push(newAd),
          imgExt = img.name.slice( img.name.lastIndexOf('.') );

        // upload file in storage
        await fb.storage().ref(`ads/${fbAd.key}${imgExt}`).put(img);

        const imgSrc = await fb.storage().ref(`ads/${fbAd.key}${imgExt}`).getDownloadURL();

        // set imgSrc for ad in database
        await fb.database().ref('ads').child(fbAd.key).update({ imgSrc });

        commit('shared/setLoading', false, { root: true });

        commit('createAd', {
          ...newAd,
          id: fbAd.key,
          imgSrc
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
    },

    async updateAd ({ commit }, { id, title, description }) {
      commit('shared/clearError', null, { root: true });
      commit('shared/setLoading', true, { root: true });

      console.log(id, title, description);

      try {
        await fb.database().ref('ads').child(id).update({ title, description });

        commit('updateAd', { id, title, description });
        commit('shared/setLoading', false, { root: true });
      } catch (error) {
        commit('shared/setError', error.message, { root: true });
        commit('shared/setLoading', false, { root: true });

        throw error;
      }
    }
  }
}