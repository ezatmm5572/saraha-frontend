<script setup>
import { useRouter } from "vue-router"
const router = useRouter()
const logout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("user")
    router.push("/login")
}
</script>

<template>
    <aside class="sidebar">
        <RouterLink to="/dashboard" class="logo text-white mb-5">
            <div class="logo-mark"><i class="bi bi-chat-dots-fill"></i></div><span>Saraha</span>
        </RouterLink>

        <nav>
            <RouterLink to="/dashboard" class="nav-link"><i class="bi bi-grid me-2"></i><span>Dashboard</span></RouterLink>
            <RouterLink to="/messages" class="nav-link"><i class="bi bi-envelope me-2"></i><span>My Messages</span></RouterLink>
            <RouterLink to="/ai-insights" class="nav-link"><i class="bi bi-stars me-2"></i><span>AI Insights</span></RouterLink>
        </nav>

        <button class="nav-link w-100 text-start position-absolute bottom-0 mb-3" @click="logout">
            <i class="bi bi-box-arrow-right text-danger me-2"></i><span>Log out</span>
        </button>
    </aside>
</template>