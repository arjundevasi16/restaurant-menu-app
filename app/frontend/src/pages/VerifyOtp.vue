<template>
  <div class="h-screen flex items-center justify-center bg-gray-50">
    <div class="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
      <h2 class="text-2xl font-bold text-center text-gray-900">Verify Mobile</h2>
      <p class="text-center text-gray-500 mt-2">
        Enter the OTP sent to <span class="font-semibold">******</span>
      </p>

      <form @submit.prevent="verifyOtp" class="mt-6 space-y-4">
        <input
          v-model="otp"
          type="text"
          maxlength="6"
          placeholder="Enter 6-digit OTP"
          class="w-full text-center px-4 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="submit"
          class="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition"
          :disabled="loading"
        >
          Verify OTP
        </button>
      </form>

      <!-- Resend OTP -->
      <p class="text-sm text-center text-gray-600 mt-4">
        Didn’t get the OTP?
        <button
          @click="resendOtp"
          :disabled="!canResend || loading"
          class="text-indigo-600 hover:underline disabled:text-gray-400"
        >
          <span v-if="canResend">Resend OTP</span>
          <span v-else>Resend in {{ countdown }}s</span>
        </button>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { useFetchApi } from '@/composables/useFetchApi'
import { useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const userId = route.query.userId as string
const otp = ref('')
const { loading, execute } = useFetchApi()

const canResend = ref(true)
const countdown = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

const startCountdown = (seconds: number) => {
  canResend.value = false
  countdown.value = seconds

  timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      canResend.value = true
      clearInterval(timer!)
    }
  }, 1000)
}

// Verify OTP API call
const verifyOtp = async () => {
  await execute('post', '/auth/verifyMobile', {
    otp: otp.value,
    userId,
  })
  router.push({ name: 'dashboard' })
}

const resendOtp = async () => {
  if (!canResend.value) return
  // await execute('post', '/auth/resendOtp', { userId })
  console.log(123456)
  startCountdown(120)
}
onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>
