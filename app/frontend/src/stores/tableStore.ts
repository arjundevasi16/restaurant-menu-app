import apiClient from '@/plugins/axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useTableStore = defineStore('table', () => {
  const tableData = ref([])
  const limit = 100
  const totalValuePercentage = ref(0)
  const page_limit = 10
  const totalRows = 0
  let page_number = 1
  const remainingValuePercentage = computed(() => limit - totalValuePercentage.value)

  const fetchTableData = async () => {
    try {
      const response = await apiClient.get('/table/select', {
        params: { page: page_number, limit: page_limit },
      })
      console.log('Fetched table data:', response.data)
      tableData.value.push(...response.data.data)
      calculateTotalValue(tableData.value)
    } catch (error) {
      console.error('Error fetching table data:', error)
    }
  }

  const calculateTotalValue = (rows) => {
    totalValuePercentage.value = 0
    rows.forEach((row) => {
      totalValuePercentage.value += row.value
    })
  }

  return {
    tableData,
    totalValuePercentage,
    remainingValuePercentage,
    fetchTableData,
  }
})
