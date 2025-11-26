import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

export const usePlansStore = defineStore('plans', () => {
  // ==================== STATE ====================
  const plans = ref([])
  const promotions = ref([])
  const currentPlan = ref(null)
  const filters = ref({
    type: null, // 'fibra', 'movil', 'combo'
    priceRange: [0, 200],
    speed: null,
    dataAmount: null,
  })
  const isLoading = ref(false)
  const error = ref(null)

  // ==================== GETTERS ====================
  const filteredPlans = computed(() => {
    let filtered = plans.value

    if (filters.value.type) {
      filtered = filtered.filter((plan) => plan.type === filters.value.type)
    }

    filtered = filtered.filter((plan) => {
      return plan.price >= filters.value.priceRange[0] && plan.price <= filters.value.priceRange[1]
    })

    if (filters.value.speed) {
      filtered = filtered.filter((plan) => plan.speed >= filters.value.speed)
    }

    if (filters.value.dataAmount) {
      filtered = filtered.filter((plan) => plan.dataAmount >= filters.value.dataAmount)
    }

    return filtered
  })

  const popularPlans = computed(() => {
    return plans.value
      .filter((plan) => plan.isPopular)
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 4)
  })

  const plansByType = computed(() => {
    return {
      fibra: plans.value.filter((p) => p.type === 'fibra'),
      movil: plans.value.filter((p) => p.type === 'movil'),
      combo: plans.value.filter((p) => p.type === 'combo'),
    }
  })

  // ==================== ACTIONS ====================

  // Obtener todos los planes desde el backend
  async function fetchPlans() {
    isLoading.value = true
    error.value = null

    try {
      const response = await api.get('/public/plans')
      plans.value = response.data.data || response.data
      return plans.value
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al cargar planes'
      console.error('Error fetching plans:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Obtener promociones activas
  async function fetchPromotions() {
    isLoading.value = true
    error.value = null

    try {
      const response = await api.get('/public/promotions')
      promotions.value = response.data.data || response.data
      return promotions.value
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al cargar promociones'
      console.error('Error fetching promotions:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Obtener un plan específico por ID
  async function fetchPlanById(id) {
    isLoading.value = true
    error.value = null

    try {
      const response = await api.get(`/public/plans/${id}`)
      currentPlan.value = response.data.data || response.data
      return currentPlan.value
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al cargar plan'
      console.error('Error fetching plan:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Crear cotización de plan personalizado
  async function createQuote(quoteData) {
    isLoading.value = true
    error.value = null

    try {
      const response = await api.post('/public/quote', quoteData)
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al crear cotización'
      console.error('Error creating quote:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Establecer filtros
  function setFilters(newFilters) {
    filters.value = { ...filters.value, ...newFilters }
  }

  // Resetear filtros
  function resetFilters() {
    filters.value = {
      type: null,
      priceRange: [0, 200],
      speed: null,
      dataAmount: null,
    }
  }

  // Limpiar error
  function clearError() {
    error.value = null
  }

  // ==================== RETURN ====================
  return {
    // State
    plans,
    promotions,
    currentPlan,
    filters,
    isLoading,
    error,

    // Getters
    filteredPlans,
    popularPlans,
    plansByType,

    // Actions
    fetchPlans,
    fetchPromotions,
    fetchPlanById,
    createQuote,
    setFilters,
    resetFilters,
    clearError,
  }
})
