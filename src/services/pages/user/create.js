import constant from "../../../constants";
import { mapGetters } from "vuex";
export default {
    data: () => ({
        valid: true,
        date: "",
        modal: false,
        users: {
            name: "",
            email: "",
            password: "",
            role: null,
            phone: "",
            dob: "",
            address: "",
            profile: null,
            create_user_id: "",
            update_user_id: "",
            deleted_user_id: "",
            deleted_at: "",
        },
        confirm: "",
        errorConfirm: null,
        items: ["Admin", "User"],
        errImg: null,

        /**
         * This is Validation Rules for Form data
         */
        nameRules: [
            (v) => !!v == constant.VALIDATION.NAME.REQUIRE || "Name is required",
            (v) =>
            v.length <= constant.VALIDATION.NAME.MAX ||
            `Name must be less than ${constant.VALIDATION.NAME.MAX} characters`,
        ],
        emailRules: [
            (v) => !!v == constant.VALIDATION.EMAIL.REQUIRE || "E-mail is required",
            (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
            (v) =>
            v.length <= constant.VALIDATION.EMAIL.MAX ||
            "Name must be less than 100 characters",
        ],
        passRules: [
            (v) => !!v == constant.VALIDATION.PASS.REQUIRE || "Password is required",
            (v) =>
            v.length >= constant.VALIDATION.PASS.MIN ||
            "Name must be at least 8 characters",
        ],
        cpassRules: [
            (v) => !!v == constant.VALIDATION.PASS.REQUIRE || "Password is required",
        ],
        phoneRules: [
            (v) =>
            (v.length >= 0 && v.length <= constant.VALIDATION.PH.MAX) ||
            `Phone Number is maximum ${constant.VALIDATION.PH.MAX} numbers`,
            (v) => /^\d{0,11}$/.test(v) || "Phone Number must be number",
        ],
        profileRules: [
            (v) =>
            !!v == constant.VALIDATION.PROFILE.REQUIRE || "Profile is required",
        ],
    }),
    updated() {
        if (this.confirm != this.users.password) {
            this.errorConfirm = "Password and Confirm Password Must be same";
        }
    },
    computed: {
        ...mapGetters(["userId", "userType", "userName"]),
    },
    created() {
        if (this.$store.state.users) {
            if (this.$store.state.users.role === 0) {
                this.users = this.$store.state.users
                this.users.role = "Admin"
                console.log(this.users.role)
            } else {
                this.users = this.$store.state.users
                this.users.role = "User"
            }
            this.confirm = this.$store.state.confirm
        }
        this.$store.dispatch("delete_unique")
    },
    methods: {
        /**
         * This is Create User Function and redirect to Confirm Page
         * @returns void
         */
        createUser() {
            this.users.create_user_id = this.userId;
            this.users.update_user_id = this.userId;
            if (this.users.role === "Admin") {
                this.users.role = 0;
            } else {
                this.users.role = 1;
            }
            this.$store.dispatch("confirmPassword", this.confirm)
            this.$store.dispatch("confirmUser", this.users)
        },

        /**
         * addFile
         * Image file, to show in Confirm Page
         * @param {File} file data to show in Confirm Page
         * @return void
         */
        addFile(file) {
            if (file) {
                if (file.size > constant.VALIDATION.PROFILE.MAX) {
                    this.errImg = "Image size too big!! Maximum is 2MB ";
                } else {
                    const reader = new FileReader();
                    reader.addEventListener("load", (event) =>
                        this.$store.dispatch("filestore", event.target.result)
                    );
                    reader.addEventListener(
                        "error",
                        () => (this.previews = this.errorImage)
                    );
                    reader.readAsDataURL(file);
                }
            } else {
                this.$store.dispatch("filestore", null);
                this.errImg = null;
            }
        },

        /**
         * This is validation function for form data
         * @returns void
         */
        validate() {
            this.$refs.form.validate();
        },

        /**
         * This is reset function and clear form data
         * @returns void
         */
        reset() {
            var self = this;
            Object.keys(this.users).forEach(function(key) {
                self.user[key] = "";
            });
            this.users = null;
            this.confirm = null;
            this.errorConfirm = "";
            this.$refs.form.reset();
        },
    },
};