import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlanesView from '../views/PlanesView.vue'
import PromotionView from '../views/PromotionView.vue'
import DetailView from '../views/DetailsView.vue'
import CoverageChecker from '@/views/CoverageChecker.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/productos/planes',
      name: 'planes',
      component: PlanesView,
    },
    {
      path: '/details/:id',
      name: 'Details',
      component: DetailView,
      meta: {
        title: 'Detalles del Plan',
      },
      props: true, // Esto permite pasar parámetros de ruta como props
    },
    // Ruta catch-all para 404
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      redirect: '/plans',
    },
    {
      path: '/promotion',
      name: 'promotion',
      component: PromotionView,
    },
    {
      path: '/cobertura',
      alias: '/herramientas/solicitar-zona', // Esto permite que ambas rutas funcionen
      name: 'CoverageChecker',
      component: CoverageChecker,
      meta: {
        title: 'Verificar Cobertura - NorEtel',
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // Si hay una posición guardada (al usar el botón de atrás/adelante del navegador)
    if (savedPosition) {
      return savedPosition
    }
    // Para todas las demás navegaciones, desplazarse hacia arriba
    return { top: 0 }
  },
})

export default router
