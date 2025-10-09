import { useAuthStore } from '@/stores/authStore'
import { useFetchApi } from './useFetchApi'
import { toast } from 'vue3-toastify'

export function useAuth() {
  const store = useAuthStore()
  const { execute, loading } = useFetchApi()

  const signup = async (form: any) => {
    const res = await execute('post', '/auth/signup', form)
    toast.success(res.message)
    return res
  }

  const login = async (emailOrMobile: string, password: string) => {
    const res = await execute('post', '/auth/login', { emailOrMobile, password })
    // store.setAuth(res.token, res.user)
    toast.success('Login successful!')
    return res
  }

  const logout = () => store.logout()

  return { signup, login, logout, loading }
}
