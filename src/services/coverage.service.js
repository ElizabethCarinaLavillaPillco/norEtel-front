import api from './api'

export const coverageService = {
  /**
   * Verificar cobertura en coordenadas específicas
   */
  async checkCoverage(coordinates) {
    return await api.post('/public/coverage/check', {
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    })
  },

  /**
   * Verificar cobertura por dirección
   */
  async checkCoverageByAddress(address) {
    return await api.post('/public/coverage/check-address', {
      address,
    })
  },

  /**
   * Solicitar cobertura en nueva zona
   */
  async requestCoverage(data) {
    return await api.post('/public/coverage/request', {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      coordinates: {
        lat: data.coordinates.lat,
        lng: data.coordinates.lng,
      },
      comments: data.comments || null,
    })
  },

  /**
   * Obtener estadísticas de solicitudes en zona
   */
  async getZoneStats(coordinates) {
    return await api.get('/public/coverage/zone-stats', {
      params: {
        latitude: coordinates.lat,
        longitude: coordinates.lng,
      },
    })
  },
}
