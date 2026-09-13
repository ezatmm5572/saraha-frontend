<script setup>
import { computed, onMounted, ref } from "vue"
import AppLayout from "../components/AppLayout.vue"
import MessageCard from "../components/MessageCard.vue"
import { backend } from "../services/backend"

const messages = ref([])
const search = ref("")
const loading = ref(false)
const error = ref("")

const filtered = computed(() => {
    const q = search.value.trim().toLowerCase()
    return q ? messages.value.filter(m => (m.content || "").toLowerCase().includes(q)) : messages.value
})

const load = async () => {
    loading.value = true
    error.value = ""
    try {
        const { data } = await backend.getMyMessages()
        messages.value = data.messages || []
    } catch (err) {
        error.value = err.response?.data?.error || "Could not load messages"
    } finally {
        loading.value = false
    }
}

onMounted(load)
</script>

<template>
    <AppLayout>
        <div class="d-flex justify-content-between flex-wrap gap-3 align-items-end mb-4">
            <div><h2 class="fw-bold mb-1">My Messages</h2><p class="text-secondary mb-0">All anonymous messages sent to you.</p></div>
            <button class="btn btn-brand" @click="load"><i class="bi bi-arrow-clockwise me-1"></i>Refresh</button>
        </div>

        <div class="card-modern p-3 mb-4">
            <input v-model="search" class="form-control" placeholder="Search your messages...">
        </div>

        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <div v-if="loading" class="text-center py-5">Loading messages...</div>
        <div v-else-if="filtered.length" class="d-grid gap-3">
            <MessageCard v-for="message in filtered" :key="message._id" :message="message" />
        </div>
        <div v-else class="card-modern text-center text-secondary p-5">No messages found.</div>
    </AppLayout>
</template>