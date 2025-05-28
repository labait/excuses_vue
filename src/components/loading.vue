<script setup>

</script>

<template>
    <div class="loading w-screen h-screen flex items-center justify-center">
        <div class="loading-spinner"></div>
    </div>
</template>

<style scoped>
.loading-spinner {
    border: 16px solid var(--primary-color);
    border-top: 16px solid var(--accent-color); 
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