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
    <header class="py-4 px-6 mb-4">
      <div class="max-w-screen-sm mx-auto flex justify-center items-center">
        <div class="flex items-center justify-center space-x-6 text-center">
          <RouterLink to="/">
            <div class="text-4xl font-extrabold">{{ config.appName }}</div>
            <div class="text-xl md:text-2xl">L'App delle scuse</div>
          </RouterLink>
        </div>
      </div>
    </header>
    
    <!-- Main content -->
    <main class="flex flex-col items-center w-full max-w-screen-sm mx-auto max-h-10 z-10 px-6">
      <Loading v-if="config.loading" />    
      <RouterView v-else/>
    </main>

    <footer class="flex fixed bottom-0 w-full justify-between items-end p-4 lg:p-8 pb-8 mx-auto">
       <a href="https://synapses.laba.edu" target="_blank">
        <img class="brand-logo brand-synapses" src="./assets/logo_synapses.png" alt="">
       </a>
       <a href="https://laba.edu" target="_blank">
        <img class="brand-logo" src="./assets/logo_laba.svg" alt="synapse">
       </a>
    </footer>
  </div>
</template>

<style>
main {
  min-height: 80vh;
}

.brand-logo {
  max-height: 1.4rem;
  width: auto;
}

.brand-synapses {
  max-height: 1.8rem;
}
@media screen and (min-width: 750px) {
  .brand-logo {
    max-height: 2rem;
  }
  .brand-synapses {
    max-height: 3rem;
  }
}
#app {
  
}
</style>