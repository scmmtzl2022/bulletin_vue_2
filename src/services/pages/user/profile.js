import axios from "axios";
export default {
    data: () => {
        return {
            image: null,
            type: null,
        }
    },
    computed: {
        profileData() {
            return this.$store.state.user.user
        }
    },
    created() {
        if (this.profileData.role === 0) {
            this.type = "Admin"
        } else {
            this.type = "User"
        }
        axios
            .get(`/detail?id=${this.$store.state.user.user.id}`)
            .then((data) => {
                this.image = data.data.image
            })
            .catch((err) => {
                console.log(err);
            });
    },
    methods: {
        /**
         * This is Edit Profile function and redirect to edit_profile page
         * @returns void
         */
        editProfile() {
            this.$router.push({ name: "profile-edit" })
        }
    }
}