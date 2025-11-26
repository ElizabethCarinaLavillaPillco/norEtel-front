<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { plansData } from '@/data/plansData.js'
import MyNavbar from '../components/common/MyNavbar.vue'
import MyFooter from '../components/common/MyFooter.vue'
import MyFilter from '../components/MyFilter.vue'
import CardService from '../components/CardService.vue'
import CardServiceTwo from '@/components/CardServiceTwo.vue'
import CallMe from '@/components/CallMe.vue'

// Router para navegación
const router = useRouter()

// Estados reactivos
const currentFilters = ref({})
const currentPage = ref(1)
const itemsPerPage = 9

// Datos de ejemplo de planes (simulando una base de datos)
const allPlans = ref(Object.values(plansData.plans))

// Función para filtrar planes
const filteredPlans = computed(() => {
  if (!currentFilters.value || Object.keys(currentFilters.value).length === 0) {
    return allPlans.value
  }

  return allPlans.value.filter((plan) => {
    const price = parseFloat(plan.price)

    // Filtro por precio
    if (
      currentFilters.value.priceMin !== undefined &&
      currentFilters.value.priceMax !== undefined
    ) {
      if (price < currentFilters.value.priceMin || price > currentFilters.value.priceMax) {
        return false
      }
    }

    // Filtro por velocidad
    if (currentFilters.value.speeds && currentFilters.value.speeds.length > 0) {
      if (!currentFilters.value.speeds.includes(plan.speedRange)) {
        return false
      }
    }

    // Filtro por servicios
    if (currentFilters.value.services && currentFilters.value.services.length > 0) {
      const hasMatchingService = plan.services.some((service) =>
        currentFilters.value.services.includes(service),
      )
      if (!hasMatchingService) {
        return false
      }
    }

    // Filtro por pago mensual
    if (currentFilters.value.payments && currentFilters.value.payments.length > 0) {
      if (!currentFilters.value.payments.includes(plan.paymentRange)) {
        return false
      }
    }

    return true
  })
})

// Paginación
const totalPages = computed(() => {
  return Math.ceil(filteredPlans.value.length / itemsPerPage)
})

const paginatedPlans = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredPlans.value.slice(start, end)
})

// Resetear página cuando cambien los filtros
watch(filteredPlans, () => {
  currentPage.value = 1
})

// Funciones
const handleFiltersChange = (filters) => {
  currentFilters.value = filters
}

// Función principal para manejar la navegación con datos del plan
const handlePurchase = (planData) => {
  console.log('Navigating to details with plan:', planData)

  // Navegar a la vista de detalles pasando el ID como parámetro de ruta
  // y los datos completos como query params o state
  router.push({
    name: 'Details', // Asegúrate de que tu ruta se llame 'Details'
    params: {
      id: planData.id,
    },
    // Opción 1: Pasar datos como query (visible en URL)
    query: {
      planData: JSON.stringify(planData),
    },
    // Opción 2: Pasar datos como state (no visible en URL, pero se pierde al recargar)
    // state: { planData }
  })
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    // Scroll al inicio del contenedor de planes
    const plansContainer = document.querySelector('.plans-container')
    if (plansContainer) {
      plansContainer.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }
}

const getPaginationRange = () => {
  const range = []
  const total = totalPages.value
  const current = currentPage.value

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      range.push(i)
    }
  } else {
    if (current <= 4) {
      range.push(1, 2, 3, 4, 5, '...', total)
    } else if (current >= total - 3) {
      range.push(1, '...', total - 4, total - 3, total - 2, total - 1, total)
    } else {
      range.push(1, '...', current - 1, current, current + 1, '...', total)
    }
  }

  return range
}
</script>

