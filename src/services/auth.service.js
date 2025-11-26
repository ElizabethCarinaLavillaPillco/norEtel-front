import api, { getCsrfToken, setAuthToken, clearAuth } from './api'

export const authService = {
  /**
   * Iniciar sesión
   */
  async login(credentials) {
    // Primero obtener el token CSRF
    await getCsrfToken()

    const response = await api.post('/auth/login', {
      email: credentials.email,
      password: credentials.password,
    })

    // Guardar token y usuario
    if (response.data.token) {
      setAuthToken(response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
    }

    return response.data
  },

  /**
   * Registrar nuevo usuario
   */
  async register(userData) {
    await getCsrfToken()

    const response = await api.post('/auth/register', userData)

    if (response.data.token) {
      setAuthToken(response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
    }

    return response.data
  },

  /**
   * Cerrar sesión
   */
  async logout() {
    try {
      await api.post('/auth/logout')
    } finally {
      clearAuth()
    }
  },

  /**
   * Obtener usuario actual
   */
  async getCurrentUser() {
    const response = await api.get('/auth/user')
    localStorage.setItem('user', JSON.stringify(response.data))
    return response.data
  },

  /**
   * Solicitar recuperación de contraseña
   */
  async forgotPassword(email) {
    return await api.post('/auth/forgot-password', { email })
  },

  /**
   * Restablecer contraseña
   */
  async resetPassword(data) {
    return await api.post('/auth/reset-password', data)
  },
}
