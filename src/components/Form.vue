<script setup>
import { ref } from 'vue'
import { getFirestore, collection, addDoc } from "firebase/firestore"
import { app } from '../firebase'
import { useRouter } from 'vue-router'

const router = useRouter()
const db = getFirestore(app)
const excusesCollection = collection(db, "excuses")

const title = ref('')
const description = ref('')
const image = ref('')
const loading = ref(false)
const error = ref(null)

const submitForm = async () => {
  if (!title.value || !description.value) {
    error.value = 'Title and description are required'
    return
  }
  
  error.value = null
  loading.value = true
  
  try {
    await addDoc(excusesCollection, {
      title: title.value,
      description: description.value,
      image: image.value || null
    })
    
    // Reset form
    title.value = ''
    description.value = ''
    image.value = ''
    
    // Navigate back to list
    router.push('/list')
  } catch (e) {
    error.value = 'Failed to add excuse: ' + e.message
    console.error("Error adding document: ", e)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="p-6 max-w-md mx-auto">
    <h2 class="text-2xl font-bold mb-6 text-center">Add New Excuse</h2>
    
    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">Title</label>
        <input 
          v-model="title" 
          type="text" 
          class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter excuse title"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-1">Description</label>
        <textarea 
          v-model="description" 
          class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
          placeholder="Enter excuse description"
        ></textarea>
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-1">Image URL (optional)</label>
        <input 
          v-model="image" 
          type="text" 
          class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter image URL"
        />
      </div>
      
      <div v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</div>
      
      <div class="flex space-x-4 mt-6">
        <button
          type="button"
          @click="router.push('/list')"
          class="flex-1 py-2 px-4 border rounded-md hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="loading"
          class="flex-1 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {{ loading ? 'Saving...' : 'Save Excuse' }}
        </button>
      </div>
    </form>
  </div>
</template>