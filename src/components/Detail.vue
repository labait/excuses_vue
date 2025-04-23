<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { inject } from 'vue'

const route = useRoute()
const id = route.params.id
const data = inject('data')
const item = computed(() => data.value.find(item => item.id === id))

// Format the creation date for display
const formattedDate = computed(() => {
    if (!item.value?.createdAt) return ''
    
    const date = new Date(item.value.createdAt)
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
})
</script>

<template>
    <div class="flex flex-col items-center justify-center">
        <div class="flex flex-col items-center justify-center mb-4">
            <h1 class="text-2xl font-bold mb-2">{{ item?.title }}</h1>
            <p class="text-center">{{ item?.description }}</p>
            <p v-if="formattedDate" class="text-sm text-gray-500 mt-2">Created on {{ formattedDate }}</p>
        </div>
        <img v-if="item?.image" :src="item.image" alt="Excuse image" class="w-full max-w-md max-h-96 object-contain mb-8 rounded-lg">
        <div v-else class="w-full max-w-md h-40 bg-gray-200 flex items-center justify-center mb-8 rounded-lg">
            <p class="text-gray-500">No image available</p>
        </div>
        <div class="flex space-x-4">
            <RouterLink to="/list" class="btn">
                Back to List
            </RouterLink>
            <RouterLink to="/" class="btn">
                Home
            </RouterLink>
        </div>
    </div>
</template>