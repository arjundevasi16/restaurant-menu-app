<template>
  <div class="h-screen flex items-center justify-center bg-gray-50">
    <div class="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
      <h2 class="text-2xl font-bold text-gray-900">Verify Your Email</h2>
      <p class="text-gray-600 mt-2 text-sm">
        We’ve sent a verification link to <span class="font-semibold">{{ email }}</span
        >. Please check your inbox.
      </p>
      <button
        @click="resendEmail"
        class="mt-6 w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition"
      >
        Resend Verification Email
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
const email = route.query.email as string

const resendEmail = () => {
  console.log('Resend verification email for:', email)
  // API call: /resend-email
}
</script>
