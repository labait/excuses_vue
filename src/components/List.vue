<script setup>
import { inject } from 'vue'
import Item from './Item.vue'

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();

const data = inject('data')
</script>

<template>
    <swiper-container class="list mb-8 w-full">
        <swiper-slide v-for="item in data" class="item">
            <Item 
                class="w-full "
                :key="item.id" 
                :item="item" 
            />
        </swiper-slide>

        
    </swiper-container>
    <!-- navigation buttons -->
    <div class="flex space-x-4 justify-center">
        <RouterLink to="/">
            <button class="btn">
                Go back
            </button>
        </RouterLink>
        <RouterLink to="/add">
            <button class="btn bg-blue-500 text-white hover:bg-blue-600">
                Add New Excuse
            </button>
        </RouterLink>
    </div>
</template>

<style scoped>
.list {
    @apply mx-auto;
}
</style>