<script setup>

</script>

<template>
    <div class="loading w-full h-full flex items-center justify-center">
        <div class="loading-spinner"></div>
    </div>
</template>

<style scoped>
.loading-spinner {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>