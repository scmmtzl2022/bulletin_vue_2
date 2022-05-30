import constant from "../../../constants";
import { mapGetters } from "vuex";
export default {
    data: () => {
        return {
            valid: true,
            password: {
                id: "",
                current: "",
                new: "",
                confirm: "",
            },
            noti: "",
            errMsg: "",
            errorConfirm: null,

            /**
             * This is Passwords Validation Rules
             */
            passRules: [
                (v) =>
                !!v == constant.VALIDATION.PASS.REQUIRE || "Password is required",
                (v) =>
                v.length >= constant.VALIDATION.PASS.MIN ||
                "Name must be at least 8 characters",
            ],
            cpassRules: [
                (v) =>
                !!v == constant.VALIDATION.PASS.REQUIRE || "Password is required",
            ],
        };
    },
    computed: {
        ...mapGetters(["userId"]),
    },
    methods: {
        /**
         * This is Validation for form data
         * @returns void
         */
        validate() {
            this.$refs.form.validate();
        },

        /**
         * 
         */
        updatePassword() {
            this.password.id = this.userId;
            this.$store.dispatch("updatePassword", this.password);
        },

        /**
         * This is Remove Notificaiton
         * @returns void
         */
        cancelAlert() {
            this.$store.dispatch("pwAlert")
        }
    },
    beforeCreate() {
        this.user = this.userInfo;
    },
    updated() {
        if (this.password.confirm != this.password.new) {
            this.errorConfirm = "Password and Confirm Password Must be same";
        }
    },
};