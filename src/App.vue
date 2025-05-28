<script setup>

import Loading from './components/loading.vue'

import { useRouter, RouterLink, useRoute } from 'vue-router'
import { provide, ref, onMounted, watch, computed } from 'vue'
const router = useRouter()
const route = useRoute()

import { storage, db } from './firebase'
import { ref as storageRef,  getDownloadURL } from 'firebase/storage'
import { collection, getDocs, query, orderBy, updateDoc } from 'firebase/firestore'

import { provideAuth } from './auth'

const config = ref({
  loading: false,
  appName: 'Opsy',
  features: {
    add: false,
  }
})
provide('config', config)

// Provide auth context
provideAuth()

// Create a query to sort by createdAt in descending order
const excusesQuery = query(
  collection(db, "excuses"),
  orderBy("createdAt", "desc")
)

const data = ref([])
const loadData = async () => {
  config.value.loading = true
  try {
    const querySnapshot = await getDocs(excusesQuery)
    
    // Map the documents to our data array with proper timestamps
    data.value = await Promise.all(querySnapshot.docs.map(async (doc) => {
      const docData = doc.data()

      // update the imageUrl
      if(!docData.imageUrl) {
        const imageRef = storageRef(storage, docData.image.replace(" ", ""))
        let imageUrl = await getDownloadURL(imageRef)
        await updateDoc(doc.ref, {
          imageUrl: imageUrl
        })
      }

      return {
        id: doc.id,
        ...docData,
        // Format the timestamp for display if needed
        createdAt: docData.createdAt ? docData.createdAt.toDate() : null,
        imageUrl: docData.imageUrl
      }
    }))
    console.log(data.value)
  } catch (error) {
    console.error("Error loading excuses:", error)
  } finally {
    setTimeout(() => {
      config.value.loading = false
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

const bodyClasses = computed(() => {
  const classes = []
  classes.push('test')
  let path = route.path;
  if(path == "/") path = "root";
  classes.push(`page-${path.replace('/', '-')}`)
  return classes
})

provide('data', data)
</script>

<template> 
  <div class="min-h-screen flex flex-col" :class="bodyClasses">
    <!-- Header with auth menu -->
    <header class="py-4 px-6">
      <div class="max-w-screen-sm mx-auto flex justify-center items-center">
        <div class="flex items-center justify-center space-x-6">
          <RouterLink to="/">
            <div class="text-6xl font-bold ">{{ config.appName }}</div>
            <h1 class="text-1xl font-bold text-indigo-600 ps-2">L'App delle scuse</h1>
          </RouterLink>
        </div>
      </div>
    </header>
    
    <!-- Main content -->
    <main class="flex-1 flex flex-col items-center justify-center w-full max-w-screen-sm mx-auto p-6 max-h-20  z-10">
      <Loading v-if="config.loading" />    
      <RouterView v-else/>
    </main>

    <footer class="flex justify-between items-center p-4 pb-8 w-full max-w-screen-sm mx-auto">
       <a href="https://synapses.laba.edu" target="_blank">
        <img class="brand-logo" src="./assets/logo_synapses_light.svg" alt="">
       </a>
       <a href="https://laba.edu" target="_blank">
        <img class="brand-logo" src="./assets/logo_laba_light.svg" alt="synapse">
       </a>
    </footer>
  </div>
</template>

<style>
main {
  min-height: 80vh;
}

.brand-logo {
  max-height: 2.5rem;
  width: auto;
}
#app {
  
}
</style>