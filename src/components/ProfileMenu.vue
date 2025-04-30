<script setup>
import { ref } from 'vue'
import { useAuth } from '../auth'
import { useRouter } from 'vue-router'

const { user, logout } = useAuth()
const router = useRouter()
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const handleLogout = async () => {
  try {
    await logout()
    router.push('/login')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}

const navigateToLogin = () => {
  router.push('/login')
}
</script>

<template>
  <div class="flex items-center space-x-3">
    <!-- Logout Button -->
    <button 
      v-if="user"
      @click="handleLogout" 
      class="text-sm px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 focus:outline-none transition-colors"
    >
      Logout
    </button>
    
    <!-- Login Button -->
    <button 
      v-else
      @click="navigateToLogin" 
      class="text-sm px-3 py-1 rounded-md bg-indigo-500 text-white hover:bg-indigo-600 focus:outline-none transition-colors"
    >
      Login
    </button>
    
    <!-- User Avatar with Name -->
    <div class="relative">
      <button 
        @click="user ? toggleMenu : navigateToLogin"
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
</template>