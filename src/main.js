import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'

// Wait for Firebase Auth to initialize before mounting app
let app

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App)
      .use(router)
      .mount('#app')
  }
})
