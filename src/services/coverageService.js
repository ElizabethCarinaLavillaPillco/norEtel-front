import api from './api'

export default {
  // Verificar cobertura
  async checkCoverage(coordinates) {
    const response = await api.post('/public/coverage/check', {
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    })
    return response.data
  },

  // Solicitar cobertura en zona
  async requestCoverage(data) {
    const response = await api.post('/public/coverage/request', {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      coordinates: {
        lat: data.coordinates.lat,
        lng: data.coordinates.lng,
      },
    })
    return response.data
  },
}
