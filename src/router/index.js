import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"
import Dashboard from "../views/Dashboard.vue"
import Messages from "../views/Messages.vue"
import AIInsights from "../views/AIInsights.vue"
import PublicMessage from "../views/PublicMessage.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: Home },
        { path: "/login", component: Login },
        { path: "/register", component: Register },
        { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true } },
        { path: "/messages", component: Messages, meta: { requiresAuth: true } },
        { path: "/ai-insights", component: AIInsights, meta: { requiresAuth: true } },
        { path: "/message/:userID", component: PublicMessage, props: true }
    ]
})

router.beforeEach((to) => {
    if (to.meta.requiresAuth && !localStorage.getItem("access_token")) {
        return "/login"
    }
})

export default router