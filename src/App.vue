<script setup>
import Loading from './components/loading.vue'

import { useRouter, RouterLink, useRoute } from 'vue-router'
import { provide, ref, onMounted, watch } from 'vue'
const router = useRouter()
const route = useRoute()

import { getFirestore, collection, getDocs } from "firebase/firestore"
import { app } from './firebase'

const db = getFirestore(app)
const colRef = collection(db, "excuses")

const loading = ref(true)
const data = ref([])
const loadData = async () => {
  loading.value = true
  const docs = await getDocs(colRef)
  data.value = docs.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))
  setTimeout(() => {
    loading.value = false
  }, 500)
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