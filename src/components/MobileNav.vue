<script setup>
import { ref } from "vue"
import { RouterLink, useRoute } from "vue-router"

const isOpen = ref(false)
const route = useRoute()

const closeMenu = () => {
    isOpen.value = false
}
</script>

<template>

    <div class="mobile-menu">

        <button
            class="menu-button"
            @click="isOpen = !isOpen"
        >
            <i class="bi bi-list"></i>
        </button>

        <div
            v-if="isOpen"
            class="overlay"
            @click="closeMenu"
        ></div>

        <aside
            class="mobile-sidebar"
            :class="{ open: isOpen }"
        >

            <div class="menu-header">

                <h4>Saraha</h4>

                <button
                    class="close-button"
                    @click="closeMenu"
                >
                    <i class="bi bi-x-lg"></i>
                </button>

            </div>

            <nav class="menu-links">

                <RouterLink
                    to="/dashboard"
                    :class="{ active: route.path === '/dashboard' }"
                    @click="closeMenu"
                >
                    <i class="bi bi-house-door"></i>
                    Dashboard
                </RouterLink>

                <RouterLink
                    to="/messages"
                    :class="{ active: route.path === '/messages' }"
                    @click="closeMenu"
                >
                    <i class="bi bi-chat-dots"></i>
                    Messages
                </RouterLink>

                <RouterLink
                    to="/ai"
                    :class="{ active: route.path === '/ai' }"
                    @click="closeMenu"
                >
                    <i class="bi bi-stars"></i>
                    AI Insights
                </RouterLink>

            </nav>

        </aside>

    </div>

</template>

<style scoped>

.mobile-menu {
    display: none;
}

@media (max-width: 768px) {

    .mobile-menu {
        display: block;
    }

    .menu-button {
        border: none;
        background: transparent;
        color: inherit;
        font-size: 28px;

        display: flex;
        align-items: center;
        justify-content: center;

        cursor: pointer;
        padding: 5px;
    }

    .overlay {
        position: fixed;
        inset: 0;

        background: rgba(0, 0, 0, 0.5);

        z-index: 1050;
    }

    .mobile-sidebar {
        position: fixed;

        top: 0;
        left: 0;

        width: 280px;
        height: 100vh;

        background: #1c1c24;

        z-index: 1100;

        transform: translateX(-100%);
        transition: transform 0.3s ease;

        padding: 20px;
    }

    .mobile-sidebar.open {
        transform: translateX(0);
    }

    .menu-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        margin-bottom: 40px;

        color: white;
    }

    .menu-header h4 {
        margin: 0;
    }

    .close-button {
        border: none;
        background: transparent;
        color: white;

        font-size: 20px;
        cursor: pointer;
    }

    .menu-links {
        display: flex;
        flex-direction: column;

        gap: 10px;
    }

    .menu-links a {
        display: flex;
        align-items: center;

        gap: 12px;

        padding: 14px;

        border-radius: 10px;

        text-decoration: none;

        color: #a9a9b3;

        font-size: 16px;
    }

    .menu-links a i {
        font-size: 20px;
    }

    .menu-links a.active {
        background: #7c3aed;
        color: white;
    }

}

</style>