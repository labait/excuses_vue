<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { inject } from 'vue'

const route = useRoute()
const id = route.params.id
const data = inject('data')
const item = computed(() => data.value.find(item => item.id === parseInt(id)))
</script>

<template>
    <div class="flex flex-col items-center justify-center">
        <div class="flex flex-col items-center justify-center mb-4">
            <h1>{{ item.title }}</h1>
            <p>{{ item.description }}</p>
        </div>
        <img :src="item.image" alt="image" class="w-full h-full mb-8">
        <RouterLink to="/" class="btn ">
            Go back
        </RouterLink>
    </div>
</template>