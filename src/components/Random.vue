<script setup>
import { ref, inject, watch, onMounted } from 'vue'
import Item from './Item.vue'
import { useBookmarks } from '../bookmarks'

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();

const data = inject('data')
const config = inject('config')

const randomIndex = ref(null)
const item = ref(null)

const getRandomExcuse = () => {
    randomIndex.value = Math.floor(Math.random() * data.value.length)
    item.value = data.value[randomIndex.value]
}

const refresh = () => {
    window.location.reload()
}

onMounted(() => {
    getRandomExcuse()
})

</script>

<template>
    <!-- {{ randomIndex }} -->
    <a v-if="item" @click="refresh">
        <Item 
            
            class="w-full"
            :key="item.id" 
            :item="item"
            @bookmark-toggled="handleBookmarkToggle"
        />
    </a>
    <div class="flex space-x-4 justify-center">
        <button class="btn-primary" @click="refresh">
            Get Random Excuse
        </button> 
    </div>
</template>

<style scoped>
.list {
    @apply mx-auto;
}
</style>

<style>
#app {
    background-color: var(--light-color);
}
</style>