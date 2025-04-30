<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../auth'

const router = useRouter()
const { login, loginWithGoogle, error } = useAuth()

const email = ref('')
const password = ref('')
const isSubmitting = ref(false)
const localError = ref('')

const handleSubmit = async () => {
  if (!email.value || !password.value) {
    localError.value = 'Please enter both email and password'
    return
  }
  
  try {
    isSubmitting.value = true
    localError.value = ''
    await login(email.value, password.value)
    router.push('/list')
  } catch (err) {
    localError.value = err.message || 'Failed to login'
  } finally {
    isSubmitting.value = false
  }
}

const handleGoogleLogin = async () => {
  try {
    isSubmitting.value = true
    localError.value = ''
    await loginWithGoogle()
    router.push('/list')
  } catch (err) {
    localError.value = err.message || 'Failed to login with Google'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input 
          id="email" 
          v-model="email" 
          type="email" 
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input 
          id="password" 
          v-model="password" 
          type="password" 
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      
      <div v-if="localError || error" class="text-red-500 text-sm">
        {{ localError || error }}
      </div>
      
      <div>
        <button 
          type="submit" 
          :disabled="isSubmitting"
          class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {{ isSubmitting ? 'Logging in...' : 'Login' }}
        </button>
      </div>
    </form>
    
    <div class="mt-4">
      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>
      
      <div class="mt-4">
        <button 
          @click="handleGoogleLogin" 
          :disabled="isSubmitting"
          class="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          <span class="flex items-center justify-center">
            <svg class="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            Google
          </span>
        </button>
      </div>
    </div>
    
    <div class="mt-6 text-center">
      <p class="text-sm text-gray-600">
        Don't have an account? 
        <router-link to="/register" class="font-medium text-indigo-600 hover:text-indigo-500">Register</router-link>
      </p>
    </div>
  </div>
</template>