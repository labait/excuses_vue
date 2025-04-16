<script setup>
import { inject } from 'vue'
import Item from './Item.vue'
const data = inject('data')
</script>

<template>
    <div class="list mb-8 w-full">
        <Item 
        v-for="item in data" 
        class="w-full "
        :key="item.id" 
        :item="item" 
     />

    </div>
    <!-- go back to home -->
    <RouterLink to="/">
        <button class="btn">
            Go back
        </button>
    </RouterLink>
</template>

<style>
</style>