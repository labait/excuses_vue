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
        <div class="item pb-4 mb-4 cursor-pointer hover:bg-gray-100 p-4 rounded-md">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
        </div>
    </RouterLink>
</template>

<style>
</style>