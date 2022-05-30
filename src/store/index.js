import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
import cookie from "vue-cookie"
Vue.use(Vuex);

axios.defaults.baseURL = process.env.VUE_APP_SERVER;
import router from "../router"
export default new Vuex.Store({
    state: {
        user: null,
        users: null,
        photofile: [],
        confirm: "",
        noti: "",
        editnoti: "",
        posts: null,
        postnoti: "",
        editpost: null,
        error: null,
        posterror: null,
        pwnoti: "",
        pwsuccess: "",
        forgotnoti: "",
        forgotnoti2: "",
        pwsetnoti: "",
        loginnoti: "",
        remember: false,
        unique: null,
    },
    mutations: {
        setUserData(state, userData) {
            state.user = userData;
        },
        setUserData3(state, userData) {
            state.user = userData.data;
        },
        setUserData1(state, userData) {
            state.user.user.role = userData;
        },
        setUsersData(state, usersData) {
            state.users = usersData
        },
        storeFile(state, fileData) {
            state.photofile = fileData
        },
        confirmPassword(state, confirmPassword) {
            state.confirm = confirmPassword
        },
        notification(state, notification) {
            state.noti = notification
        },
        editnoti(state, editnoti) {
            state.editnoti = editnoti
        },
        setPostsData(state, postsData) {
            state.posts = postsData
        },
        postnoti(state, postnoti) {
            state.postnoti = postnoti
        },
        editPost(state, edit) {
            state.editpost = edit
        },
        editerror(state, editerror) {
            state.error = editerror
        },
        clearError(state) {
            state.error = null
        },
        posterror(state, error) {
            state.posterror = error
        },
        pwnoti(state, pwnoti) {
            state.pwnoti = pwnoti
        },
        pwsuccess(state, pwsuccess) {
            state.pwsuccess = pwsuccess
        },
        forgotnoti(state, forgot) {
            state.forgotnoti = forgot
        },
        forgotnoti2(state, forgot) {
            state.forgotnoti2 = forgot
        },
        pwsetnoti(state, pwsetnoti) {
            state.pwsetnoti = pwsetnoti
        },
        loginnoti(state, loginnoti) {
            state.loginnoti = loginnoti
        },
        remember(state, remember) {
            state.remember = remember
        },
        unique(state, error) {
            state.unique = error
        }
    },
    actions: {
        /**
         * User Confirm
         * @param {*} commit mutate user data or error
         * @param {object} usersData user data form create page
         * @returns {object} data or error
         */
        confirmUser({ commit }, usersData) {
            return axios.post("/user/confirm", usersData).then((data) => {
                commit("setUsersData", usersData)
                console.log(data)
                router.push({ name: "confirm" })
            }).catch((err) => {
                console.log(err.response.data)
                commit("unique", err.response.data)
            })
        },

        /**
         * This is Unique validation noti
         * @param {*} commit set null to Unique validation noti
         * @returns void
         */
        delete_unique({ commit }) {
            commit("unique", null)
        },

        /**
         * This is for confirm password validation
         * @param {*} commit set confirm password
         * @param {*} confirmPassword data form create user
         */
        confirmPassword({ commit }, confirmPassword) {
            commit("confirmPassword", confirmPassword)
        },

        /**
         * This is User Create function
         * @param {*} commit mutate {user, token} data or error
         * @param {*} createUsers user data for Create confirm Page
         * @returns {object} notificaiton
         */
        createUsers({ commit }, createUsers) {
            return axios.post("/user/create", createUsers).then((data) => {
                console.log(data)
                commit("notification", data)
                commit("setUsersData", null)
                commit("confirmPassword", null)
                commit("storeFile", null)
            })
        },

        /**
         * This is User Edit function
         * @param {*} commit mutate user data 
         * @param {object} editprofileData User daa form Edit Page
         * @returns 
         */
        editProfile({ commit }, editprofileData) {
            return axios.put(`/update?${this.state.user.user.id}`, editprofileData).then((data) => {
                commit("editnoti", data.data)
                commit("setUserData1", editprofileData.role)
                router.push({ name: "list" })
                    // console.log(data)
                    // commit("")
            }).catch((error) => {
                console.log(error.response.data)
                commit("unique", error.response.data)
            })
        },

        /**
         * Login validation
         * @param {*} commit mutate {user,token} or error data  
         * @param {object} credentials user data from login form
         * @returns {object} error or data
         */
        login({ commit }, credentials) {
            commit("remember", credentials.remember)
            return axios.post("/auth/login", credentials).then(({ data }) => {
                if (credentials.remember == false) {
                    cookie.set("token", data.token)
                } else {
                    cookie.set("token", data.token, { expires: '1Y' })
                }
                commit("setUserData", data);
                router.push({ name: "post-list" });

            }).catch((error) => {
                commit("loginnoti", error.response.data)
            })
        },

        /**
         * set "setUserData" to null when logout
         * @param {*} commit mutate null
         * @return void
         */
        logout({ commit }) {
            commit("setUserData", null);
        },

        /**
         * Set "file" data to "storeFile"
         * @param {*} commit mutate profile_photo  
         * @param {File} file file data when choose photo
         * @return void
         */
        filestore({ commit }, file) {
            commit("storeFile", file)
        },

        /**
         * This is remove Notificaiton functions
         * @param {*} commit mutate notificaitons to null 
         */
        cancelAlert({ commit }) {
            commit("notification", null)
            commit("forgotnoti", null)
            commit("forgotnoti2", null)
            commit("pwsetnoti", null)
            commit("loginnoti", null)
            commit("unique", null)
        },
        cancelAlert2({ commit }) {
            commit("editnoti", null)
        },
        pwAlert({ commit }) {
            commit("pwnoti", null)
        },
        postcancelAlert({ commit }) {
            commit("postnoti", null)
        },
        clearError({ commit }) {
            commit("clearError", null)
            commit("posterror", null)
        },
        pwsuccessAleart({ commit }) {
            commit("pwsuccess", null);
        },

        /**
         * This is Post Confirm Function
         * @param {*} commit mutate post data,error
         * @param {object} postsData Post data from create page 
         * @returns {object} error
         */
        confirmPost({ commit }, postsData) {
            return axios.post("/post/confirm", postsData).then((data) => {
                commit("setPostsData", postsData)
                router.push({ name: "post-confirm" })
                console.log(data)
            }).catch((error) => {
                console.log(error.response.data)
                commit("posterror", error.response.data)
            })
        },

        /**
         * This is Create Post Function
         * @param {*} commit mutate noti
         * @param {object} createPost post data form confirm page
         * @returns {object} notification
         */
        createPosts({ commit }, createPost) {
            return axios.post("/post/create", createPost).then((data) => {
                commit("postnoti", data)
                commit("setPostsData", null)
            })
        },

        /**
         * This is Post Edit Confirm Function
         * @param {*} commit mutate edit post data, error
         * @param {object} editPost post data form Edit Page
         * @returns {object} error
         */
        editPost({ commit }, editPost) {
            return axios.put("/post/edit", editPost)
                .then(() => {
                    commit("editPost", editPost)
                    router.push({ name: "confirm-edit" })
                }).catch(err => {
                    console.log(err.response.data)
                    commit("editerror", err.response.data)
                })
        },

        /**
         * This is Post Update Function
         * @param {*} commit mutate noti
         * @param {object} updateData post data form Edit Confirm Page
         * @returns {object} notification
         */
        updatePost({ commit }, updateData) {
            return axios.put("/post/update", updateData).then((data) => {
                commit("postnoti", data)
                commit("editPost", null)
                router.push({ name: "post-list" })
            })
        },

        /**
         * This is Change Password Function
         * @param {*} commit mutate password user,token,noti,error
         * @param {*} newpwData password data form Change password Page
         * @returns {object} noti, user, token, error
         */
        updatePassword({ commit }, newpwData) {
            return axios.put("/user/pwupdate", newpwData).then(() => {
                this.state.user.user.password = newpwData.new
                return axios.put("/user/pwupdated", this.state.user.user).then((data) => {
                    commit("setUserData3", data);
                    commit("pwsuccess", data.data.noti);
                    router.push({ name: "list" })
                    console.log(data)
                })
            }).catch((error) => {
                console.log(error.response.data)
                commit("pwnoti", error.response.data)
            })
        },

        /**
         * This is Reset Password Function
         * @param {*} commit mutate user, token, error,noti
         * @param {object} reset password data from Reset Password {age
         * @returns {object} user, token, error, noti
         */
        resetPassword({ commit }, reset) {
            return axios.post("/user/reset", reset).then((data) => {
                commit("forgotnoti", data);
                router.push({ name: "login" })
                return axios.post("/reset/create", {
                    email: data.data.email,
                    token: data.data.token
                }).then((data) => {
                    console.log(data)
                })
            }).catch((error) => {
                console.log(error.response.data)
                commit("forgotnoti2", error.response.data);
            })
        },

        /**
         * This is Set Noti Function
         * @param {*} commit mutate noti 
         * @param {object} noti notification data after reset password 
         * @returns {object} notification
         */
        pwsetnoti({ commit }, noti) {
            commit("pwsetnoti", noti)
        },
    },
    getters: {
        isLoggedIn: (state) => !!state.user,
        userInfo: (state) => {
            if (state.user) {
                return state.user.user;
            }
        },
        userType: (state) => {
            if (state.user) {
                return state.user.user.role;
            }
        },
        userId: (state) => {
            if (state.user && state.user.user.id) {
                return state.user.user.id;
            }
        },
        userName: (state) => {
            if (state.user && state.user.user.name) {
                return state.user.user.name;
            }
        },
    },
    plugins: [createPersistedState()],
});