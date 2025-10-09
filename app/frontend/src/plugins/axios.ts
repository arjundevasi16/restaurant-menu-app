import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/stores/authStore'
import router from '@/router'
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

apiClient.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    const originalRequest = err.config as CustomAxiosRequestConfig | undefined
    const authStore = useAuthStore()
    console.log('originalRequest: ', originalRequest)
    if (originalRequest?.url === '/auth/refresh') {
      authStore.clearAuth()
      router.push('/login')
      return Promise.reject(err)
    }
    if (err.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        await apiClient.post('/auth/refresh')
        return apiClient(originalRequest)
      } catch (refreshError) {
        authStore.clearAuth()
        router.push('/login')
        return Promise.reject(refreshError)
      }
    } else if (err.response?.status === 401) {
      authStore.clearAuth()
      router.push('/login')
      return Promise.reject(err)
    }

    return Promise.reject(err)
  },
)

export default apiClient
