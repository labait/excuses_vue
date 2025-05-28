<script setup>
import { defineProps, computed } from 'vue'
import BookmarkStar from './BookmarkStar.vue'

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
    <div class="item pb-4 mb-4 cursor-pointer hover:bg-gray-100 p-4 rounded-md flex flex-col items-center justify-center relative">
        <!-- Bookmark star (top right) -->
        <div class="absolute top-4 right-4 z-10">
            <BookmarkStar :excuseId="item.id" />
        </div>
        
        <RouterLink :to="`/detail/${item.id}`" class="w-full flex flex-col items-center">
            <div v-if="item.image" class="image-container mb-4">
                {{ item.imageUrl }}
                <img :src="item.imageUrl" alt="Excuse image" class="w-full max-h-40 object-contain rounded-md" />
            </div>
            <div class="title text-2xl font-bold text-center">{{ item.title }}</div>
            <div class="description text-center">{{ item.description }}</div>
            <div class="flex flex-col items-center mt-2 text-sm text-gray-500">
                <div v-if="item.userEmail" class="user">By: {{ item.userEmail }}</div>
                <div v-if="formattedDate" class="date">{{ formattedDate }}</div>
            </div>
        </RouterLink>
    </div>
</template>

<style scoped>
.item {
    @apply min-h-[400px] ;
}
</style>