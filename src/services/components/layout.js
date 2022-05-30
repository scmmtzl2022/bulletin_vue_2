import { mapGetters } from "vuex";
import constants from "../../constants";
import cookie from "vue-cookie"
export default {
    data() {
        return {
            title: constants.APP_TITLE,
        };
    },
    computed: {
        ...mapGetters(["isLoggedIn", "userType", "userName"]),
    },
    methods: {
        /**
         * This is to log out from system.
         * @returns void
         */
        logout() {
            this.$store
                .dispatch("logout")
                .then(() => {
                    this.$router.push({ name: "login" });
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        /**
         * This is to route profile page.
         * @returns void
         */
        showProfile() {
            this.$router.push({ name: "profile" })
        },
    },
    beforeCreate() {
        const token = cookie.get("token")
        if (token == null) {
            this.$store.dispatch("logout")
        }
    }
};