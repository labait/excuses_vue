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

// Provide auth context
provideAuth()

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
        <div class="text-xl font-bold text-indigo-600">Excuses App</div>
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