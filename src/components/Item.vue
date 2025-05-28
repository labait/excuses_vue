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
            class="image w-full h-full max-h-120 max-w-120 cursor-pointer rounded-full bg-white aspect-square border-24 border-white mb-8" 
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
            <div class="title text-2xl font-bold text-center">{{ item.text }}</div>
        </div>
   </div>
</template>

<style scoped>
.item {
    /* border: 1px solid green; */
}
</style>