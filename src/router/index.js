import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../pages/user/Login";
import Confirm from "../pages/user/Confirm";
import Profile from "../pages/user/Profile";
import Create from "../pages/user/Create";
import Profile_edit from "../pages/user/Profile_edit";
import Post_Create from "../pages/post/Create";
import Post_Confirm from "../pages/post/Confirm";
import Confirm_Edit from "../pages/post/EditConfirm";
import Upload from "../pages/post/Upload";
import Post_Edit from "../pages/post/Edit";
import List from "../pages/user/List";
import ChangePassword from "../pages/user/ChangePassword";
import ForgetPassword from "../pages/user/Forget";
import Reset from "../pages/user/Reset";
import PostList from "../pages/post/PostList";
import store from "../store";

Vue.use(VueRouter);

const routes = [{
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/post/list",
        name: "post-list",
        component: PostList,
    },
    {
        path: "/create",
        name: "create",
        component: Create,
    },
    {
        path: "/list",
        name: "list",
        component: List,
    },
    {
        path: "/pwchange",
        name: "pwchange",
        component: ChangePassword,
    },
    {
        path: "/forget",
        name: "forget",
        component: ForgetPassword,
    },
    {
        path: `/:token/reset`,
        name: "reset",
        component: Reset,
    },
    {
        path: "/confirm",
        name: "confirm",
        component: Confirm,
    },
    {
        path: "/profile",
        name: "profile",
        component: Profile,
    },
    {
        path: "/profile-edit",
        name: "profile-edit",
        component: Profile_edit,
    },
    {
        path: "/post-create",
        name: "post-create",
        component: Post_Create,
    },
    {
        path: "/post-confirm",
        name: "post-confirm",
        component: Post_Confirm,
    },
    {
        path: "/post-edit/:id",
        name: "post-edit",
        component: Post_Edit,
    },
    {
        path: "/confirm-edit",
        name: "confirm-edit",
        component: Confirm_Edit,
    },
    {
        path: "/upload",
        name: "upload",
        component: Upload,
    },
    {
        path: "/*",
        redirect: "/post/list",
    },
];

const router = new VueRouter({
    mode: "history",
    routes,
});

/**
 * This is to handle and check authentication for routing.
 */
router.beforeEach((to, from, next) => {
    const loggedIn = store.getters.isLoggedIn;
    if (!loggedIn &&
        to.name != "post-confirm" &&
        to.name != "forget" &&
        to.name != "post-confirm" &&
        to.name != "upload" &&
        to.name != "confirm-edit" &&
        to.name != "post-edit" &&
        to.name != "login" &&
        to.name != "post-list" &&
        to.name != "create" &&
        to.name != "list" &&
        to.name != "reset" &&
        to.name != "confirm" &&
        to.name != "profile" &&
        to.name != "post-create"
    ) {
        return next("/login");
    }
    next();
});

export default router;