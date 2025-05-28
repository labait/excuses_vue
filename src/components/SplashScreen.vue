<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '../auth'

const router = useRouter()
const { user } = useAuth()

const navigateToApp = () => {
  router.push('/random')
  // if (user.value) {
  //   router.push('/list')
  // } else {
  //   router.push('/login')
  // }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div class="text-center mb-8">
      <p class="text-lg text-gray-600">
        La tua collezione di scuse creative
      </p>
    </div>
    <button 
      @click="navigateToApp" 
      class="btn-primary btn-circle"
    >
      {{ 'Premi qui per sfogliare le scuse' }}
    </button>
  </div>
</template>

<style scoped>

</style>  