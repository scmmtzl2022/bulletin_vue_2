import constant from "../../../constants";
export default {
    data: () => {
        return {
            valid: true,
            password: {
                new: "",
                confirm: "",
            },
            noti: "",
            errMsg: "",
            errorConfirm: null,
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
    methods: {
        /**
         * This is form validation 
         * @returns void
         */
        validate() {
            this.$refs.form.validate();
        },

        /**
         * This is Reset Password function and reset password to database
         * @returns void
         */
        updatePassword() {
            this.$axios
                .post("/reset/update", {
                    token: this.$route.params.token,
                })
                .then((data) => {
                    this.$axios
                        .put("/user/reset_pw", {
                            email: data.data.email,
                            password: this.password.new,
                        })
                        .then((data) => {
                            console.log(data)
                            this.$store.dispatch("pwsetnoti", data)
                            this.$router.push({ name: "login" })
                        });
                });
        },
    },
    beforeCreate() {
        console.log(this.$route.params.token);
    },
    updated() {
        if (this.password.confirm != this.password.new) {
            this.errorConfirm = "Password and Confirm Password Must be same";
        }
    },
};