import Vue from "vue";
import axios from "axios";

Vue.prototype.$axios = axios;

export default {
  api_rest: axios.create({
    baseURL: "http://0.0.0.0:8000/rest/v1/hotels",
    headers: {
      "Content-type": "application/json"
    }
  }),

  geocode: axios.create({
    baseURL: "http://open.mapquestapi.com/geocoding/v1/batch/",
    headers: {
      "Content-type": "application/json"
    }
  }),

  coords: axios.create({
    baseURL: "http://0.0.0.0:8000/rest/v1/hello",
    headers: {
      "Content-type": "application/json"
    }
  })
};
