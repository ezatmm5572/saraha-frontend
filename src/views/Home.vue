<script setup>
import AppFooter from "../components/AppFooter.vue"
</script>

<template>
    <div class="home">

        <nav class="home-nav">
            <RouterLink to="/" class="logo text-white">
                <div class="logo-mark">
                    <i class="bi bi-chat-dots-fill"></i>
                </div>
                Saraha
            </RouterLink>

            <div class="d-flex gap-2">
                <RouterLink
                    to="/login"
                    class="btn btn-outline-light rounded-3 px-4"
                >
                    Log in
                </RouterLink>

                <RouterLink
                    to="/register"
                    class="btn btn-brand"
                >
                    Get Started
                </RouterLink>
            </div>
        </nav>


        <section class="hero">
            <div>
                <span class="badge-soft">
                    💬 Speak Freely • Stay Real
                </span>

                <h1 class="mt-4">
                    Your Space for<br>
                    <span class="gradient">
                        Honest Words.
                    </span>
                </h1>

                <p class="text-white-50 fs-5 mt-4">
                    Receive anonymous messages, read honest feedback,
                    and discover AI-powered insights about your messages.
                </p>

                <RouterLink
                    to="/register"
                    class="btn btn-brand btn-lg mt-2"
                >
                    Create Your Account
                    <i class="bi bi-arrow-right ms-2"></i>
                </RouterLink>
            </div>

            <div class="hero-card">
                <div class="hero-bubble">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
            </div>
        </section>


        <section class="container-fluid px-4 px-md-5 pb-5">

            <div class="row g-3">

                <div class="col-md-4">
                    <div class="feature h-100">

                        <div class="fs-2">🥸</div>

                        <h5 class="mt-3">
                            Anonymous
                        </h5>

                        <p class="text-white-50 mb-0">
                            Receive honest messages without knowing the sender.
                        </p>

                    </div>
                </div>


                <div class="col-md-4">
                    <div class="feature h-100">

                        <div class="fs-2">💌</div>

                        <h5 class="mt-3">
                            Simple Sharing
                        </h5>

                        <p class="text-white-50 mb-0">
                            Share your personal link with anyone.
                        </p>

                    </div>
                </div>


                <div class="col-md-4">
                    <div class="feature h-100">

                        <div class="fs-2">🤖</div>

                        <h5 class="mt-3">
                            AI Insights
                        </h5>

                        <p class="text-white-50 mb-0">
                            Analyze sentiment, topics, and common words.
                        </p>

                    </div>
                </div>

            </div>

        </section>


        <!-- Footer -->
        <AppFooter />

    </div>
</template>