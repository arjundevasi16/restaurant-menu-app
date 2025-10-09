import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import apiClient from '@/plugins/axios'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref<{ id?: string; name?: string; role?: string } | null>(null)

    const fetchUser = async () => {
      try {
        const res = await apiClient.post('/auth/verify-user')
        user.value = res.data.user
        return true
      } catch (err) {
        user.value = null
        return false
      }
    }
    const logout = async () => {
      try {
        await apiClient.post('/auth/logout')
      } catch (err) {
        console.error('Logout error:', err)
      }
      user.value = null
    }
    const clearAuth = () => {
      user.value = null
    }

    const isAuth = computed(() => !!user.value)

    return {
      user,
      fetchUser,
      logout,
      isAuth,
      clearAuth,
    }
  },
  {
    persist: true,
  },
)
