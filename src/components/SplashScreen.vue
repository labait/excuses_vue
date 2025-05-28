<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '../auth'

const router = useRouter()
const { user } = useAuth()

const navigateToApp = () => {
  if (user.value) {
    router.push('/list')
  } else {
    router.push('/login')
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-indigo-600 mb-2">Excuses App</h1>
      <p class="text-lg text-gray-600">
        Your collection of creative excuses
      </p>
    </div>
    <button 
      @click="navigateToApp" 
      class="btn-primary btn-circle"
    >
      {{ user ? 'Premi qui per sfogliare le scuse' : 'Login' }}
    </button>
  </div>
</template>

<style>

</style>