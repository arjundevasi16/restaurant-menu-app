<script setup lang="ts">
import BaseModal from '@/components/base/BaseModal.vue'
import { animate, inView } from 'motion'
import { onMounted, ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

import {
  ClipboardDocumentListIcon,
  ChartBarIcon,
  SparklesIcon,
  UsersIcon,
  GlobeAltIcon,
  TruckIcon,
} from '@heroicons/vue/24/outline'
import DemoForm from '@/components/DemoForm.vue'

// Example chart data
const revenueSeries = ref([
  { name: 'Revenue', data: [1200, 1500, 1800, 2200, 2000, 2500, 3000] },
  { name: 'Orders', data: [100, 120, 150, 180, 160, 200, 240] },
])
const isShowDemoForm = ref(false)
const revenueOptions = ref({
  chart: { type: 'line', height: 300, toolbar: { show: false } },
  stroke: { curve: 'smooth', width: 3 },
  colors: ['#4f46e5', '#06b6d4'],
  xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  legend: { position: 'top' },
})

const aiSeries = ref([{ name: 'Predicted Orders', data: [5, 10, 15, 20, 25, 30, 40] }])
const aiOptions = ref({
  chart: { type: 'bar', height: 300, toolbar: { show: false } },
  colors: ['#4f46e5'],
  xaxis: { categories: ['6-7AM', '7-8', '8-9', '9-10', '10-11', '11-12', '12-1'] },
})

const faqs = ref([
  {
    q: 'Can I manage multiple restaurants with one account?',
    a: 'Yes! Our dashboard allows owners to control multiple outlets in different cities under one login.',
  },
  {
    q: 'Do you provide a white-label website?',
    a: 'Yes, every restaurant can get their own branded website on our subdomain or custom domain.',
  },
  {
    q: 'How does AI prediction work?',
    a: 'Our AI analyzes past sales and preparation times to estimate peak hours, order delivery time, and menu suggestions.',
  },
  {
    q: 'Is the system suitable for cloud kitchens?',
    a: 'Absolutely. It is designed for dine-in, take-away, delivery, and cloud kitchens.',
  },
])

onMounted(() => {
  // Animate hero image when it comes into view
  inView('.scroll-img', ({ target }) => {
    animate(
      target,
      { scale: [1, 1.1, 1] }, // zoom in, then reset
      { duration: 2, easing: 'ease-in-out' },
    )
  })
})
</script>

<template>
  <div class="text-gray-900 bg-gray-50">
    <!-- Navbar -->
    <nav class="fixed w-full bg-white shadow z-50">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div class="text-2xl font-bold text-indigo-600">RestroOS</div>
        <div class="hidden md:flex space-x-6">
          <a href="#features" class="hover:text-indigo-600">Features</a>
          <a href="#ai" class="hover:text-indigo-600">AI Insights</a>
          <a href="#pricing" class="hover:text-indigo-600">Pricing</a>
          <a href="#testimonials" class="hover:text-indigo-600">Testimonials</a>
          <a href="#faq" class="hover:text-indigo-600">FAQ</a>
        </div>
        <RouterLink
          :to="{ name: 'signup' }"
          class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Get Started
        </RouterLink>
      </div>
    </nav>

    <!-- Hero -->
    <section class="pt-28 pb-20 bg-white">
      <div class="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center">
        <div class="md:w-1/2">
          <h1 class="text-5xl font-extrabold leading-snug">The All-In-One Restaurant OS</h1>
          <p class="mt-6 text-lg text-gray-600">
            Dynamic menus, AI-powered predictions, multi-branch control, delivery partner management
            — everything under one platform.
          </p>
          <div class="mt-8 flex space-x-4">
            <button
              class="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
              @click="isShowDemoForm = true"
            >
              Book a Demo
            </button>
            <button class="px-6 py-3 bg-white text-indigo-600 border rounded-xl hover:bg-gray-100">
              Learn More
            </button>
          </div>
        </div>
        <div class="md:w-1/2 flex justify-center">
          <img
            src="../../public/original-ece4d08c5922506fcb84b59c837fa436.jpg"
            alt="Dashboard"
            class="scroll-img w-[500px] rounded-2xl shadow-xl"
          />
        </div>
      </div>
    </section>

    <BaseModal v-if="isShowDemoForm" @close="isShowDemoForm = false">
      <template #header>
        <h3 class="text-xl font-bold">Book a Demo</h3>
      </template>
      <template #main>
        <DemoForm />
      </template>
      <template #footer>
        <button
          class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          @click="isShowDemoForm = false"
        >
          Close
        </button>
      </template>
    </BaseModal>

    <!-- Features -->
    <section id="features" class="py-20 bg-gray-50">
      <div class="max-w-6xl mx-auto px-6">
        <h2 class="text-3xl font-bold text-center">Everything You Need in One Place</h2>
        <div class="grid gap-10 mt-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div class="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <ClipboardDocumentListIcon class="w-10 h-10 text-indigo-600" />
            <h3 class="mt-4 font-semibold">Dynamic Daily Menus</h3>
            <p class="mt-2 text-gray-600">
              Update menus in real-time for daily specials or seasonal items.
            </p>
          </div>
          <div class="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <SparklesIcon class="w-10 h-10 text-indigo-600" />
            <h3 class="mt-4 font-semibold">AI Predictions</h3>
            <p class="mt-2 text-gray-600">
              Get insights into peak hours, prep times, and smart recommendations.
            </p>
          </div>
          <div class="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <ChartBarIcon class="w-10 h-10 text-indigo-600" />
            <h3 class="mt-4 font-semibold">Role-Based Dashboards</h3>
            <p class="mt-2 text-gray-600">
              Owner, manager, staff, and delivery each get tailored dashboards.
            </p>
          </div>
          <div class="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <TruckIcon class="w-10 h-10 text-indigo-600" />
            <h3 class="mt-4 font-semibold">Delivery Partner Integration</h3>
            <p class="mt-2 text-gray-600">
              Seamlessly connect with Swiggy, Zomato, or your own fleet.
            </p>
          </div>
          <div class="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <GlobeAltIcon class="w-10 h-10 text-indigo-600" />
            <h3 class="mt-4 font-semibold">White-Label Websites</h3>
            <p class="mt-2 text-gray-600">
              Get your own branded website on subdomain or custom domain.
            </p>
          </div>
          <div class="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <UsersIcon class="w-10 h-10 text-indigo-600" />
            <h3 class="mt-4 font-semibold">Multi-Outlet Control</h3>
            <p class="mt-2 text-gray-600">
              Manage multiple restaurants in different cities from one login.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Analytics -->
    <section class="py-20 bg-white">
      <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl font-bold">Powerful Analytics</h2>
          <p class="mt-4 text-gray-600">
            Track revenue, orders, and staff performance across all locations.
          </p>
          <ul class="mt-6 space-y-3 text-gray-700">
            <li>✔ Real-time dashboards</li>
            <li>✔ Multi-outlet performance overview</li>
            <li>✔ Customizable reports</li>
          </ul>
        </div>
        <div class="bg-white shadow rounded-2xl p-6">
          <VueApexCharts
            type="line"
            height="300"
            :options="revenueOptions"
            :series="revenueSeries"
          />
        </div>
      </div>
    </section>

    <!-- AI -->
    <section id="ai" class="py-20 bg-gray-50">
      <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl font-bold">AI-Powered Predictions</h2>
          <p class="mt-4 text-gray-600">
            Estimate prep time, forecast busy hours, and get recommendations to reduce wastage.
          </p>
          <ul class="mt-6 space-y-3">
            <li>🔍 Predict peak hours</li>
            <li>⏱️ Estimate order times</li>
            <li>🍽️ Smart dish recommendations</li>
          </ul>
        </div>
        <div class="bg-white shadow rounded-2xl p-6">
          <VueApexCharts type="bar" height="300" :options="aiOptions" :series="aiSeries" />
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section id="testimonials" class="py-20 bg-white">
      <div class="max-w-6xl mx-auto px-6 text-center">
        <h2 class="text-3xl font-bold">Loved by Restaurants</h2>
        <div class="grid md:grid-cols-3 gap-8 mt-12">
          <div class="bg-gray-50 p-6 rounded-2xl shadow">
            <p class="text-gray-600">“We reduced wait times by 20% thanks to AI predictions.”</p>
            <h4 class="mt-4 font-semibold">Cafe Delight</h4>
          </div>
          <div class="bg-gray-50 p-6 rounded-2xl shadow">
            <p class="text-gray-600">“Managing 5 outlets in 3 cities has never been easier.”</p>
            <h4 class="mt-4 font-semibold">Urban Tandoor</h4>
          </div>
          <div class="bg-gray-50 p-6 rounded-2xl shadow">
            <p class="text-gray-600">
              “The white-label website boosted our online orders instantly.”
            </p>
            <h4 class="mt-4 font-semibold">Pizza Hub</h4>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing -->
    <section id="pricing" class="py-20 bg-gray-50">
      <div class="max-w-6xl mx-auto px-6 text-center">
        <h2 class="text-3xl font-bold">Simple Pricing</h2>
        <div class="grid md:grid-cols-3 gap-8 mt-12">
          <div class="p-6 bg-white rounded-2xl shadow">
            <h3 class="font-semibold text-xl">Starter</h3>
            <p class="mt-2 text-gray-600">For small cafes</p>
            <p class="mt-4 text-3xl font-bold">₹999<span class="text-lg">/mo</span></p>
            <ul class="mt-4 space-y-2 text-gray-600">
              <li>✔ Dynamic Menu</li>
              <li>✔ Staff Dashboard</li>
            </ul>
          </div>
          <div class="p-6 bg-white rounded-2xl shadow border-2 border-indigo-600">
            <h3 class="font-semibold text-xl">Pro</h3>
            <p class="mt-2 text-gray-600">For growing restaurants</p>
            <p class="mt-4 text-3xl font-bold">₹2999<span class="text-lg">/mo</span></p>
            <ul class="mt-4 space-y-2 text-gray-600">
              <li>✔ Everything in Starter</li>
              <li>✔ AI Predictions</li>
              <li>✔ Multi-Outlet Dashboard</li>
            </ul>
          </div>
          <div class="p-6 bg-white rounded-2xl shadow">
            <h3 class="font-semibold text-xl">Enterprise</h3>
            <p class="mt-2 text-gray-600">For chains & franchises</p>
            <p class="mt-4 text-3xl font-bold">Custom</p>
            <ul class="mt-4 space-y-2 text-gray-600">
              <li>✔ Everything in Pro</li>
              <li>✔ White-Label Website</li>
              <li>✔ Dedicated Support</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section id="faq" class="py-20 bg-white">
      <div class="max-w-6xl mx-auto px-6">
        <h2 class="text-3xl font-bold text-center">FAQ</h2>
        <div class="mt-12 space-y-4">
          <div v-for="(item, idx) in faqs" :key="idx" class="p-6 bg-gray-50 rounded-xl shadow">
            <h3 class="font-semibold">{{ item.q }}</h3>
            <p class="mt-2 text-gray-600">{{ item.a }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-300 py-12">
      <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">
        <div>
          <h3 class="text-lg font-bold text-white">RestroOS</h3>
          <p class="mt-4 text-sm">One-stop solution for all your restaurant needs.</p>
        </div>
        <div>
          <h4 class="font-semibold text-white">Quick Links</h4>
          <ul class="mt-4 space-y-2 text-sm">
            <li><a href="#features" class="hover:text-white">Features</a></li>
            <li><a href="#pricing" class="hover:text-white">Pricing</a></li>
            <li><a href="#faq" class="hover:text-white">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold text-white">Contact</h4>
          <p class="mt-4 text-sm">📧 support@restroos.com</p>
          <p class="mt-2 text-sm">📍 Bangalore, India</p>
        </div>
      </div>
      <div class="text-center mt-8 text-sm text-gray-500">
        © 2025 RestroOS. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
export default { components: { VueApexCharts } }

const getStarted = () => {}
</script>
