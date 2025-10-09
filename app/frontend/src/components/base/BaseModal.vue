<template>
  <div
    class="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50"
    @click="onBackdropClick"
  >
    <div
      class="bg-white rounded-2xl shadow-lg w-full sm:max-w-lg max-h-[90vh] overflow-y-auto p-6 m-4"
    >
      <div class="mb-4">
        <slot name="header"></slot>
      </div>

      <div class="mb-6">
        <slot name="main"></slot>
      </div>

      <div class="flex justify-end space-x-3">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['close'])

const onBackdropClick = (e: MouseEvent) => {
  if ((e.target as HTMLElement).classList.contains('fixed')) {
    emit('close')
  }
}

onMounted(() => {
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>
