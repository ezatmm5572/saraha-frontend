<script setup>
import { ref } from "vue"
import { useRoute } from "vue-router"
import { backend } from "../services/backend"

const route = useRoute()
const content = ref("")
const loading = ref(false)
const error = ref("")
const success = ref("")

const submit = async () => {
    loading.value = true
    error.value = ""
    success.value = ""
    try {
        const { data } = await backend.sendMessage(route.params.userID, {
            content: content.value
        })
        success.value = data.message || "Message sent successfully"
        content.value = ""
    } catch (err) {
        error.value = err.response?.data?.error || err.response?.data?.message || "Could not send message"
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="public-page">
        <RouterLink to="/" class="logo text-white"><div class="logo-mark"><i class="bi bi-chat-dots-fill"></i></div>Saraha</RouterLink>

        <div class="public-card">
            <div class="text-center mb-4">
                <div class="avatar mx-auto mb-3"><i class="bi bi-incognito"></i></div>
                <h2 class="fw-bold">Send an anonymous message</h2>
                <p class="text-secondary">Write whatever you want. Your identity will remain unknown.</p>
            </div>

            <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <div v-if="success" class="alert alert-success">{{ success }}</div>

            <form @submit.prevent="submit">
                <textarea v-model="content" class="form-control" rows="7" placeholder="Write your message here..." required></textarea>
                <button class="btn btn-brand w-100 mt-3" :disabled="loading">
                    <i class="bi bi-send me-2"></i>{{ loading ? "Sending..." : "Send Anonymously" }}
                </button>
            </form>
        </div>
    </div>
</template>