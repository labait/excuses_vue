<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps(
    {
        item: {
            type: Object,
            required: true,
        },
    }
)

// Format the creation date for display
const formattedDate = computed(() => {
    if (!props.item.createdAt) return ''
    
    // Format date as MM/DD/YYYY
    const date = new Date(props.item.createdAt)
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
})
</script>

<template>
    <RouterLink :to="`/detail/${item.id}`">
        <div class="item pb-4 mb-4 cursor-pointer hover:bg-gray-100 p-4 rounded-md flex flex-col items-center justify-center">
            <div v-if="item.image" class="image-container mb-4">
                <img :src="item.image" alt="Excuse image" class="w-full max-h-40 object-contain rounded-md" />
            </div>
            <div class="title text-2xl font-bold text-center">{{ item.title }}</div>
            <div class="description text-center">{{ item.description }}</div>
            <div v-if="formattedDate" class="date text-sm text-gray-500 mt-2">{{ formattedDate }}</div>
        </div>
    </RouterLink>
</template>

<style scoped>
.item {
    @apply min-h-[400px] ;
}
</style>