import { ref, readonly, provide, inject, computed } from 'vue'
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore'
import { db } from './firebase'
import { useAuth } from './auth'

// Create reactive state for bookmarks
const bookmarks = ref([])
const loading = ref(false)
const error = ref(null)

// Create bookmark functions
const fetchBookmarks = async () => {
  const { user } = useAuth()
  if (!user.value) {
    bookmarks.value = []
    return []
  }

  try {
    loading.value = true
    error.value = null
    
    // Reference to the user's document in the 'users' collection
    const userDocRef = doc(db, 'users', user.value.uid)
    const docSnap = await getDoc(userDocRef)
    
    if (docSnap.exists()) {
      // User document exists, get bookmarks
      const userData = docSnap.data()
      bookmarks.value = userData.bookmarks || []
    } else {
      // User document doesn't exist yet, create it with empty bookmarks
      await setDoc(userDocRef, { bookmarks: [] })
      bookmarks.value = []
    }
    
    return bookmarks.value
  } catch (err) {
    console.error('Error fetching bookmarks:', err)
    error.value = err.message
    return []
  } finally {
    loading.value = false
  }
}

const toggleBookmark = async (excuseId) => {
  const { user } = useAuth()
  if (!user.value) {
    console.error('User must be logged in to bookmark')
    return false
  }
  
  try {
    loading.value = true
    error.value = null
    
    // Always fetch the latest bookmarks first
    await fetchBookmarks()
    
    // Reference to the user's document
    const userDocRef = doc(db, 'users', user.value.uid)
    
    // Check if excuse is already bookmarked
    const isBookmarked = bookmarks.value.includes(excuseId)
    
    // Update bookmarks array
    if (isBookmarked) {
      // Remove from bookmarks
      bookmarks.value = bookmarks.value.filter(id => id !== excuseId)
    } else {
      // Add to bookmarks
      bookmarks.value = [...bookmarks.value, excuseId]
    }
    
    // Update the document in Firestore
    await updateDoc(userDocRef, {
      bookmarks: bookmarks.value
    })
    
    return !isBookmarked // Return the new state
  } catch (err) {
    console.error('Error toggling bookmark:', err)
    error.value = err.message
    return null
  } finally {
    loading.value = false
  }
}

const isBookmarked = (excuseId) => {
  return bookmarks.value.includes(excuseId)
}

// Create bookmarks context
export function provideBookmarks() {
  // Initialize by fetching bookmarks
  fetchBookmarks()
  
  provide('bookmarks', {
    bookmarks: readonly(bookmarks),
    loading: readonly(loading),
    error: readonly(error),
    fetchBookmarks,
    toggleBookmark,
    isBookmarked
  })
}

export function useBookmarks() {
  const bookmarksContext = inject('bookmarks')
  if (!bookmarksContext) {
    throw new Error('useBookmarks must be used within a component where provideBookmarks has been called')
  }
  return bookmarksContext
}