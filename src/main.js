import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import axios from "axios";
import moment from "moment";
import vuetify from "./plugins/vuetify";
var VueCookie = require('vue-cookie');
Vue.use(VueCookie);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$store = store;
Vue.prototype.moment = moment;
new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
    /**
     * This is to set token to any request to server side.
     * @returns Resquest with configurations
     */
    created() {
        axios.interceptors.request.use(
            function(config) {
                if (store.state.user) {
                    const tokenType = "Bearer";
                    const token = store.state.user.token;
                    if (token) config.headers.Authorization = `${tokenType} ${token}`;
                }
                return config;
            },
            function(error) {
                return Promise.reject(error);
            }
        );
    },
}).$mount("#app");