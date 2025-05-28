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
    <button 
      v-if="user"
      @click="handleLogout" 
      class="btn-primary"
    >
      Logout
    </button>
  </div>
</template>