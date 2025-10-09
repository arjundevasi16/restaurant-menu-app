<template>
  <div class="flex min-h-screen bg-gray-50">
    <BaseSidebar :menuItems="menuItems" @logout="$emit('logout')" />
    <div class="flex-1 flex flex-col">
      <BaseNavbar :title="title" :user="user" />
      <main class="p-6 flex-1 overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseSidebar from './BaseSidebar.vue'
import BaseNavbar from './BaseNavbar.vue'

const props = defineProps<{
  title: string
  menuItems: { label: string; to: string; icon?: any }[]
  user?: { name: string; role: string; avatar?: string }
}>()
</script>
