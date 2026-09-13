<script setup>
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { backend } from "../services/backend"

const router = useRouter()

const form = reactive({
    email: "",
    password: ""
})

const errors = reactive({
    email: "",
    password: ""
})

const loading = ref(false)
const error = ref("")

const validate = () => {
    let isValid = true

    errors.email = ""
    errors.password = ""

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!form.email.trim()) {
        errors.email = "Email is required"
        isValid = false
    } else if (!emailRegex.test(form.email.trim())) {
        errors.email = "Please enter a valid email address"
        isValid = false
    }

    if (!form.password) {
        errors.password = "Password is required"
        isValid = false
    } else if (form.password.length < 8) {
        errors.password = "Password must be at least 8 characters"
        isValid = false
    }

    return isValid
}

const submit = async () => {
    error.value = ""

    if (!validate()) {
        return
    }

    loading.value = true

    try {
        const { data } = await backend.signIn({
            email: form.email.trim().toLowerCase(),
            password: form.password
        })

        const token = data?.data?.token

        if (!token) {
            throw new Error("Backend did not return a token")
        }

        localStorage.setItem("access_token", token)

        const profileResponse = await backend.getProfile()

        const user = profileResponse.data?.data?.user

        if (user) {
            localStorage.setItem("user", JSON.stringify(user))
        }

        router.push("/dashboard")

    } catch (err) {
        error.value =
            err.response?.data?.error ||
            err.response?.data?.message ||
            err.message ||
            "Login failed"

    } finally {
        loading.value = false
    }
}

const loginWithGoogle = async (response) => {
    loading.value = true
    error.value = ""

    try {
        const { data } = await backend.signUpWithGoogle({
            idToken: response.credential
        })

        const token = data?.data?.access_token

        if (!token) {
            throw new Error("Backend did not return an access token")
        }

        localStorage.setItem("access_token", token)

        const profileResponse = await backend.getProfile()

        const user = profileResponse.data?.data?.user

        if (user) {
            localStorage.setItem("user", JSON.stringify(user))
        }

        router.push("/dashboard")

    } catch (err) {
        error.value =
            err.response?.data?.error ||
            err.response?.data?.message ||
            err.message ||
            "Google login failed"

    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="auth">

        <section class="auth-side">

            <RouterLink
                to="/"
                class="logo text-white mb-5"
            >
                <div class="logo-mark">
                    <i class="bi bi-chat-dots-fill"></i>
                </div>

                Saraha
            </RouterLink>

            <h1 class="display-3 fw-bold">
                Welcome back.
            </h1>

            <p class="text-white-50 fs-5">
                Your anonymous messages and AI insights are waiting for you.
            </p>

        </section>

        <section class="auth-main">

            <div class="auth-card">

                <RouterLink
                    to="/"
                    class="logo text-dark mb-4"
                >
                    <div class="logo-mark">
                        <i class="bi bi-chat-dots-fill"></i>
                    </div>

                    Saraha
                </RouterLink>

                <h2 class="fw-bold">
                    Sign in
                </h2>

                <p class="text-secondary">
                    Welcome back to your honest space.
                </p>

                <div
                    v-if="error"
                    class="alert alert-danger"
                >
                    {{ error }}
                </div>

                <form
                    @submit.prevent="submit"
                    novalidate
                >

                    <div class="mb-3">

                        <label class="form-label">
                            Email
                        </label>

                        <input
                            v-model="form.email"
                            type="email"
                            class="form-control"
                            :class="{ 'is-invalid': errors.email }"
                            autocomplete="email"
                        >

                        <div
                            v-if="errors.email"
                            class="invalid-feedback"
                        >
                            {{ errors.email }}
                        </div>

                    </div>

                    <div class="mb-4">

                        <label class="form-label">
                            Password
                        </label>

                        <input
                            v-model="form.password"
                            type="password"
                            class="form-control"
                            :class="{ 'is-invalid': errors.password }"
                            autocomplete="current-password"
                        >

                        <div
                            v-if="errors.password"
                            class="invalid-feedback"
                        >
                            {{ errors.password }}
                        </div>

                    </div>

                    <button
                        class="btn btn-brand w-100"
                        :disabled="loading"
                    >
                        {{ loading ? "Signing in..." : "Sign In" }}
                    </button>

                </form>

                <div class="position-relative my-4">

                    <hr>

                    <span
                        class="position-absolute top-50 start-50 translate-middle bg-white px-3 text-secondary small"
                    >
                        OR
                    </span>

                </div>

                <div class="d-flex justify-content-center">

                    <GoogleLogin
                        :callback="loginWithGoogle"
                    />

                </div>

                <p class="text-center text-secondary mt-4">

                    Don't have an account?

                    <RouterLink
                        to="/register"
                        class="fw-bold"
                    >
                        Create one
                    </RouterLink>

                </p>

            </div>

        </section>

    </div>
</template>