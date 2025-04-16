import { createRouter, createWebHistory } from 'vue-router'
import SplashScreen from './components/SplashScreen.vue'
import List from './components/List.vue'
import Detail from './components/Detail.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: SplashScreen,
    },
    {
      path: '/list',
      component: List,
    },
    {
      path: '/detail/:id',
      component: Detail,
    },
  ],
})

export default router   