<template>
  <div class="app-container">
    <MyNavbar class="navbar" />

    <main class="main-content">
      <div class="content-wrapper">
        <!-- Filtros a la izquierda -->
        <aside class="filters-sidebar">
          <MyFilter @filters-changed="handleFiltersChange" />
        </aside>

        <!-- Planes a la derecha -->
        <section class="plans-section">
          <!-- Header fijo con información de resultados -->
          <div class="results-header-fixed">
            <h2>Planes de Internet</h2>
            <div class="results-info">
              <span class="results-count"> {{ filteredPlans.length }} planes encontrados </span>
              <span class="page-info" v-if="totalPages > 1">
                Página {{ currentPage }} de {{ totalPages }}
              </span>
            </div>
          </div>

          <!-- Contenedor con scroll -->
          <div class="plans-container">
            <!-- Grid de cards -->
            <div class="plans-grid" v-if="paginatedPlans.length > 0">
              <template v-for="plan in paginatedPlans" :key="plan.id">
                <!-- CardService -->
                <CardService
                  v-if="plan.type === 'service'"
                  :speed="plan.speed"
                  :price="plan.price"
                  :download-speed="plan.downloadSpeed"
                  :upload-speed="plan.uploadSpeed"
                  :title="plan.title"
                  @purchase="() => handlePurchase(plan)"
                />

                <!-- CardServiceTwo -->
                <CardServiceTwo
                  v-else-if="plan.type === 'serviceTwo'"
                  :title="plan.title"
                  :speed="plan.speed"
                  :speed-unit="plan.speedUnit"
                  :speed-description="plan.speedDescription"
                  :price="plan.price"
                  :currency="plan.currency"
                  :period="plan.period"
                  :button-text="plan.buttonText"
                  :technical-title="plan.technicalTitle"
                  :technical-details="plan.technicalDetails"
                  @purchase="() => handlePurchase(plan)"
                />
              </template>
            </div>

            <!-- Mensaje cuando no hay resultados -->
            <div v-else class="no-results">
              <div class="no-results-content">
                <h3>No se encontraron planes</h3>
                <p>Intenta ajustar los filtros para ver más opciones</p>
              </div>
            </div>

            <!-- Paginación -->
            <div class="pagination" v-if="totalPages > 1">
              <button
                @click="goToPage(currentPage - 1)"
                :disabled="currentPage === 1"
                class="pagination-btn prev-btn"
              >
                ‹ Anterior
              </button>

              <div class="pagination-numbers">
                <template v-for="page in getPaginationRange()" :key="page">
                  <button
                    v-if="typeof page === 'number'"
                    @click="goToPage(page)"
                    :class="['pagination-number', { active: page === currentPage }]"
                  >
                    {{ page }}
                  </button>
                  <span v-else class="pagination-dots">{{ page }}</span>
                </template>
              </div>

              <button
                @click="goToPage(currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="pagination-btn next-btn"
              >
                Siguiente ›
              </button>
            </div>
          </div>
        </section>
      </div>
      <CallMe />
    </main>

    <MyFooter class="footer" />
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f8f9fa;
}

.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
}

.main-content {
  flex: 1;
  padding: 20px;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 30px;
  max-width: 1400px;
  margin: 0 auto;
}

/* Sidebar de filtros */
.filters-sidebar {
  position: sticky;
  top: 150px;
  height: fit-content;
  animation: slideInLeft 0.6s ease-out;
}

/* Sección de planes */
.plans-section {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 140px);
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

/* Header fijo */
.results-header-fixed {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  background: white;
  border-bottom: 2px solid #f0f0f0;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.results-header-fixed h2 {
  margin: 0;
  color: #333;
  font-size: 28px;
  font-weight: 700;
}

.results-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.results-count {
  font-size: 16px;
  color: #666;
  font-weight: 500;
}

.page-info {
  font-size: 14px;
  color: #999;
}

/* Contenedor con scroll */
.plans-container {
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #007bff #f1f1f1;
}

.plans-container::-webkit-scrollbar {
  width: 8px;
}

.plans-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.plans-container::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #007bff, #0056b3);
  border-radius: 10px;
  transition: all 0.3s ease;
}

.plans-container::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #0056b3, #004085);
}

/* Grid de planes */
.plans-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  margin-bottom: 40px;
}

.plans-grid > * {
  animation: fadeInUp 0.6s ease-out;
  animation-fill-mode: both;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.plans-grid > *::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 123, 255, 0.1), rgba(0, 86, 179, 0.1));
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 1;
}

.plans-grid > *:hover {
  transform: translateY(-8px) scale(1.03);
  box-shadow: 0 15px 35px rgba(0, 123, 255, 0.2);
  border: 2px solid #007bff;
}

.plans-grid > *:hover::before {
  opacity: 1;
}

.plans-grid > *:active {
  transform: translateY(-4px) scale(1.01);
}

.plans-grid > *:nth-child(1) {
  animation-delay: 0.1s;
}
.plans-grid > *:nth-child(2) {
  animation-delay: 0.2s;
}
.plans-grid > *:nth-child(3) {
  animation-delay: 0.3s;
}
.plans-grid > *:nth-child(4) {
  animation-delay: 0.4s;
}
.plans-grid > *:nth-child(5) {
  animation-delay: 0.5s;
}
.plans-grid > *:nth-child(6) {
  animation-delay: 0.6s;
}
.plans-grid > *:nth-child(7) {
  animation-delay: 0.7s;
}
.plans-grid > *:nth-child(8) {
  animation-delay: 0.8s;
}
.plans-grid > *:nth-child(9) {
  animation-delay: 0.9s;
}

