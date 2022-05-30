import axios from "axios";
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
        invi: false,
        profile: null,
        image: null,
        confirm: "",
        errorConfirm: null,
        items: ["Admin", "User"],
        errImg: null,

        /**
         * This is Validation Rules for form data
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
    computed: {
        ...mapGetters(["userId", "userType", "userName"]),
        editprofileData() {
            return this.$store.state.user.user;
        },
    },
    created() {
        axios
            .get(`/detail?id=${this.$store.state.user.user.id}`)
            .then((data) => {
                this.image = data.data.image;
                this.users = data.data.user
                if (this.users.role === 0) {
                    this.users.role = "Admin";
                } else {
                    this.users.role = "User";
                }
            })
            .catch((err) => {
                console.log(err);
            });
    },
    methods: {
        /**
         * This is Change profile function
         * @returns void
         */
        changeProfile() {
            this.users.profile = this.profile;
            this.invi = true
        },

        /**
         * This is Edit Profile function and Edit to database
         * @returns void
         */
        editProfile() {
            this.users.update_user_id = this.editprofileData.id
            if (this.users.role === "Admin") {
                this.users.role = 0
            } else {
                this.users.role = 1
            }
            if (this.users.profile.name) {
                const formData = new FormData();
                formData.append("filename", this.users.profile);
                Object.entries(this.users).forEach(([key, value]) => {
                    formData.append(key, value);
                });
                formData.append(
                    "profile",
                    this.users.profile.name
                );
                this.$store.dispatch("editProfile", formData)
            } else {
                this.$store.dispatch("editProfile",
                    this.users
                )
            }
        },

        /**
         * This is Clear Function
         * @returns void
         */
        clear() {
            this.users = {
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
                this.invi = true
        },

        /**
         * This is form validation
         * @returns void
         */
        validate() {
            this.$refs.form.validate();
        },
    },
    beforeDestroy() {
        this.$store.dispatch("cancelAlert")
    }
};