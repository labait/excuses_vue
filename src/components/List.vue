<script setup>
import { inject, watch, ref, onMounted } from 'vue'
import Item from './Item.vue'

import { register } from 'swiper/element/bundle';
register();

const data = inject('data')
const config = inject('config')
const randomIndex = ref(0)

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
const swiperRef = ref(null)


const refresh = () => {
    randomIndex.value = Math.floor(Math.random() * data.value.length)
    console.log(randomIndex.value, swiperRef.value)
    swiperRef.value.slideTo(randomIndex.value)
}

onMounted(() => {
    const swiperEl = document.querySelector('swiper-container');
    // swiper parameters
    const swiperParams = {
        slidesPerView: 1,
        loop: true,
        breakpoints: {
            640: {
                slidesPerView: 1,
            },
            1024: {
                slidesPerView: 1,
            },
        },
        on: {
            init(instance) {
                console.log('swiper init', instance)
                swiperRef.value = instance
            },
        },
    };
    Object.assign(swiperEl, swiperParams);
    swiperEl.initialize();
})

</script>

<template>
    <swiper-container 
        class="list w-full "
        init="false"
    >
        <swiper-slide v-for="item in data" class="">
            <Item 
                class=""
                :key="item.id" 
                :item="item"
            />
        </swiper-slide>
    </swiper-container>
    
    <div class="flex justify-center mb-4 fixed bottom-0 z-100 hover:text-black">
        <button class="refresh" @click="refresh">
            <div class="text-7xl md:text-8xl">⟳</div>
        </button> 
    </div>
</template>

<style scoped>
.list {
    @apply mx-auto;
}
.refresh {
   cursor: pointer;
   font-weight: bold;
   color: var(--accent-color);
}
</style>
<style>
    .page--list {
    background: var(--light-color);
}
</style>