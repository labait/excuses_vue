<script setup>
import { ref } from 'vue'

import { useRouter } from 'vue-router'
const router = useRouter()

import { useAuth } from '../auth'
const { user, logout } = useAuth()

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}



const navigateToLogin = () => {
  router.push('/login')
}
</script>

<template>
  <div class="flex items-center space-x-3">
    <!-- 
    <button 
      v-if="user"
      @click="handleLogout" 
      class="text-sm px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 focus:outline-none transition-colors"
    >
      Logout
    </button>
    
    <button 
      v-else
      @click="navigateToLogin" 
      class="text-sm px-3 py-1 rounded-md bg-indigo-500 text-white hover:bg-indigo-600 focus:outline-none transition-colors"
    >
      Login
    </button>
  -->
    

  </div>
</template>