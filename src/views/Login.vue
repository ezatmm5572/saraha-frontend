<script setup>
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { backend } from "../services/backend"

const router = useRouter()

const form = reactive({
    email: "",
    password: ""
})

const loading = ref(false)
const error = ref("")

const submit = async () => {
    loading.value = true
    error.value = ""

    try {
        const { data } = await backend.signIn(form)

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


                <form @submit.prevent="submit">

                    <div class="mb-3">

                        <label class="form-label">
                            Email
                        </label>

                        <input
                            v-model="form.email"
                            type="email"
                            class="form-control"
                            required
                        >

                    </div>


                    <div class="mb-4">

                        <label class="form-label">
                            Password
                        </label>

                        <input
                            v-model="form.password"
                            type="password"
                            class="form-control"
                            required
                        >

                    </div>


                    <button
                        class="btn btn-brand w-100"
                        :disabled="loading"
                    >
                        {{ loading ? "Signing in..." : "Sign In" }}
                    </button>

                </form>


                <!-- Divider -->

                <div class="position-relative my-4">

                    <hr>

                    <span
                        class="position-absolute top-50 start-50 translate-middle bg-white px-3 text-secondary small"
                    >
                        OR
                    </span>

                </div>


                <!-- Google Login -->

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