import { ref } from 'vue'
import api from '@/plugins/axios'

export function useFetchApi<T = any>() {
  const data = ref<T | null>(null)
  const error = ref<string | null>(null)
  const loading = ref(false)

  const execute = async (method: 'get' | 'post' | 'put' | 'delete', url: string, payload?: any) => {
    loading.value = true
    error.value = null
    try {
      const res = await api.request<T>({
        method,
        url,
        data: payload,
      })
      data.value = res.data
      return res.data
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Something went wrong'
      throw err
    } finally {
      loading.value = false
    }
  }

  return { data, error, loading, execute }
}
