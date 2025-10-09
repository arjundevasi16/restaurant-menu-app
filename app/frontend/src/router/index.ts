import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

import Signup from '@/pages/SignUp.vue'
import VerifyEmail from '@/pages/VerifyEmail.vue'
import VerifyOtp from '@/pages/VerifyOtp.vue'
import EmailVerifiedSuccess from '@/pages/EmailVerified.vue'
import Login from '@/pages/Login.vue'
import HomePage from '@/pages/HomePage.vue'
import ShowTable from '@/pages/ShowTable.vue'

const routes = [
  { path: '/', name: 'homePage', component: HomePage },
  { path: '/show-table', name: 'showTable', component: ShowTable },
  { path: '/signup', name: 'signup', component: Signup },
  { path: '/verify-email', name: 'verifyEmail', component: VerifyEmail },
  { path: '/verify-otp', name: 'verifyOtp', component: VerifyOtp },
  { path: '/email-verified', name: 'emailVerified', component: EmailVerifiedSuccess },
  { path: '/login', name: 'login', component: Login },

  {
    path: '/dashboard/owner',
    name: 'owner-dashboard',
    component: () => import('@/pages/dashboards/OwnerDashboard.vue'),
    meta: { requiresAuth: true, role: 'owner' },
  },
  {
    path: '/admin/restaurants',
    name: 'admin-restaurants',
    component: () => import('@/pages/admin/Restaurants.vue'),
    meta: { requiresAuth: true, role: 'owner' },
  },
  {
    path: '/admin/categories',
    name: 'admin-categories',
    component: () => import('@/pages/admin/Categories.vue'),
    meta: { requiresAuth: true, role: 'owner' },
  },
  {
    path: '/admin/items',
    name: 'admin-items',
    component: () => import('@/pages/admin/Items.vue'),
    meta: { requiresAuth: true, role: 'owner' },
  },
  {
    path: '/dashboard/manager',
    name: 'manager-dashboard',
    component: () => import('@/pages/dashboards/ManagerDashboard.vue'),
    meta: { requiresAuth: true, role: 'manager' },
  },
  {
    path: '/dashboard/staff',
    name: 'staff-dashboard',
    component: () => import('@/pages/dashboards/StaffDashboard.vue'),
    meta: { requiresAuth: true, role: 'staff' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const store = useAuthStore()
  if (to.meta.requiresAuth && !store.user) {
    try {
      await store.fetchUser()
    } catch (error) {
      return next(false)
    }
  }
  if (to.meta.requiresAuth && !store.isAuth) {
    return next({ name: 'login' })
  }
  if (store.isAuth && (to.name === 'login' || to.name === 'signup')) {
    return next(getDashboardRedirect(store.user?.role))
  }

  if (to.meta.role && store.user?.role !== to.meta.role) {
    return next(getDashboardRedirect(store.user?.role))
  }

  next()
})

function getDashboardRedirect(role?: string) {
  switch (role) {
    case 'owner':
      return { name: 'owner-dashboard' }
    case 'manager':
      return { name: 'manager-dashboard' }
    case 'staff':
      return { name: 'staff-dashboard' }
    default:
      return { name: 'homePage' }
  }
}
export default router
