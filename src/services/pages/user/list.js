import { mapGetters } from "vuex";
import axios from "axios";
export default {
    data() {
        return {
            postInfo: null,
            dialog: false,
            headerList: [{
                    text: "ID",
                    align: "start",
                    value: "id",
                },
                {
                    text: "Name",
                    value: "name",
                },
                {
                    text: "Email",
                    value: "email",
                },
                {
                    text: "Created User",
                    value: "user_name",
                },
                {
                    text: "Type",
                    value: "role",
                },
                {
                    text: "Phone",
                    value: "phone",
                },
                {
                    text: "Date Of Birth",
                    value: "dob",
                },
                {
                    text: "Address",
                    value: "address",
                },
                {
                    text: "Created_date",
                    value: "created_at",
                },
                {
                    text: "Updated_date",
                    value: "updated_at",
                },
                {
                    text: "Operation",
                    value: "operation",
                },
            ],
            modal: false,
            modal2: false,
            userList: [],
            showList: [],
            users: {
                id: "",
            },
            image: null,
            role: "",
            keyword: "",
            noti: null,
        };
    },
    computed: {
        ...mapGetters(["isLoggedIn"]),
        headers() {
            if (!this.isLoggedIn) {
                return this.headerList.slice(0, this.headerList.length - 1);
            } else {
                return this.headerList;
            }
        },
        currentDateTime() {
            const current = new Date();
            const date =
                current.getFullYear() +
                "-" +
                (current.getMonth() + 1) +
                "-" +
                current.getDate();
            const time =
                current.getHours() +
                ":" +
                current.getMinutes() +
                ":" +
                current.getSeconds();
            const dateTime = date + " " + time;

            return dateTime;
        },
    },
    mounted() {
        if (this.$store.state.user) {
            if (this.$store.state.user.user.role == 0) {
                this.$axios
                    .get("/user/list")
                    .then((response) => {
                        this.userList = response.data;
                        this.showList = this.userList;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                this.$axios
                    .post("/user/list/user", { id: this.$store.state.user.user.id })
                    .then((response) => {
                        this.userList = response.data;
                        this.showList = this.userList;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        } else {
            this.$axios
                .get("/user/list")
                .then((response) => {
                    this.userList = response.data;
                    this.showList = this.userList;
                    console.log(response)
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    },
    methods: {
        /**
         * This is get image and role of clicked user
         * @param {id} iddata data to get image and role form database
         * @returns void
         */
        getImage(iddata) {
            this.users.id = iddata;
            axios.put(`/user/get`, this.users).then((data) => {
                this.image = data.data.image;
                this.role = data.data.role;
                if (this.role === 0) {
                    this.role = "Admin";
                } else {
                    this.role = "User";
                }
            });
        },

        /**
         * This is remove notification
         * @returns void
         */
        cancelAlert() {
            this.$store.state.noti = false;
            this.$store.dispatch("cancelAlert");
        },

        /**
         * This is remove notification
         * @returns void
         */
        cancelAlert2() {
            this.$store.state.editnoti = false;
            this.$store.dispatch("cancelAlert2");
        },

        /**
         * This is remove notification
         * @returns void
         */
        cancelAlert4() {
            this.$store.state.editnoti = false;
            this.$store.dispatch("pwsuccessAleart");
        },

        /**
         * This is remove notification
         * @returns void
         */
        cancelAlert3() {
            this.noti = null;
        },

        /**
         * This is to filter posts of datatable.
         * @returns void
         */
        filtername() {
            this.showList = this.userList.filter((user) => {              
                    return (
                        user.name.includes(this.keyword)                       
                    );
            });
        },

        /**
         * This is Delete function
         * @param {object} item data to delete in database
         * @returns void
         */
        deleteUser(item) {
            item.deleted_user_id = this.$store.state.user.user.id;
            item.deleted_at = new Date()
                .toJSON()
                .slice(0, 10)
                .replace(/-/g, "/");
            return axios.put("/user/delete", item).then((data) => {
                this.noti = data.data.data;
                this.$axios
                    .get("/user/list")
                    .then((response) => {
                        this.userList = response.data;
                        this.showList = this.userList;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            });
        },
    },
};