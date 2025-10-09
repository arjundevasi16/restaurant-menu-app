<template>
  <header
    class="w-full bg-white shadow flex items-center justify-between px-6 py-3 sticky top-0 z-40"
  >
    <h2 class="text-xl font-semibold text-gray-800">{{ title }}</h2>

    <div class="flex items-center space-x-4">
      <div class="text-gray-600 text-sm">
        {{ user?.name || 'Guest' }}
        <span class="text-gray-400">({{ user?.role || 'role' }})</span>
      </div>
      <img v-if="user?.avatar" :src="user.avatar" alt="user" class="w-8 h-8 rounded-full border" />
    </div>
  </header>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  user?: { name: string; role: string; avatar?: string }
}>()
</script>
