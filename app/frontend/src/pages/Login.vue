<template>
  <div class="h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
      <div class="text-center mb-6">
        <h2 class="text-3xl font-bold text-gray-900">Welcome Back</h2>
        <p class="text-gray-500 text-sm mt-1">Login to continue</p>
      </div>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Email / Mobile</label>
          <input
            v-model="form.emailOrMobile"
            type="text"
            placeholder="example@mail.com / 9876543210"
            class="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <input
            v-model="form.password"
            type="password"
            placeholder="••••••••"
            class="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50"
        >
          <span v-if="loading">Logging in...</span>
          <span v-else>Login</span>
        </button>
      </form>
      <p class="text-center text-gray-600 mt-6 text-sm">
        Don’t have an account?
        <RouterLink to="/signup" class="text-indigo-600 font-semibold hover:underline">
          Sign Up
        </RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { toast } from 'vue3-toastify'
import { useFetchApi } from '@/composables/useFetchApi'

const router = useRouter()
const authStore = useAuthStore()

const { loading, data, execute, error } = useFetchApi()
const form = reactive({
  emailOrMobile: '',
  password: '',
})

const handleLogin = async () => {
  if (!form.emailOrMobile || !form.password) {
    toast.error('All fields are required')
    return
  }

  try {
    loading.value = true

    await execute('post', '/auth/login', {
      emailOrMobile: form.emailOrMobile,
      password: form.password,
    })
    toast.success('Login successful!')
    await authStore.fetchUser()
    const role = authStore.user?.role
    router.push({ name: `${role}-dashboard` })
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Login failed')
  } finally {
    loading.value = false
  }
}
</script>
