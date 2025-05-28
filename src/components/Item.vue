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
   <div class="excuse flex flex-col items-center justify-center" v-if="item.image" >
        <div 
            class="image mb-8 w-full h-full cursor-pointer rounded-full bg-white aspect-square" 
            :style="{
                backgroundImage: `url(${item.imageUrl})`,
                backgroundSize: '84%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: 'var(--secondary-color)'
            }"
        >
        </div>
        <div class="text mb-8 text-center max-w-md">
            <div class="title text-2xl font-bold text-center">{{ item.text }}</div>
        </div>
   </div>
</template>

<style scoped>
.item {
    @apply min-h-[400px] ;
}
</style>