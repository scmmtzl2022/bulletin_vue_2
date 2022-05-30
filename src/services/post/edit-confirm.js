export default {
    data: () => {
        return {
            switch1: true
        }
    },
    computed: {
        EditData() {
            return this.$store.state.editpost;
        },
    },
    created() {
        if (this.EditData.status === 1) {
            this.switch1 = true
        } else {
            this.switch1 = false
        }
    },
    methods: {
        /**
         * This is Cancel Function and redirect to Edit Page
         * @returns void
         */
        cancelEdit() {
            this.$router.back()
        },
        /**
         * This is Confirm Update Function and Edit to database
         * @returns void
         */
        updatePost() {
            this.$store.dispatch("updatePost", this.EditData)
        }
    }
}