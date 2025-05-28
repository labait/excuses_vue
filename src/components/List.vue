<script setup>
import { inject, watch } from 'vue'
import Item from './Item.vue'

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();

const data = inject('data')
const config = inject('config')

</script>

<template>
    
    <swiper-container class="list mb-8 w-full">
        <swiper-slide v-for="item in data" class="item">
            <Item 
                class="w-full"
                :key="item.id" 
                :item="item"
            />
        </swiper-slide>

        
    </swiper-container>
    <!-- navigation buttons -->
    <div class="flex space-x-4 justify-center">
        <RouterLink v-if="config.features.add" to="/add">
            <button class="btn-primary">
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