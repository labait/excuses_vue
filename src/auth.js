import { ref, readonly, provide, inject } from 'vue'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth'
import { auth, googleProvider } from './firebase'

// Create reactive state for authentication
const user = ref(null)
const loading = ref(true)
const error = ref(null)

// Create auth functions
const login = async (email, password) => {
  try {
    error.value = null
    loading.value = true
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    user.value = userCredential.user
    return userCredential.user
  } catch (err) {
    error.value = err.message
    throw err
  } finally {
    loading.value = false
  }
}

const register = async (email, password) => {
  try {
    error.value = null
    loading.value = true
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    user.value = userCredential.user
    return userCredential.user
  } catch (err) {
    error.value = err.message
    throw err
  } finally {
    loading.value = false
  }
}

const loginWithGoogle = async () => {
  try {
    error.value = null
    loading.value = true
    const userCredential = await signInWithPopup(auth, googleProvider)
    user.value = userCredential.user
    return userCredential.user
  } catch (err) {
    error.value = err.message
    throw err
  } finally {
    loading.value = false
  }
}

const logout = async () => {
  try {
    error.value = null
    loading.value = true
    await signOut(auth)
    user.value = null
  } catch (err) {
    error.value = err.message
    throw err
  } finally {
    loading.value = false
  }
}

// Setup auth state listener
onAuthStateChanged(auth, (currentUser) => {
  user.value = currentUser
  loading.value = false
})

// Create auth context
export function provideAuth() {
  provide('auth', {
    user: readonly(user),
    loading: readonly(loading),
    error: readonly(error),
    login,
    register,
    loginWithGoogle,
    logout
  })
}

export function useAuth() {
  const auth = inject('auth')
  if (!auth) {
    throw new Error('useAuth must be used within a component where provideAuth has been called')
  }
  return auth
}