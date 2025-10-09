<!-- src/components/base/BaseSidebar.vue -->
<template>
  <aside
    class="w-64 bg-indigo-700 text-white flex flex-col h-screen sticky top-0 transition-all duration-300"
  >
    <div class="px-6 py-4 text-2xl font-bold border-b border-indigo-600">RestroOS</div>

    <nav class="flex-1 px-4 space-y-1 mt-4 overflow-y-auto">
      <RouterLink
        v-for="item in menuItems"
        :key="item.to"
        :to="item.to"
        class="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-indigo-600 transition"
        :class="{ 'bg-indigo-800': isActive(item.to) }"
      >
        <component :is="item.icon" class="w-5 h-5" />
        <span>{{ item.label }}</span>
      </RouterLink>
    </nav>

    <div class="p-4 border-t border-indigo-600">
      <button
        @click="$emit('logout')"
        class="w-full py-2 text-sm font-semibold bg-indigo-800 hover:bg-indigo-900 rounded-lg"
      >
        Logout
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const props = defineProps<{
  menuItems: { label: string; to: string; icon?: any }[]
}>()

const route = useRoute()
const isActive = (path: string) => route.path === path
</script>
