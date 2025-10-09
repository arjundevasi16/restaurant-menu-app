<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">My Restaurants</h1>
    <button @click="fetch" class="mb-4 px-4 py-2 bg-indigo-600 text-white rounded">Refresh</button>
    <div v-if="loading" class="text-gray-500">Loading...</div>
    <div v-else class="grid gap-4 md:grid-cols-2">
      <div v-for="r in list" :key="r.id" class="p-4 bg-white shadow rounded">
        <h2 class="font-semibold text-lg">{{ r.name }}</h2>
        <p class="text-sm text-gray-600">{{ r.description }}</p>
        <p class="text-sm text-gray-500">ID: {{ r.id }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'

interface Restaurant {
  id: number
  name: string
  description?: string
}

const list = ref<Restaurant[]>([])
const loading = ref(false)

const fetch = async () => {
  loading.value = true
  try {
    const res = await api.get('/restaurants/mine')
    list.value = res.data.data || res.data.restaurants || []
  } finally {
    loading.value = false
  }
}

onMounted(fetch)
</script>
