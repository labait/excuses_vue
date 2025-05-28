<script setup>

import Loading from './components/loading.vue'
import ProfileMenu from './components/ProfileMenu.vue'

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
    add: true,
    bookmarks: false,
  }
})
provide('config', config)

// Provide auth context
provideAuth()

// Provide bookmarks context
//provideBookmarks()

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
          
          <!-- Navigation Links (only shown when logged in) -->
          <nav v-if="!config.loading" class="hidden sm:flex space-x-4">
            <RouterLink 
              v-if="config.features.bookmarks"
              to="/bookmarks" 
              class="text-gray-600 hover: transition-colors"
              active-class=" font-medium"
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
        
        <div>
    
    <!-- User Avatar with Name -->
    <div v-if="user" class="relative">
      <button 
        @click="() => {
          router.push('/profile')
        }"
        class="flex items-center space-x-2 focus:outline-none"
      >
        <span v-if="user" class="text-sm hidden sm:inline">
          {{ user.email ? user.email.split('@')[0] : 'User' }}
        </span>
        <div v-if="user" class="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium">
          {{ user.email ? user.email.charAt(0).toUpperCase() : 'U' }}
        </div>
        <div v-else class="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      </button>
      
      <div 
        v-if="user && isMenuOpen" 
        class="absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-lg z-50"
      >
        <div class="px-4 py-2 text-sm text-gray-700 border-b">
          {{ user.email }}
        </div>
      </div>
    </div>
        </div>
      </div>
    </header>
    
    <!-- Main content -->
    <main class="flex-1 flex flex-col items-center justify-center max-w-screen-sm mx-auto p-6">
      <Loading v-if="config.loading" />    
      <RouterView v-else/>
    </main>

    <footer class="flex justify-between items-center p-4 pb-8 w-full max-w-screen-sm mx-auto">
       <img class="brand-logo" src="./assets/logo_laba_light.svg" alt="synapse">
       <img class="brand-logo" src="./assets/logo_synapses_light.svg" alt="">
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