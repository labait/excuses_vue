<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="flex justify-center items-center gap-8 mb-8">
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="h-24 p-6 transition-all duration-300 hover:drop-shadow-lg" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="h-24 p-6 transition-all duration-300 hover:drop-shadow-lg" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>
