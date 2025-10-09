<template>
  <table class="w-full border-collapse border-2 text-center">
    <thead>
      <tr>
        <th class="p-2">ID</th>
        <th class="p-2">Name</th>
        <th class="p-2">Value(%)</th>
        <th class="p-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-2" v-for="row in store.tableData" :key="row.id">
        <td class="p-2">{{ row.id }}</td>
        <td class="p-2">{{ row.name }}</td>
        <td class="p-2">{{ row.value }}</td>
        <td class="p-2">
          <button class="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
          <button
            class="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            @click="deleteTableRow(row.id)"
          >
            Delete
          </button>
        </td>
      </tr>

      <tr class="border-2">
        <td class="p-2">#</td>
        <td class="p-2">
          <input
            type="text"
            placeholder="Enter name"
            class="border p-1 rounded w-full"
            v-model="name"
          />
        </td>
        <td class="p-2">
          <input
            type="number"
            placeholder="Enter value"
            class="border p-1 rounded w-full"
            v-model="inputValue"
          />
        </td>
        <td class="p-2">
          <button
            class="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            @click="insertRow"
          >
            Add
          </button>
          <button class="ml-2 px-2 py-1 bg-gray-400 text-white rounded hover:bg-gray-500">
            Close
          </button>
        </td>
      </tr>
    </tbody>
  </table>

  <div class="mt-2 text-right">
    Remaining %: <strong>{{ store.remainingValuePercentage }}</strong>
  </div>

  <div class="mt-4">
    <button class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
      + Add Student
    </button>
  </div>
</template>

<script setup lang="ts">
import apiClient from '@/plugins/axios'
import { useTableStore } from '@/stores/tableStore'
import { onMounted, ref } from 'vue'

const name = ref('')
const inputValue = ref(0)
const store = useTableStore()

const insertRow = async () => {
  if (inputValue.value > store.remainingValuePercentage) {
    alert('Delete a row or reduce value first')
    return
  }
  await apiClient.post('/table/insert', { name: name.value, value: inputValue.value })
  await store.fetchTableData() // refresh UI
  name.value = ''
  inputValue.value = 0
}

const deleteTableRow = async (id: number) => {
  try {
    const isDelete = confirm('Are you sure want to delete')

    setTimeout(async () => {
      await apiClient.delete('/table/delete', { data: { id } })
      await store.fetchTableData()
    }, 5000)
  } catch (err) {
    console.error(err)
  }
}

onMounted(async () => {
  await store.fetchTableData()
})
</script>
