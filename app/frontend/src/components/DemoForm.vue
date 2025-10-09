<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg">
    <h2 class="text-2xl font-bold text-center mb-6">Restaurant Registration</h2>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Restaurant Name</label>
        <input
          v-model="form.restaurantName"
          type="text"
          placeholder="Enter restaurant name"
          class="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Owner Name</label>
        <input
          v-model="form.ownerName"
          type="text"
          placeholder="Enter owner name"
          class="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          class="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Phone</label>
        <input
          v-model="form.phone"
          type="tel"
          placeholder="Enter phone number"
          class="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Cuisine Type</label>
        <select
          v-model="form.cuisine"
          class="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
          required
        >
          <option value="" disabled>Select cuisine</option>
          <option>Italian</option>
          <option>Indian</option>
          <option>Chinese</option>
          <option>Mexican</option>
        </select>
      </div>

      <button
        type="submit"
        class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
      >
        Submit
      </button>
    </form>

    <pre class="mt-4 bg-gray-100 p-2 rounded-md">{{ form }}</pre>
  </div>
</template>

<script setup>
import { emit } from 'process'
import { reactive } from 'vue'

const form = reactive({
  restaurantName: '',
  ownerName: '',
  email: '',
  phone: '',
  cuisine: '',
})

const handleSubmit = () => {
  console.log('Form submitted:', form)
  alert(`Restaurant ${form.restaurantName} registered successfully!`)
  emit('close')
}
</script>
