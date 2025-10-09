import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const app = createApp(App)
const pinia = createPinia()
app.use(router)

pinia.use(piniaPluginPersistedstate)
app.use(pinia)

app.use(Vue3Toastify, {
  autoClose: 3000,
  clearOnUrlChange: false,
  position: 'top-right',
} as ToastContainerOptions)

app.mount('#app')
