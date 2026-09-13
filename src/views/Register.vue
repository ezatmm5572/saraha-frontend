<script setup>
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { backend } from "../services/backend"

const router = useRouter()

const loading = ref(false)
const error = ref("")

const form = reactive({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    npassword: "",
    phone: "",
    age: "",
    gender: "male"
})

const errors = reactive({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    npassword: "",
    phone: "",
    age: ""
})

const validate = () => {
    let isValid = true

    Object.keys(errors).forEach((key) => {
        errors[key] = ""
    })

    if (!form.firstName.trim()) {
        errors.firstName = "First name is required"
        isValid = false
    } else if (form.firstName.trim().length < 3) {
        errors.firstName = "First name must be at least 3 characters"
        isValid = false
    }

    if (!form.lastName.trim()) {
        errors.lastName = "Last name is required"
        isValid = false
    } else if (form.lastName.trim().length < 3) {
        errors.lastName = "Last name must be at least 3 characters"
        isValid = false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!form.email.trim()) {
        errors.email = "Email is required"
        isValid = false
    } else if (!emailRegex.test(form.email)) {
        errors.email = "Please enter a valid email address"
        isValid = false
    }

    const phoneRegex = /^[0-9+\-\s()]{8,20}$/

    if (!form.phone.trim()) {
        errors.phone = "Phone number is required"
        isValid = false
    } else if (!phoneRegex.test(form.phone)) {
        errors.phone = "Please enter a valid phone number"
        isValid = false
    }

    if (!form.age) {
        errors.age = "Age is required"
        isValid = false
    } else if (Number(form.age) < 13) {
        errors.age = "You must be at least 13 years old"
        isValid = false
    } else if (Number(form.age) > 120) {
        errors.age = "Please enter a valid age"
        isValid = false
    }

    if (!form.password) {
        errors.password = "Password is required"
        isValid = false
    } else if (form.password.length < 8) {
        errors.password = "Password must be at least 8 characters"
        isValid = false
    }

    if (!form.npassword) {
        errors.npassword = "Please confirm your password"
        isValid = false
    } else if (form.password !== form.npassword) {
        errors.npassword = "Passwords do not match"
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
        await backend.signUp({
            ...form,
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            email: form.email.trim().toLowerCase(),
            phone: form.phone.trim(),
            age: Number(form.age)
        })

        router.push("/login")

    } catch (err) {
        error.value =
            err.response?.data?.error ||
            err.response?.data?.message ||
            err.message ||
            "Registration failed"

    } finally {
        loading.value = false
    }
}

const registerWithGoogle = async (response) => {
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
            "Google registration failed"

    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="auth">

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
                    Create account
                </h2>

                <p class="text-secondary">
                    Start receiving anonymous messages.
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

                    <div class="row">

                        <div class="col-md-6 mb-3">

                            <label class="form-label">
                                First name
                            </label>

                            <input
                                v-model="form.firstName"
                                type="text"
                                class="form-control"
                                :class="{ 'is-invalid': errors.firstName }"
                                autocomplete="given-name"
                            >

                            <div
                                v-if="errors.firstName"
                                class="invalid-feedback"
                            >
                                {{ errors.firstName }}
                            </div>

                        </div>

                        <div class="col-md-6 mb-3">

                            <label class="form-label">
                                Last name
                            </label>

                            <input
                                v-model="form.lastName"
                                type="text"
                                class="form-control"
                                :class="{ 'is-invalid': errors.lastName }"
                                autocomplete="family-name"
                            >

                            <div
                                v-if="errors.lastName"
                                class="invalid-feedback"
                            >
                                {{ errors.lastName }}
                            </div>

                        </div>

                    </div>

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

                    <div class="mb-3">

                        <label class="form-label">
                            Phone
                        </label>

                        <input
                            v-model="form.phone"
                            type="tel"
                            class="form-control"
                            :class="{ 'is-invalid': errors.phone }"
                            autocomplete="tel"
                        >

                        <div
                            v-if="errors.phone"
                            class="invalid-feedback"
                        >
                            {{ errors.phone }}
                        </div>

                    </div>

                    <div class="row">

                        <div class="col-md-6 mb-3">

                            <label class="form-label">
                                Age
                            </label>

                            <input
                                v-model="form.age"
                                type="number"
                                min="13"
                                max="120"
                                class="form-control"
                                :class="{ 'is-invalid': errors.age }"
                            >

                            <div
                                v-if="errors.age"
                                class="invalid-feedback"
                            >
                                {{ errors.age }}
                            </div>

                        </div>

                        <div class="col-md-6 mb-3">

                            <label class="form-label">
                                Gender
                            </label>

                            <select
                                v-model="form.gender"
                                class="form-select"
                            >
                                <option value="male">
                                    Male
                                </option>

                                <option value="female">
                                    Female
                                </option>
                            </select>

                        </div>

                    </div>

                    <div class="mb-3">

                        <label class="form-label">
                            Password
                        </label>

                        <input
                            v-model="form.password"
                            type="password"
                            class="form-control"
                            :class="{ 'is-invalid': errors.password }"
                            autocomplete="new-password"
                        >

                        <div
                            v-if="errors.password"
                            class="invalid-feedback"
                        >
                            {{ errors.password }}
                        </div>

                    </div>

                    <div class="mb-4">

                        <label class="form-label">
                            Confirm password
                        </label>

                        <input
                            v-model="form.npassword"
                            type="password"
                            class="form-control"
                            :class="{ 'is-invalid': errors.npassword }"
                            autocomplete="new-password"
                        >

                        <div
                            v-if="errors.npassword"
                            class="invalid-feedback"
                        >
                            {{ errors.npassword }}
                        </div>

                    </div>

                    <button
                        class="btn btn-brand w-100"
                        :disabled="loading"
                    >
                        {{ loading ? "Creating..." : "Create Account" }}
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
                        :callback="registerWithGoogle"
                    />

                </div>

                <p class="text-center text-secondary mt-4">

                    Already have an account?

                    <RouterLink
                        to="/login"
                        class="fw-bold"
                    >
                        Sign in
                    </RouterLink>

                </p>

            </div>

        </section>

        <section class="auth-side">

            <div class="logo mb-5">

                <div class="logo-mark">
                    <i class="bi bi-chat-dots-fill"></i>
                </div>

                Saraha

            </div>

            <h1 class="display-3 fw-bold">
                Be real. Be anonymous.
            </h1>

            <p class="text-white-50 fs-5">
                Create your personal link and receive honest feedback.
            </p>

        </section>

    </div>
</template>