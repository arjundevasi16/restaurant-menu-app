<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Items</h1>
    <button @click="fetch" class="mb-4 px-4 py-2 bg-indigo-600 text-white rounded">Refresh</button>
    <table class="w-full bg-white shadow rounded">
      <thead>
        <tr class="text-left border-b">
          <th class="p-3">ID</th>
          <th class="p-3">Name</th>
          <th class="p-3">Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="it in items" :key="it.id" class="border-b">
          <td class="p-3">{{ it.id }}</td>
          <td class="p-3">{{ it.name }}</td>
          <td class="p-3">₹{{ it.price }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import api from '@/plugins/axios'

const items = ref<any[]>([])

const fetch = async () => {
  const res = await api.get('/items')
  items.value = res.data.data || []
}

fetch()
</script>
