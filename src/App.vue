<script setup>
import Loading from './components/loading.vue'
import ProfileMenu from './components/ProfileMenu.vue'

import { useRouter, RouterLink, useRoute } from 'vue-router'
import { provide, ref, onMounted, watch } from 'vue'
const router = useRouter()
const route = useRoute()

import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from './firebase'
import { provideAuth } from './auth'
import { provideBookmarks } from './bookmarks'

// Provide auth context
provideAuth()

// Provide bookmarks context
provideBookmarks()

// Create a query to sort by createdAt in descending order
const excusesQuery = query(
  collection(db, "excuses"),
  orderBy("createdAt", "desc")
)

const loading = ref(true)
const data = ref([])
const loadData = async () => {
  loading.value = true
  try {
    const querySnapshot = await getDocs(excusesQuery)
    
    // Map the documents to our data array with proper timestamps
    data.value = querySnapshot.docs.map((doc) => {
      const docData = doc.data()
      // Convert Firestore Timestamp to JavaScript Date if it exists
      return {
        id: doc.id,
        ...docData,
        // Format the timestamp for display if needed
        createdAt: docData.createdAt ? docData.createdAt.toDate() : null
      }
    })
  } catch (error) {
    console.error("Error loading excuses:", error)
  } finally {
    setTimeout(() => {
      loading.value = false
    }, 500)
  }
}

// Reload data when navigating to list or when app mounts
watch(() => route.path, (newPath) => {
  if (newPath === '/list') {
    loadData()
  }
})

onMounted(() => {
  loadData()
})

provide('data', data)
</script>

<template> 
  <div class="min-h-screen flex flex-col">
    <!-- Header with auth menu -->
    <header class="bg-white shadow-sm py-4 px-6">
      <div class="max-w-screen-sm mx-auto flex justify-between items-center">
        <div class="flex items-center space-x-6">
          <div class="text-xl font-bold text-indigo-600">Excuses App</div>
          
          <!-- Navigation Links (only shown when logged in) -->
          <nav v-if="!loading" class="hidden sm:flex space-x-4">
            <RouterLink 
              to="/list" 
              class="text-gray-600 hover:text-indigo-600 transition-colors"
              active-class="text-indigo-600 font-medium"
            >
              All Excuses
            </RouterLink>
            <RouterLink 
              to="/bookmarks" 
              class="text-gray-600 hover:text-indigo-600 transition-colors"
              active-class="text-indigo-600 font-medium"
            >
              <span class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
                Bookmarks
              </span>
            </RouterLink>
          </nav>
        </div>
        
        <ProfileMenu />
      </div>
    </header>
    
    <!-- Main content -->
    <main class="flex-1 flex flex-col items-center justify-center max-w-screen-sm mx-auto p-6">
      <Loading v-if="loading" />    
      <RouterView v-else/>
    </main>
  </div>
</template>

<style>
main {
  min-height: 80vh;
}
</style>