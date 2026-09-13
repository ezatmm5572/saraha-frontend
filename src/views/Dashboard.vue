<script setup>
import { computed, onMounted, ref } from "vue"
import AppLayout from "../components/AppLayout.vue"
import MessageCard from "../components/MessageCard.vue"
import { backend } from "../services/backend"

const messages = ref([])
const loading = ref(false)

const user = computed(() => JSON.parse(localStorage.getItem("user") || "{}"))
const publicLink = computed(() => `${window.location.origin}/message/${user.value._id || ""}`)

const loadMessages = async () => {
    loading.value = true
    try {
        const { data } = await backend.getMyMessages()
        messages.value = data.messages || []
    } finally {
        loading.value = false
    }
}

const copyLink = async () => {
    try {
        await navigator.clipboard.writeText(publicLink.value)
        alert("Your Saraha link has been copied")
    } catch {
        alert(publicLink.value)
    }
}

onMounted(loadMessages)
</script>

<template>
    <AppLayout>
        <div class="row g-4">
            <div class="col-lg-7">
                <div class="card-modern p-4 h-100">
                    <div class="d-flex justify-content-between align-items-start gap-3 flex-wrap">
                        <div>
                            <span class="badge-soft">YOUR PUBLIC LINK</span>
                            <h4 class="fw-bold mt-3">Share your Saraha link 💌</h4>
                            <p class="text-secondary mb-0">Anyone can send you an anonymous message using this link.</p>
                        </div>
                        <button class="btn btn-brand" @click="copyLink"><i class="bi bi-copy me-1"></i>Copy</button>
                    </div>
                    <input :value="publicLink" class="form-control mt-3" readonly>
                </div>
            </div>

            <div class="col-lg-5">
                <div class="card-modern p-4 h-100">
                    <div class="stat-icon mb-3"><i class="bi bi-stars"></i></div>
                    <h4 class="fw-bold">Discover AI Insights</h4>
                    <p class="text-secondary">Analyze the sentiment and topics in your messages.</p>
                    <RouterLink to="/ai-insights" class="btn btn-brand">Open AI Insights</RouterLink>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card-modern p-3 d-flex gap-3 align-items-center">
                    <div class="stat-icon"><i class="bi bi-envelope-fill"></i></div>
                    <div><div class="fw-bold fs-4">{{ messages.length }}</div><small class="text-secondary">Total Messages</small></div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card-modern p-3 d-flex gap-3 align-items-center">
                    <div class="stat-icon"><i class="bi bi-person-check-fill"></i></div>
                    <div><div class="fw-bold fs-4">{{ user.firstName || "User" }}</div><small class="text-secondary">Current User</small></div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card-modern p-3 d-flex gap-3 align-items-center">
                    <div class="stat-icon"><i class="bi bi-shield-check"></i></div>
                    <div><div class="fw-bold fs-4">100%</div><small class="text-secondary">Anonymous Messages</small></div>
                </div>
            </div>

            <div class="col-12">
                <div class="card-modern p-4">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <div><h4 class="fw-bold mb-1">Recent Messages</h4><small class="text-secondary">Latest anonymous feedback.</small></div>
                        <RouterLink to="/messages">View all</RouterLink>
                    </div>
                    <div v-if="loading" class="text-center py-4">Loading...</div>
                    <div v-else-if="messages.length" class="d-grid gap-2">
                        <MessageCard v-for="message in messages.slice(0,5)" :key="message._id" :message="message" />
                    </div>
                    <div v-else class="text-center text-secondary py-5">You don't have any messages yet.</div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>