import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/productos/planes',
      name: 'planes',
      component: () => import('../views/PlanesView.vue'),
    },
    {
      path: '/details/:id',
      name: 'Details',
      component: () => import('../views/DetailsView.vue'),
      props: true,
    },
    {
      path: '/cobertura',
      name: 'CoverageChecker',
      component: () => import('@/views/CoverageChecker.vue'),
    },
    {
      path: '/herramientas/speed-test',
      name: 'SpeedTest',
      component: () => import('@/views/tools/SpeedTest.vue'),
    },
    {
      path: '/configurador',
      name: 'PlanBuilder',
      component: () => import('@/views/PlanBuilder.vue'),
    },
    {
      path: '/productos/plan-amigo',
      name: 'PlanAmigo',
      component: () => import('@/views/plans/PlanAmigo.vue'),
    },
    {
      path: '/carreras',
      name: 'Careers',
      component: () => import('@/views/Careers.vue'),
    },

    // ==================== AUTENTICACIÓN ====================
    {
      path: '/auth/login',
      name: 'Login',
      component: () => import('@/views/auth/LoginView.vue'),
      meta: { guest: true },
    },
    {
      path: '/auth/register',
      name: 'Register',
      component: () => import('@/views/auth/RegisterView.vue'),
      meta: { guest: true },
    },

    // ==================== ÁREA DE CLIENTE ====================
    {
      path: '/mi-cuenta',
      redirect: '/mi-cuenta/dashboard',
      meta: { requiresAuth: true },
    },
    {
      path: '/mi-cuenta/dashboard',
      name: 'CustomerDashboard',
      component: () => import('@/views/customer/DashboardView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/mi-cuenta/boletas',
      name: 'CustomerInvoices',
      component: () => import('@/views/customer/InvoicesView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/mi-cuenta/pagos',
      name: 'CustomerPayments',
      component: () => import('@/views/customer/PaymentsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/mi-cuenta/tickets',
      name: 'CustomerTickets',
      component: () => import('@/views/customer/TicketsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/mi-cuenta/perfil',
      name: 'CustomerProfile',
      component: () => import('@/views/customer/ProfileView.vue'),
      meta: { requiresAuth: true },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
})

// ==================== GUARDS ====================
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // Rutas que requieren autenticación
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
    return
  }

  // Rutas para invitados (si ya está autenticado, redirigir al dashboard)
  if (to.meta.guest && authStore.isAuthenticated) {
    if (authStore.isAdmin) {
      window.location.href = 'http://localhost:8000/core/dashboard'
    } else {
      next({ name: 'CustomerDashboard' })
    }
    return
  }

  next()
})

export default router
