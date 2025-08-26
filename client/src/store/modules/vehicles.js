import api from '@/services/authentication';  // наш axios‑инстанс



const state = {
  products: [],
};

const mutations = {
  initializeStore(state, newData) {
    state.products = newData;
  },
};

const actions = {




  async loadVehicle({ commit }) {
    try {
      const response = await api.get("/api/info/card");
      commit("initializeStore", response.data);
const drivers=response.data;
      const nightDriverInfo= await Promise.all(drivers.map(async (driver) => {
        try{
          const nightResponse = await api.get(`/night/${driver.id}`);
          return{
            ...driver,
            isNight: nightResponse.data.isNight,
          };

        }catch (error){
          console.warn(`Не удалось загрузить isNight для водителя ${driver.id}`);
          return{
            ...driver,
            isNight: false,
          };
        }

      }))
      commit("initializeStore", nightDriverInfo);
    }
    catch (err) {
      console.log(err);
      if (err.response && err.response.status === 401) {
        // this.$router.push('/login');

      }
    }
  },

  async addVehicle({ dispatch }, payload) {
    try {
      const { isNight, ...driverData } = payload;


      const response = await api.post("/api/info/card", driverData);
      const driverId = response.data.id;


      if (typeof isNight !== 'undefined') {
        await api.post(`/night/${driverId}`, { isNight });
      }

      // 3. Обновляем список
      dispatch("loadVehicle");
    } catch (err) {
      console.error("Ошибка при добавлении водителя:", err);
    }
  },


  async removeVehicle({ dispatch }, id) {
    await api.delete(`/api/info/card/${id}`);
    dispatch("loadVehicle");
  },
};

const getters = {
  getVehicleInfo(state) {
    return state.products;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
