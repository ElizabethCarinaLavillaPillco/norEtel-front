import api from './api'

export const plansService = {
  /**
   * Obtener todos los planes
   */
  async getAll() {
    return await api.get('/public/plans')
  },

  /**
   * Obtener un plan por ID
   */
  async getById(id) {
    return await api.get(`/public/plans/${id}`)
  },

  /**
   * Obtener planes por tipo (fibra, movil, combo)
   */
  async getByType(type) {
    return await api.get('/public/plans', {
      params: { type },
    })
  },

  /**
   * Obtener promociones activas
   */
  async getPromotions() {
    return await api.get('/public/promotions')
  },

  /**
   * Crear cotización personalizada
   */
  async createQuote(quoteData) {
    return await api.post('/public/quote', quoteData)
  },

  /**
   * Comparar planes
   */
  async comparePlans(planIds) {
    return await api.post('/public/plans/compare', {
      plan_ids: planIds,
    })
  },
}
