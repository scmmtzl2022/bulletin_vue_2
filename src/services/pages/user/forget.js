import constant from "../../../constants";
export default {
    data: () => {
        return {
            valid: true,
            forgot: {
                email: "",
            },
            emailRules: [
                (v) => !!v == constant.VALIDATION.EMAIL.REQUIRE || "E-mail is required",
                (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
                (v) =>
                v.length <= constant.VALIDATION.EMAIL.MAX ||
                "Name must be less than 100 characters",
            ],
        };
    },
    methods: {
        /**
         * This is validation function for form data
         * @returns void
         */
        validate() {
            this.$refs.form.validate();
        },

        /**
         * This is reset password function and get email
         * @returns void
         */
        resetPassword() {
            this.$store.dispatch("resetPassword", this.forgot)
        },

        /**
         * This is remove notification
         * @returns void
         */
        cancelAlert() {
            this.$store.dispatch("cancelAlert")
        }
    },
};