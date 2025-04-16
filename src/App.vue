<script setup>
import { useRouter, RouterLink } from 'vue-router'
import { provide, ref } from 'vue'
const router = useRouter();

const data = ref([
  { id: 1, title: "excuse 1", description: "description 1", image: "https://picsum.photos/320/480" },
  { id: 2, title: "excuse 2", description: "description 2", image: "https://picsum.photos/320/480" },
  { id: 3, title: "excuse 3", description: "description 3", image: "https://picsum.photos/320/480" },
])

provide('data', data)



</script>

<template>
  <main class="flex flex-col items-center justify-center h-screen max-w-screen-sm mx-auto">
    <RouterView/>
  </main>
</template>


<style>
main {

}
</style>