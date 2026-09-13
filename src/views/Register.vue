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

const submit = async () => {
    loading.value = true
    error.value = ""

    try {
        await backend.signUp({
            ...form,
            age: form.age ? Number(form.age) : undefined
        })
        router.push("/login")
    } catch (err) {
        error.value = err.response?.data?.error || err.response?.data?.message || err.message || "Registration failed"
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="auth">
        <section class="auth-main">
            <div class="auth-card">
                <RouterLink to="/" class="logo text-dark mb-4"><div class="logo-mark"><i class="bi bi-chat-dots-fill"></i></div>Saraha</RouterLink>
                <h2 class="fw-bold">Create account</h2>
                <p class="text-secondary">Start receiving anonymous messages.</p>

                <div v-if="error" class="alert alert-danger">{{ error }}</div>

                <form @submit.prevent="submit">
                    <div class="row">
                        <div class="col-md-6 mb-3"><label class="form-label">First name</label><input v-model="form.firstName" class="form-control" minlength="3" required></div>
                        <div class="col-md-6 mb-3"><label class="form-label">Last name</label><input v-model="form.lastName" class="form-control" minlength="3" required></div>
                    </div>
                    <div class="mb-3"><label class="form-label">Email</label><input v-model="form.email" type="email" class="form-control" required></div>
                    <div class="mb-3"><label class="form-label">Phone</label><input v-model="form.phone" type="text" class="form-control" required></div>
                    <div class="row">
                        <div class="col-md-6 mb-3"><label class="form-label">Age</label><input v-model="form.age" type="number" min="1" class="form-control"></div>
                        <div class="col-md-6 mb-3"><label class="form-label">Gender</label><select v-model="form.gender" class="form-select"><option value="male">Male</option><option value="female">Female</option></select></div>
                    </div>
                    <div class="mb-3"><label class="form-label">Password</label><input v-model="form.password" type="password" minlength="8" class="form-control" required></div>
                    <div class="mb-4"><label class="form-label">Confirm password</label><input v-model="form.npassword" type="password" minlength="8" class="form-control" required></div>
                    <button class="btn btn-brand w-100" :disabled="loading">{{ loading ? "Creating..." : "Create Account" }}</button>
                </form>

                <p class="text-center text-secondary mt-4">Already have an account? <RouterLink to="/login" class="fw-bold">Sign in</RouterLink></p>
            </div>
        </section>

        <section class="auth-side">
            <div class="logo mb-5"><div class="logo-mark"><i class="bi bi-chat-dots-fill"></i></div>Saraha</div>
            <h1 class="display-3 fw-bold">Be real. Be anonymous.</h1>
            <p class="text-white-50 fs-5">Create your personal link and receive honest feedback.</p>
        </section>
    </div>
</template>