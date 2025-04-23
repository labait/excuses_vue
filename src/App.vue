<script setup>
import Loading from './components/loading.vue'

import { useRouter, RouterLink, useRoute } from 'vue-router'
import { provide, ref, onMounted, watch } from 'vue'
const router = useRouter()
const route = useRoute()

import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from './firebase'

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
  <main class="flex flex-col items-center justify-center h-screen max-w-screen-sm mx-auto">
    <Loading v-if="loading" />    
    <RouterView v-else/>
  </main>
</template>


<style>
main {

}
</style>