<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
      <!-- Title -->
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-900">Create Account</h2>
        <p class="text-gray-500 text-sm mt-1">Sign up with your email & mobile number</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSignup" class="space-y-4">
        <!-- Full Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            v-model="form.name"
            type="text"
            placeholder="John Doe"
            class="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="example@mail.com"
            class="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <!-- Mobile -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Mobile</label>
          <input
            v-model="form.mobile"
            type="text"
            placeholder="9876543210"
            class="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <input
            v-model="form.password"
            type="password"
            placeholder="••••••••"
            class="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <!-- Confirm Password -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            v-model="form.confirmPassword"
            placeholder="••••••••"
            class="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <p v-if="passwordMismatch" class="text-sm text-red-500 mt-1">Passwords do not match</p>
        </div>

        <!-- Verify Option -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Verify Profile By</label>
          <div class="mt-2 flex gap-6">
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="email"
                v-model="form.verifyBy"
                class="text-indigo-600 focus:ring-indigo-500"
              />
              <span class="text-gray-700">Email</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="mobile"
                v-model="form.verifyBy"
                class="text-indigo-600 focus:ring-indigo-500"
              />
              <span class="text-gray-700">Mobile</span>
            </label>
          </div>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          Sign Up
        </button>
      </form>

      <!-- Already have account -->
      <p class="text-center text-gray-600 mt-6 text-sm">
        Already have an account?
        <a href="/login" class="text-indigo-600 font-semibold hover:underline"> Login </a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import { useFetchApi } from '@/composables/useFetchApi'
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { toast, type ToastOptions } from 'vue3-toastify'

// const { signup, loading } = useAuth()
const { execute, error, loading, data } = useFetchApi()
const router = useRouter()
const form = reactive({
  name: '',
  email: '',
  mobile: '',
  password: '',
  confirmPassword: '',
  verifyBy: 'email',
})

const passwordMismatch = computed(() => {
  return form.password && form.confirmPassword && form.password !== form.confirmPassword
})

const handleSignup = async () => {
  if (passwordMismatch.value) {
    toast.error('Passwords do not match!')
    return
  }
  await execute('post', 'auth/sign', form)
  toast.success('Signup successful! Redirecting...')
  if (form.verifyBy === 'email') {
    router.push({ name: 'verifyEmail', query: { email: form.email } })
  } else {
    router.push({ name: 'verifyOtp', query: { userId: data.value.user.id } })
  }
  console.log('Signup form data:', form)
}
</script>
