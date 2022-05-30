import constant from "../../constants";
import { mapGetters } from "vuex";
import axios from "axios";
export default {
    data: () => ({
        valid: true,
        posts: {
            title: "",
            description: "",
            status: "",
            create_user_id: "",
            update_user_id: "",
            delete_user_id: "",
            deleted_at: "",
        },
        switch1: true,
        /**
         * This is Validation Rules for all Form data
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
    beforeCreate() {
        axios
            .get(`/post/detail?id=${this.$route.params.id}`)
            .then((data) => {
                this.posts = data.data;
                if (this.posts.status === 0) {
                    this.switch1 = false
                }
            })
            .catch((err) => {
                console.log(err);
            });
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
         * Send data to "edit-confirm" state and route to edit-confirm page if valid,
         * @retrun void
         */
        editPost() {
            if (this.switch1 == false) {
                this.posts.status = 0
            } else {
                this.posts.status = 1
            }
            this.posts.update_user_id = this.userId;
            this.$store.dispatch("editPost", this.posts)
        }
    },
    beforeDestroy() {
        this.$store.dispatch("clearError")
    }
};