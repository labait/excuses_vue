<script setup>
import { ref } from 'vue'
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage"
import { db, storage } from '../firebase'
import { useRouter } from 'vue-router'
import { useAuth } from '../auth'

const router = useRouter()
const { user } = useAuth()
const excusesCollection = collection(db, "excuses")

const title = ref('')
const description = ref('')
const imageFile = ref(null)
const imagePreview = ref('')
const loading = ref(false)
const error = ref(null)
const uploadProgress = ref(0)

// Image validation and preview
const handleImageChange = (event) => {
  const file = event.target.files[0]
  if (!file) {
    imageFile.value = null
    imagePreview.value = ''
    return
  }
  
  // Validate file type
  const validTypes = ['image/jpeg', 'image/png', 'image/jpg']
  if (!validTypes.includes(file.type)) {
    error.value = 'Please select a JPG or PNG image'
    imageFile.value = null
    imagePreview.value = ''
    return
  }
  
  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    error.value = 'Image size should be less than 5MB'
    imageFile.value = null
    imagePreview.value = ''
    return
  }
  
  // Store the file
  imageFile.value = file
  
  // Create preview
  const reader = new FileReader()
  reader.onload = (e) => {
    imagePreview.value = e.target.result
  }
  reader.readAsDataURL(file)
  
  // Clear any previous errors
  error.value = null
}

const submitForm = async () => {
  // Form validation
  if (!title.value || !description.value) {
    error.value = 'Title and description are required'
    return
  }
  
  if (!imageFile.value) {
    error.value = 'Please upload an image'
    return
  }
  
  error.value = null
  loading.value = true
  
  try {
    let imageUrl = null
    
    // Upload image if provided
    if (imageFile.value) {
      const file = imageFile.value
      const fileExt = file.name.split('.').pop()
      const fileName = `excuses/${Date.now()}.${fileExt}`
      const fileRef = storageRef(storage, fileName)
      
      // Upload file
      const uploadTask = await uploadBytes(fileRef, file)
      
      // Get download URL
      imageUrl = await getDownloadURL(fileRef)
    }
    
    // Add document to Firestore with timestamp and user ID
    await addDoc(excusesCollection, {
      title: title.value,
      description: description.value,
      image: imageUrl,
      createdAt: serverTimestamp(), // Add timestamp for sorting
      userId: user.value?.uid || 'anonymous', // Add user ID
      userEmail: user.value?.email || 'anonymous'
    })
    
    // Reset form
    title.value = ''
    description.value = ''
    imageFile.value = null
    imagePreview.value = ''
    uploadProgress.value = 0
    
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
        <label class="block text-sm font-medium mb-1">Image (JPG or PNG only)</label>
        <input 
          type="file" 
          accept="image/jpeg, image/png, image/jpg"
          @change="handleImageChange"
          class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <!-- Image Preview -->
        <div v-if="imagePreview" class="mt-2">
          <img :src="imagePreview" alt="Preview" class="max-h-40 rounded-md" />
        </div>
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