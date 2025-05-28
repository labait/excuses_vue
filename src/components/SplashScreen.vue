<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '../auth'

const router = useRouter()
const { user } = useAuth()

const navigateToApp = () => {
  router.push('/list')
}
</script>

<template>
  <div class="flex flex-col items-center justify-center">    
    <button 
      @click="navigateToApp" 
      class="btn-primary btn-circle"
    >
      {{ 'Premi qui per sfogliare le scuse' }}
    </button>
  </div>
</template>

<style>
  .page-root {
    background: url(../assets/page_bg_light.svg);   
    background-size: 10%; 
  }
</style>  