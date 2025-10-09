<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Categories</h1>
    <div class="flex gap-2 mb-4">
      <input
        v-model="restaurantId"
        type="number"
        placeholder="Restaurant ID"
        class="border p-2 rounded"
      />
      <button @click="fetch" class="px-4 py-2 bg-indigo-600 text-white rounded">Load</button>
    </div>
    <ul class="space-y-2">
      <li v-for="c in categories" :key="c.id" class="p-3 bg-white shadow rounded">
        <div class="font-medium">{{ c.name }}</div>
        <div class="text-sm text-gray-500">ID: {{ c.id }}</div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import api from '@/plugins/axios'

const restaurantId = ref<number | null>(null)
const categories = ref<any[]>([])

const fetch = async () => {
  if (!restaurantId.value) return
  const res = await api.get(`/categories/${restaurantId.value}`)
  categories.value = res.data.categories || res.data.data || []
}
</script>
