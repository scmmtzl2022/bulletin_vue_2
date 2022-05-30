export default {
    data: () => ({
        valid: true,
        email: "",
        password: "",
        error: "",
        remember: false,

        // validation rules for user email.
        emailRules: [
            value => !!value || "The email field is required.",
            value => /.+@.+\..+/.test(value) || "E-mail must be valid."
        ],

        // validation rules for password.
        pwdRules: [value => !!value || "The password field is required."]
    }),
    methods: {
        /**
         * This to submit login form.
         * @returns void
         */
        login() {
            this.$store
                .dispatch("login", {
                    email: this.email,
                    password: this.password,
                    remember: this.remember
                })
        },
        /**
         * This is remove notification
         * @returns void
         */
        cancelAlert() {
            this.$store.dispatch("cancelAlert")
        }
    },
    beforeDestroy() {
        this.$store.dispatch("cancelAlert")
    }
};