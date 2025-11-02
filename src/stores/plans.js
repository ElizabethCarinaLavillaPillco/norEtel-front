import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { plansService } from '@/services/plans.service'

export const usePlansStore = defineStore('plans', () => {
  // State
  const plans = ref([])
  const currentPlan = ref(null)
  const filters = ref({
    type: null, // 'fibra', 'movil', 'combo'
    priceRange: [0, 200],
    speed: null,
    dataAmount: null,
  })
  const isLoading = ref(false)
  const error = ref(null)

  // Getters
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

  // Actions
  async function fetchPlans() {
    isLoading.value = true
    error.value = null

    try {
      const response = await plansService.getAll()
      plans.value = response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al cargar planes'
      console.error('Error fetching plans:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchPlanById(id) {
    isLoading.value = true
    error.value = null

    try {
      const response = await plansService.getById(id)
      currentPlan.value = response.data
      return currentPlan.value
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al cargar plan'
      console.error('Error fetching plan:', err)
      return null
    } finally {
      isLoading.value = false
    }
  }

  function setFilters(newFilters) {
    filters.value = { ...filters.value, ...newFilters }
  }

  function resetFilters() {
    filters.value = {
      type: null,
      priceRange: [0, 200],
      speed: null,
      dataAmount: null,
    }
  }

  function clearError() {
    error.value = null
  }

  return {
    // State
    plans,
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
    fetchPlanById,
    setFilters,
    resetFilters,
    clearError,
  }
})
