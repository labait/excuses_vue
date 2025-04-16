<script setup>
import { defineProps } from 'vue'

const props = defineProps(
    {
        item: {
            type: Object,
            required: true,
        },
    }
)
</script>

<template>
    <RouterLink :to="`/detail/${item.id}`">
        <div class="item pb-4 mb-4 cursor-pointer hover:bg-gray-100 p-4 rounded-md flex flex-col items-center justify-center">
            <div class="title text-2xl font-bold text-center">{{ item.title }}</div>
            <div class="description text-center">{{ item.description }}</div>
        </div>
    </RouterLink>
</template>

<style scoped>
.item {
    @apply min-h-[400px] ;
}
</style>