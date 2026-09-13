<script setup>
defineProps({ message: Object })
</script>

<template>
    <div class="message-card">
        <div class="avatar"><i class="bi bi-person-fill"></i></div>
        <div class="flex-grow-1">
            <div class="fw-semibold">{{ message.content }}</div>
            <small class="text-secondary">{{ message.createdAt ? new Date(message.createdAt).toLocaleString() : "Anonymous message" }}</small>
        </div>
    </div>
</template>