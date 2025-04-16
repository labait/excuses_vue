<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = () => {
  router.push('/list')
  console.log('navigateTo')
}
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <div class="text-lg mb-4">
      <p>
        Welcome to the app
      </p>
    </div>
    <button @click="navigateTo('/list')" class="btn">
      Enter
    </button>
  </div>
</template>

<style>

</style>