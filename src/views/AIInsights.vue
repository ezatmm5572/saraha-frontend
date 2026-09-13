<script setup>
import { computed, onMounted, ref } from "vue"
import AppLayout from "../components/AppLayout.vue"
import { backend } from "../services/backend"

const analysis = ref(null)
const loading = ref(false)
const error = ref("")

const ring = computed(() => ({
    "--positive": analysis.value?.sentiment?.positive || 0,
    "--neutral": analysis.value?.sentiment?.neutral || 0
}))

const load = async () => {
    loading.value = true
    error.value = ""
    try {
        const { data } = await backend.getAIInsights()
        analysis.value = data.data?.analysis || null
    } catch (err) {
        error.value = err.response?.data?.error || err.response?.data?.message || "Could not analyze messages"
    } finally {
        loading.value = false
    }
}

onMounted(load)
</script>

<template>
    <AppLayout>
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
            <div><h2 class="fw-bold mb-1">🤖 AI Insights</h2><p class="text-secondary mb-0">Analysis based on your anonymous messages.</p></div>
            <button class="btn btn-brand" @click="load" :disabled="loading">{{ loading ? "Analyzing..." : "Analyze Messages" }}</button>
        </div>

        <div v-if="loading" class="card-modern text-center p-5">
            <div class="spinner-border text-primary mb-3"></div>
            <div class="fw-semibold">AI is analyzing your messages...</div>
        </div>

        <div v-else-if="error" class="card-modern p-4"><div class="alert alert-danger mb-0">{{ error }}</div></div>

        <div v-else-if="analysis" class="row g-4">
            <div class="col-lg-4">
                <div class="card-modern p-4 h-100">
                    <h5 class="fw-bold">Overall Sentiment</h5>
                    <div class="d-flex justify-content-center py-4">
                        <div class="sentiment" :style="ring">
                            <div class="sentiment-inner">
                                <div><strong class="fs-2">{{ analysis.sentiment?.positive || 0 }}%</strong><div class="text-secondary">Positive</div></div>
                            </div>
                        </div>
                    </div>
                    <div class="d-grid gap-2">
                        <div class="d-flex justify-content-between"><span>🟢 Positive</span><b>{{ analysis.sentiment?.positive || 0 }}%</b></div>
                        <div class="d-flex justify-content-between"><span>🟡 Neutral</span><b>{{ analysis.sentiment?.neutral || 0 }}%</b></div>
                        <div class="d-flex justify-content-between"><span>🔴 Negative</span><b>{{ analysis.sentiment?.negative || 0 }}%</b></div>
                    </div>
                </div>
            </div>

            <div class="col-lg-8">
                <div class="card-modern p-4 h-100">
                    <div class="stat-icon mb-3"><i class="bi bi-chat-quote"></i></div>
                    <h5 class="fw-bold">Summary</h5>
                    <p class="text-secondary fs-5 mb-0">{{ analysis.summary }}</p>
                </div>
            </div>

            <div class="col-md-6">
                <div class="card-modern p-4 h-100">
                    <h5 class="fw-bold mb-3">🏷️ Main Topics</h5>
                    <div class="d-flex flex-wrap gap-2"><span v-for="topic in analysis.topics || []" :key="topic" class="badge-soft">{{ topic }}</span></div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="card-modern p-4 h-100">
                    <h5 class="fw-bold mb-3">🔥 Common Words</h5>
                    <div class="d-flex flex-wrap gap-2"><span v-for="word in analysis.commonWords || []" :key="word" class="badge-soft">{{ word }}</span></div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>