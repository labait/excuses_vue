<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { inject } from 'vue'
import BookmarkStar from './BookmarkStar.vue'
import { useBookmarks } from '../bookmarks'

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

// Initialize bookmarks
const { fetchBookmarks } = useBookmarks()
fetchBookmarks()

// Handle bookmark toggling
const handleBookmarkToggle = (event) => {
    console.log(`Bookmark toggled for ${event.excuseId}. New state: ${event.isBookmarked}`)
}
</script>

<template>
    <div class="flex flex-col items-center justify-center">
        <div class="flex flex-col items-center justify-center mb-4 relative w-full">
            <!-- Title and bookmark container -->
            <div class="flex items-center justify-center w-full mb-2 relative">
                <h1 class="text-2xl font-bold">{{ item?.title }}</h1>
                <!-- BookmarkStar on the right side of the title -->
                <div class="absolute right-0 top-0" v-if="item">
                    <BookmarkStar 
                      :excuseId="item.id" 
                      size="lg" 
                      @bookmark-toggled="handleBookmarkToggle"
                    />
                </div>
            </div>
            
            <p class="text-center">{{ item?.description }}</p>
            <div class="text-sm text-gray-500 mt-2 text-center">
              <p v-if="item?.userEmail">Created by {{ item.userEmail }}</p>
              <p v-if="formattedDate">{{ formattedDate }}</p>
            </div>
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