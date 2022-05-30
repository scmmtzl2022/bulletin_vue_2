import constant from "../../constants";
export default {
    data: () => {
        return {
            csvfile: null,
            user_id: "",
            errorMsg: null,
            errorMsg1: null,
            noti: null,
            csvRules: [
                (v) =>
                !!v == constant.VALIDATION.CSV.REQUIRE || "File field is required",
            ],
        };
    },
    methods: {
        /**
         * This is CSV Upload Function
         * @returns void
         */
        upload() {
            this.user_id = this.$store.state.user.user.id;
            const formData = new FormData();
            formData.append("file", this.csvfile);
            formData.append("user_id", this.user_id);
            this.$axios
                .post("post/upload", formData)
                .then((response) => {
                    console.log(response);
                    this.noti = response.data;
                    this.csvfile = null
                })
                .catch((error) => {
                    if (error.response.data.error2) {
                        this.errorMsg = error.response.data.error1.title[0];
                        this.errorMsg1 = error.response.data.error2;
                    } else {
                        this.errorMsg = error.response.data.error;
                    }
                });
        },

        /**
         * This is Validation for formdata
         * @returns void
         */
        validate() {
            this.$refs.form.validate();
        },

        /**
         * This is Clear for formdata
         * @returns void
         */
        clear() {
            this.csvfile = null;
        },

        /**
         * This is Close Noti 
         * @returns void
         */
        close() {
            this.errorMsg = null;
            this.noti = null
        },
    },
};