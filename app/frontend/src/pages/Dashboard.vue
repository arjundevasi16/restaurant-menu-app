<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 text-center">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">Welcome, {{ user?.name || 'User' }} 🎉</h1>
      <p class="text-gray-600 text-lg">
        You are logged in as <span class="font-semibold">{{ user?.role }}</span
        >.
      </p>

      <div class="mt-6 space-y-4">
        <button
          @click="goToProfile"
          class="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          Go to Profile
        </button>
        <button
          @click="logout"
          class="w-full bg-red-500 text-white py-2.5 rounded-lg font-medium hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const user = auth.user
const goToProfile = () => {
  router.push('/profile')
}

const logout = async () => {
  await useAuthStore().logout()
  router.push('/login')
}
</script>
