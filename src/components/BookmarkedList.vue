<script setup>
import { ref, onMounted, computed } from 'vue'
import { useBookmarks } from '../bookmarks'
import { collection, getDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'
import Item from './Item.vue'

const { bookmarks, fetchBookmarks, loading: bookmarksLoading } = useBookmarks()
const bookmarkedItems = ref([])
const loading = ref(true)
const error = ref(null)

// Fetch all bookmarked excuses
const fetchBookmarkedItems = async () => {
  try {
    loading.value = true
    error.value = null
    
    // Refresh bookmarks
    await fetchBookmarks()
    
    if (bookmarks.value.length === 0) {
      bookmarkedItems.value = []
      return
    }
    
    // Fetch excuse details for each bookmarked ID
    const items = []
    for (const excuseId of bookmarks.value) {
      const excuseDoc = await getDoc(doc(db, 'excuses', excuseId))
      if (excuseDoc.exists()) {
        const excuseData = excuseDoc.data()
        items.push({
          id: excuseDoc.id,
          ...excuseData,
          // Format timestamp if it exists
          createdAt: excuseData.createdAt ? excuseData.createdAt.toDate() : null
        })
      }
    }
    
    bookmarkedItems.value = items
  } catch (err) {
    console.error('Error fetching bookmarked items:', err)
    error.value = 'Failed to load bookmarked excuses'
  } finally {
    loading.value = false
  }
}

// When a bookmark is toggled, refresh the list
const handleBookmarkToggle = () => {
  fetchBookmarkedItems()
}

onMounted(() => {
  fetchBookmarkedItems()
})

// Computed property to check if there are any bookmarks
const hasBookmarks = computed(() => bookmarkedItems.value.length > 0)
</script>

<template>
  <div class="w-full">
    <h1 class="text-2xl font-bold mb-6 text-center">My Bookmarked Excuses</h1>
    
    <div v-if="loading" class="flex justify-center py-10">
      <div class="loading-spinner w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
    
    <div v-else-if="error" class="text-red-500 text-center py-6">
      {{ error }}
    </div>
    
    <div v-else-if="!hasBookmarks" class="text-gray-500 text-center py-10">
      <p class="mb-4">You haven't bookmarked any excuses yet.</p>
      <RouterLink to="/list" class="text-indigo-600 hover:underline">
        Browse excuses to bookmark some
      </RouterLink>
    </div>
    
    <div v-else class="grid grid-cols-1 gap-6">
      <Item 
        v-for="item in bookmarkedItems" 
        :key="item.id" 
        :item="item"
        @bookmark-toggled="handleBookmarkToggle"
      />
    </div>
    
    <div class="flex justify-center mt-8 space-x-4">
      <RouterLink to="/list" class="btn">
        Back to All Excuses
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>