import { boot } from "quasar/wrappers";
import axios from "axios";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
// const api = axios.create({ baseURL: "http://192.168.0.103:3333" });
const api = axios.create({ baseURL: "http://localhost:3333" });
const token = localStorage.getItem("token");
const AUTH_TOKEN = JSON.parse(token)
export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  api.defaults.headers.post["Content-Type"] = "application/json";
  if (AUTH_TOKEN) {
    api.defaults.headers.common["Authorization"] = `Bearer ${AUTH_TOKEN}`;
  }
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
