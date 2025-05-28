<script setup>
import { inject, watch } from 'vue'
import Item from './Item.vue'
import { useBookmarks } from '../bookmarks'

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();

const data = inject('data')
const config = inject('config')
const { fetchBookmarks } = useBookmarks()

// Fetch bookmarks when the component is mounted
fetchBookmarks()

// Handle bookmark toggling event
const handleBookmarkToggle = (event) => {
  // Already handled by the BookmarkStar component
  // This is just for potential future handling if needed
  console.log(`Bookmark toggled for ${event.excuseId}. New state: ${event.isBookmarked}`)
}
</script>

<template>
    
    <swiper-container class="list mb-8 w-full">
        <swiper-slide v-for="item in data" class="item">
            <Item 
                class="w-full"
                :key="item.id" 
                :item="item"
                @bookmark-toggled="handleBookmarkToggle"
            />
        </swiper-slide>

        
    </swiper-container>
    <!-- navigation buttons -->
    <div class="flex space-x-4 justify-center">
        <RouterLink to="/">
            <button class="btn">
                Go back
            </button>
        </RouterLink>
        <RouterLink v-if="config.features.add" to="/add">
            <button class="btn-primary">
                Add New Excuse
            </button> 
        </RouterLink>
    </div>
</template>

<style scoped>
.list {
    @apply mx-auto;
}
</style>