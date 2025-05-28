import { createRouter, createWebHistory } from 'vue-router'
import SplashScreen from './components/SplashScreen.vue'
import List from './components/List.vue'
import Form from './components/Form.vue'
import Login from './components/Login.vue'
import Profile from './components/Profile.vue'
import { auth } from './firebase'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: SplashScreen,
    },
    {
      path: '/login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/list',
      component: List,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/add',
      component: Form,
      meta: {
        requiresAuth: true
      }
    },
  ],
})

// Navigation guards
router.beforeEach((to, from, next) => {
  const currentUser = auth.currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest)

  if (requiresAuth && !currentUser) {
    next('/login')
  } else if (requiresGuest && currentUser) {
    next('/list')
  } else {
    next()
  }
})

export default router
