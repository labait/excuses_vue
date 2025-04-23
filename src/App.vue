<script setup>
import Loading from './components/loading.vue'

import { useRouter, RouterLink } from 'vue-router'
import { provide, ref, onMounted } from 'vue'
const router = useRouter();

import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from './firebase';

const db = getFirestore(app);
const colRef = collection(db, "excuses");

const loading = ref(true)
const data = ref([])
const loadData = async () => {
  const docs = await getDocs(colRef);
  data.value = docs.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
}

onMounted(() => {
  loadData();
  setTimeout(() => {
    loading.value = false;
  }, 500);
})

provide('data', data)



</script>

<template> 
  <main class="flex flex-col items-center justify-center h-screen max-w-screen-sm mx-auto">
    <Loading v-if="loading" />    
    <RouterView v-else/>
  </main>
</template>


<style>
main {

}
</style>