/* Sin resultados */
.no-results {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}

.no-results-content {
  text-align: center;
  color: #666;
}

.no-results-content h3 {
  margin: 0 0 10px 0;
  font-size: 24px;
  color: #999;
}

.no-results-content p {
  margin: 0;
  font-size: 16px;
}

/* Paginación */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 50px;
  padding: 30px;
  border-top: 2px solid #f0f0f0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  animation: slideInUp 0.6s ease-out;
}

.pagination-btn {
  padding: 12px 20px;
  border: 2px solid #e0e0e0;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  color: #495057;
  border-radius: 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.pagination-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: left 0.6s ease;
}

.pagination-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
  color: white;
  border-color: #007bff;
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 25px rgba(0, 123, 255, 0.3);
}

.pagination-btn:hover:not(:disabled)::before {
  left: 100%;
}

.pagination-btn:active:not(:disabled) {
  transform: translateY(-1px) scale(1.02);
}

.pagination-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  background: #f8f9fa;
  border-color: #e9ecef;
  box-shadow: none;
  transform: none;
}

.pagination-numbers {
  display: flex;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.pagination-number {
  width: 48px;
  height: 48px;
  border: 2px solid #e0e0e0;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  color: #495057;
  border-radius: 12px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.pagination-number::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #007bff, #0056b3);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.pagination-number:hover {
  transform: translateY(-2px) scale(1.1);
  border-color: #007bff;
  box-shadow: 0 6px 20px rgba(0, 123, 255, 0.25);
}

.pagination-number:hover::before {
  opacity: 1;
}

.pagination-number:hover {
  color: white;
}

.pagination-number.active {
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
  color: white;
  border-color: #007bff;
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.4);
  transform: scale(1.15);
  animation: pulse 2s infinite;
}

.pagination-number.active::before {
  opacity: 1;
}

.pagination-dots {
  display: flex;
  align-items: center;
  padding: 0 8px;
  color: #6c757d;
  font-weight: bold;
  font-size: 18px;
  animation: bounce 2s infinite;
}

.footer {
  margin-top: auto;
}

/* Responsive */
@media (max-width: 1200px) {
  .content-wrapper {
    grid-template-columns: 350px 1fr;
    gap: 20px;
  }

  .filters-sidebar {
    position: relative;
    top: 0;
  }

  .plans-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .plans-section {
    height: calc(100vh - 120px);
  }
}

@media (max-width: 992px) {
  .content-wrapper {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .plans-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .results-header-fixed {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 20px;
  }

  .results-info {
    align-items: flex-start;
  }

  .pagination {
    gap: 10px;
    padding: 20px;
  }

  .pagination-btn {
    padding: 10px 16px;
    font-size: 13px;
  }

  .pagination-number {
    width: 42px;
    height: 42px;
    font-size: 14px;
  }

  .plans-section {
    height: calc(100vh - 100px);
  }
}

@media (max-width: 768px) {
  .main-content {
    padding: 15px;
  }

  .plans-container {
    padding: 20px;
  }

  .plans-grid {
    grid-template-columns: 1fr;
  }

  .pagination {
    flex-wrap: wrap;
    gap: 8px;
    padding: 20px 15px;
  }

  .pagination-btn {
    padding: 8px 12px;
    font-size: 12px;
  }

  .pagination-number {
    width: 38px;
    height: 38px;
    font-size: 13px;
  }

  .pagination-numbers {
    padding: 6px 12px;
    gap: 6px;
  }

  .plans-section {
    height: calc(100vh - 80px);
  }

  .results-header-fixed {
    padding: 15px;
  }
}

@media (max-width: 480px) {
  .results-header-fixed h2 {
    font-size: 24px;
  }

  .pagination-numbers {
    max-width: 250px;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .pagination-numbers::-webkit-scrollbar {
    display: none;
  }

  .pagination {
    padding: 15px 10px;
  }

  .pagination-btn {
    padding: 6px 10px;
    font-size: 11px;
  }

  .pagination-number {
    width: 35px;
    height: 35px;
    font-size: 12px;
  }

  .plans-section {
    height: calc(100vh - 60px);
  }

  .plans-grid > *:hover {
    transform: translateY(-4px) scale(1.02);
  }
}

/* Animaciones */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 4px 15px rgba(0, 123, 255, 0.4);
  }
  50% {
    box-shadow: 0 4px 20px rgba(0, 123, 255, 0.6);
  }
  100% {
    box-shadow: 0 4px 15px rgba(0, 123, 255, 0.4);
  }
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-5px);
  }
  60% {
    transform: translateY(-3px);
  }
}
</style>
