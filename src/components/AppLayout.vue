<script setup>
import AppSidebar from "./AppSidebar.vue"
import MobileNav from "./MobileNav.vue"

const user = JSON.parse(localStorage.getItem("user") || "{}")
</script>

<template>
    <div class="layout">

        <AppSidebar />

        <main class="main">

            <header class="topbar">

                <MobileNav />

                <div class="welcome-section">
                    <div class="fw-bold fs-5">
                        Welcome, {{ user.firstName || "Friend" }} 👋
                    </div>

                    <small class="text-secondary">
                        Your anonymous feedback is waiting.
                    </small>
                </div>

                <div class="avatar">
                    {{ (user.firstName || "U").slice(0, 1).toUpperCase() }}
                </div>

            </header>

            <div class="content">
                <slot />
            </div>

        </main>

    </div>
</template>