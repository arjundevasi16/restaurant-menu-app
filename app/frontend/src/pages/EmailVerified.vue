<template>
  <div class="h-screen flex items-center justify-center bg-gray-50">
    <div class="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
      <!-- Loading State -->
      <div v-if="loading" class="flex flex-col items-center">
        <svg
          class="animate-spin h-8 w-8 text-indigo-600 mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
        <p class="text-gray-600">Verifying your email...</p>
      </div>

      <!-- Success State -->
      <div v-else-if="success">
        <h2 class="text-2xl font-bold text-green-600">Email Verified ✅</h2>
        <p class="text-gray-600 mt-2">
          Your email has been successfully verified. Redirecting to login...
        </p>
      </div>

      <!-- Error State -->
      <div v-else>
        <h2 class="text-2xl font-bold text-red-600">Verification Failed ❌</h2>
        <p class="text-gray-600 mt-2">{{ errorMessage }}</p>
        <button
          @click="resendEmail"
          class="mt-6 w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          Resend Verification Email
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/plugins/axios'
import { toast, type ToastOptions } from 'vue3-toastify'
const route = useRoute()
const router = useRouter()

const loading = ref(true)
const success = ref(false)
const errorMessage = ref('')

const token = route.query.token as string | undefined

onMounted(async () => {
  if (!token) {
    loading.value = false
    errorMessage.value = 'Invalid verification link.'
    return
  }

  try {
    const { data } = await api.get(`/auth/verifyEmail?token=${token}`)
    toast.success('Email verified successfully')
    success.value = true
    router.push('/login')
  } catch (err: any) {
    errorMessage.value = err.response?.data?.message || 'Verification link is invalid or expired.'
  } finally {
    loading.value = false
  }
})

const resendEmail = async () => {
  // here you'd hit your backend: /auth/resend-email
  toast.info('If this email is registered, a new verification link was sent.')
}
</script>
