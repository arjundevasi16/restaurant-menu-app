<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Manager Dashboard</h1>
    <p class="text-gray-600">Quick links</p>
    <div class="mt-4 flex gap-3">
      <router-link class="px-4 py-2 bg-indigo-600 text-white rounded" to="/admin/items"
        >Items</router-link
      >
      <router-link class="px-4 py-2 bg-indigo-600 text-white rounded" to="/admin/categories"
        >Categories</router-link
      >
    </div>
  </div>
</template>
