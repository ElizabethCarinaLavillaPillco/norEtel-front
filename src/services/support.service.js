import api from './api'

export const supportService = {
  /**
   * Crear ticket de soporte (público, sin autenticación)
   */
  async createPublicTicket(ticketData) {
    return await api.post('/public/support/ticket', ticketData)
  },

  /**
   * Obtener categorías de problemas
   */
  async getCategories() {
    return await api.get('/public/support/categories')
  },

  /**
   * Test de velocidad
   */
  async submitSpeedTest(testResults) {
    return await api.post('/public/support/speed-test', testResults)
  },

  /**
   * Obtener guías de configuración
   */
  async getConfigGuides() {
    return await api.get('/public/support/guides')
  },

  /**
   * Obtener preguntas frecuentes
   */
  async getFAQs(category = null) {
    return await api.get('/public/support/faqs', {
      params: { category },
    })
  },
}
