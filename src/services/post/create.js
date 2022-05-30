import constant from "../../constants";
import { mapGetters } from "vuex";
export default {
    data: () => ({
        valid: true,
        modal: false,
        posts: {
            title: "",
            description: "",
            status: "",
            create_user_id: "",
            update_user_id: "",
            delete_user_id: "",
            deleted_at: "",
        },
        /**
         * Validation rules for all form data
         */
        titleRules: [
            (v) => !!v == constant.VALIDATION.TITLE.REQUIRE || "Title is required",
            (v) =>
            v.length <= constant.VALIDATION.TITLE.MAX ||
            `Title must be less than ${constant.VALIDATION.TITLE.MAX} characters`,
        ],
        descriptRules: [
            (v) =>
            !!v == constant.VALIDATION.DESCRIPT.REQUIRE ||
            "Description is required",
        ],
    }),
    computed: {
        ...mapGetters(["userId", "userType", "userName"]),
    },
    created() {
        console.log(this.$store.state.posts);
        if (this.$store.state.posts) {
            this.posts = this.$store.state.posts;
        }
    },
    methods: {
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
            this.posts = {
                title: "",
                description: "",
            };
        },
        /**
         * Send data to "confirm" state and route to confirm page if valid,
         * @retrun void
         */
        createPost() {
            this.posts.create_user_id = this.userId;
            this.posts.update_user_id = this.userId;
            this.posts.status = 1;
            this.$store.dispatch("confirmPost", this.posts)
        },
    },
    beforeDestroy() {
        this.$store.dispatch("clearError")
    }
};