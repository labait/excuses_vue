<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps(
    {
        item: {
            type: Object,
            required: true,
        },
    }
)

// Format the creation date for display
const formattedDate = computed(() => {
    if (!props.item.createdAt) return ''
    
    // Format date as MM/DD/YYYY
    const date = new Date(props.item.createdAt)
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
})
</script>

<template>
   <div class="item flex flex-col items-center justify-center" v-if="item.image" >
        <div 
            class="image w-full cursor-pointer rounded-full bg-white aspect-square mb-4 sm:mb-8" 
            :style="{
                backgroundImage: `url(${item.imageUrl})`,
                backgroundSize: '80%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: 'var(--secondary-color)'
            }"
        >
        </div>
        <div class="text text-center max-w-md">
            <div class="title text-lg sm:text-xl md:text-2xl leading-tight font-bold text-center">{{ item.text }}</div>
        </div>
   </div>
</template>

<style scoped>
.item {
    /* border: 1px solid green; */
}
.image {
    height: calc(75vw);
    width: calc(75vw);
    max-width: 86vw;
    max-height: 86vw;
    aspect-ratio:1/1;
}
@media (min-aspect-ratio: 2/4) {
  .image {
    height: calc(75vh - 12rem);
    width: calc(75vh - 12rem);
  }
}

</style>