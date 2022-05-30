export default {
    data: () => ({
        type: null
    }),
    methods: {
        /**
         * This is Cancel Function and redirect to Create Page
         * @returns void
         */
        cancelUser() {
            this.$router.push({ name: "create" })
        },

        /**
         * This is Create Function and Redirect to Confirm Page
         * @returns void
         */
        createUser() {
            let formData = new FormData();
            if (this.$store.state.users) {
                formData.append("filename", this.$store.state.users.profile);
                Object.entries(this.$store.state.users).forEach(([key, value]) => {
                    formData.append(key, value);
                });
                formData.append(
                    "profile",
                    this.$store.state.users.profile.name
                );
            }
            this.$store.dispatch("createUsers", formData).then(() => {
                this.$router.push({
                    name: "list",
                });
            });

        },
    },
    computed: {
        usersData() {
            return this.$store.state.users
        }
    },
    created() {
        if (this.usersData.role === 0) {
            this.type = "Admin"
        } else {
            this.type = "User"
        }
    }
}