<script setup lang="ts">
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import {
  ChartBarIcon,
  BuildingStorefrontIcon,
  UsersIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/vue/24/outline'

// Card stats data
const stats = ref([
  { name: 'Total Revenue', value: '₹1,25,000', icon: ChartBarIcon },
  { name: 'Total Orders', value: '4,532', icon: ClipboardDocumentListIcon },
  { name: 'Staff Members', value: '24', icon: UsersIcon },
  { name: 'Outlets', value: '5', icon: BuildingStorefrontIcon },
])

// Chart data
const revenueSeries = ref([
  { name: 'Revenue', data: [12000, 15000, 18000, 14000, 20000, 25000, 30000] },
])
const revenueOptions = ref({
  chart: { type: 'line', height: 300, toolbar: { show: false } },
  stroke: { curve: 'smooth', width: 3 },
  colors: ['#4f46e5'],
  xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
})

const ordersSeries = ref([{ name: 'Orders', data: [120, 150, 200, 180, 250, 300, 400] }])
const ordersOptions = ref({
  chart: { type: 'bar', height: 300, toolbar: { show: false } },
  colors: ['#06b6d4'],
  xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
})

// Dummy recent orders
const recentOrders = ref([
  { id: 1, customer: 'Rahul Sharma', item: 'Paneer Tikka', amount: '₹450', status: 'Completed' },
  { id: 2, customer: 'Neha Verma', item: 'Veg Biryani', amount: '₹350', status: 'Pending' },
  { id: 3, customer: 'Amit Singh', item: 'Chicken Curry', amount: '₹600', status: 'Completed' },
  { id: 4, customer: 'Priya Rao', item: 'Pizza', amount: '₹800', status: 'In Progress' },
])
</script>

<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-md">
      <div class="p-6 text-2xl font-bold text-indigo-600">RestroOS</div>
      <nav class="mt-6 space-y-4">
        <RouterLink
          to="/admin/restaurants"
          class="block px-6 py-2 text-gray-700 hover:bg-gray-100 rounded"
          >🏪 Restaurants</RouterLink
        >
        <RouterLink
          to="/admin/categories"
          class="block px-6 py-2 text-gray-700 hover:bg-gray-100 rounded"
          >🗂️ Categories</RouterLink
        >
        <RouterLink
          to="/admin/items"
          class="block px-6 py-2 text-gray-700 hover:bg-gray-100 rounded"
          >🍽️ Items</RouterLink
        >
        <a href="#" class="block px-6 py-2 text-gray-400 cursor-not-allowed rounded">👥 Staff</a>
        <a href="#" class="block px-6 py-2 text-gray-400 cursor-not-allowed rounded">📦 Orders</a>
        <a href="#" class="block px-6 py-2 text-gray-400 cursor-not-allowed rounded"
          >📊 Analytics</a
        >
        <a href="#" class="block px-6 py-2 text-gray-400 cursor-not-allowed rounded">⚙️ Settings</a>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto">
      <!-- Topbar -->
      <header class="flex justify-between items-center bg-white px-6 py-4 shadow">
        <h1 class="text-xl font-bold">Owner Dashboard</h1>
        <div class="flex items-center space-x-4">
          <span class="text-gray-600">Welcome, Owner</span>
          <RouterLink
            to="/login"
            class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >Logout</RouterLink
          >
        </div>
      </header>

      <!-- Stats -->
      <section class="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(stat, i) in stats"
          :key="i"
          class="bg-white p-6 rounded-xl shadow flex items-center space-x-4"
        >
          <component :is="stat.icon" class="w-10 h-10 text-indigo-600" />
          <div>
            <p class="text-sm text-gray-500">{{ stat.name }}</p>
            <p class="text-xl font-bold">{{ stat.value }}</p>
          </div>
        </div>
      </section>

      <!-- Charts -->
      <section class="grid md:grid-cols-2 gap-6 p-6">
        <div class="bg-white p-6 rounded-xl shadow">
          <h2 class="text-lg font-semibold mb-4">Revenue Overview</h2>
          <VueApexCharts
            type="line"
            height="300"
            :options="revenueOptions"
            :series="revenueSeries"
          />
        </div>
        <div class="bg-white p-6 rounded-xl shadow">
          <h2 class="text-lg font-semibold mb-4">Orders Overview</h2>
          <VueApexCharts type="bar" height="300" :options="ordersOptions" :series="ordersSeries" />
        </div>
      </section>

      <!-- Recent Orders -->
      <section class="p-6">
        <div class="bg-white rounded-xl shadow p-6">
          <h2 class="text-lg font-semibold mb-4">Recent Orders</h2>
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b">
                <th class="py-2">#</th>
                <th class="py-2">Customer</th>
                <th class="py-2">Item</th>
                <th class="py-2">Amount</th>
                <th class="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in recentOrders" :key="order.id" class="border-b hover:bg-gray-50">
                <td class="py-2">{{ order.id }}</td>
                <td class="py-2">{{ order.customer }}</td>
                <td class="py-2">{{ order.item }}</td>
                <td class="py-2">{{ order.amount }}</td>
                <td class="py-2">
                  <span
                    :class="[
                      'px-3 py-1 rounded text-sm',
                      order.status === 'Completed' ? 'bg-green-100 text-green-600' : '',
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' : '',
                      order.status === 'In Progress' ? 'bg-blue-100 text-blue-600' : '',
                    ]"
                  >
                    {{ order.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
export default {
  components: { VueApexCharts },
}
</script>
