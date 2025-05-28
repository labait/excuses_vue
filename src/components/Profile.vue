<script setup>
import { useAuth } from '../auth'
import { useRouter } from 'vue-router'

const { user, logout } = useAuth()
const router = useRouter()

const handleLogout = async () => {
  try {
    await logout()
    router.push('/login')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>

<template>
  <div>
    <h1>Profile</h1>
    <button 
      v-if="user"
      @click="handleLogout" 
      class="text-sm px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 focus:outline-none transition-colors"
    >
      Logout
    </button>
  </div>
</template>