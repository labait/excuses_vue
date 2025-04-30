import { createRouter, createWebHistory } from 'vue-router'
import SplashScreen from './components/SplashScreen.vue'
import List from './components/List.vue'
import Detail from './components/Detail.vue'
import Form from './components/Form.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import BookmarkedList from './components/BookmarkedList.vue'
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
      path: '/register',
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/list',
      component: List,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/bookmarks',
      component: BookmarkedList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/detail/:id',
      component: Detail,
      meta: {
        requiresAuth: true
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
