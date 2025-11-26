import axios from 'axios'

// Configuración base de la API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  withCredentials: true, // Importante para cookies de sesión y CSRF
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  timeout: 30000, // 30 segundos
})

// ==================== INTERCEPTORES ====================

// Interceptor de REQUEST - Añade token a cada petición
api.interceptors.request.use(
  (config) => {
    // Obtener token del localStorage
    const token = localStorage.getItem('auth_token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Log para desarrollo (puedes comentarlo en producción)
    if (import.meta.env.DEV) {
      console.log(`🚀 ${config.method.toUpperCase()} ${config.url}`, config.data)
    }

    return config
  },
  (error) => {
    console.error('❌ Error en request:', error)
    return Promise.reject(error)
  },
)

// Interceptor de RESPONSE - Maneja respuestas y errores
api.interceptors.response.use(
  (response) => {
    // Log para desarrollo
    if (import.meta.env.DEV) {
      console.log(`✅ Response ${response.config.url}:`, response.data)
    }
    return response
  },
  (error) => {
    // Manejo de errores según código HTTP
    if (error.response) {
      const status = error.response.status
      const message = error.response.data?.message || 'Error en la solicitud'

      switch (status) {
        case 401: // No autenticado
          console.warn('⚠️ No autenticado - Redirigiendo al login')
          localStorage.removeItem('auth_token')
          localStorage.removeItem('user')

          // Redirigir al login solo si no estamos ya ahí
          if (!window.location.pathname.includes('/login')) {
            window.location.href = '/login'
          }
          break

        case 403: // Sin permisos
          console.error('🚫 Acceso denegado:', message)
          break

        case 404: // No encontrado
          console.error('🔍 Recurso no encontrado:', error.response.config.url)
          break

        case 422: // Error de validación
          console.error('📝 Error de validación:', error.response.data.errors)
          break

        case 429: // Demasiadas peticiones
          console.error('⏱️ Demasiadas peticiones. Intenta de nuevo más tarde.')
          break

        case 500: // Error del servidor
          console.error('💥 Error del servidor:', message)
          break

        default:
          console.error(`❌ Error ${status}:`, message)
      }

      // Agregar información del error para mejor debugging
      error.friendlyMessage = message
      error.validationErrors = error.response.data?.errors || null
    } else if (error.request) {
      // La petición se hizo pero no hubo respuesta
      console.error('📡 No se recibió respuesta del servidor')
      error.friendlyMessage = 'No se pudo conectar con el servidor. Verifica tu conexión.'
    } else {
      // Algo pasó al configurar la petición
      console.error('⚙️ Error al configurar la petición:', error.message)
      error.friendlyMessage = 'Error al realizar la petición'
    }

    return Promise.reject(error)
  },
)

// ==================== MÉTODOS AUXILIARES ====================

/**
 * Obtener token CSRF de Laravel Sanctum
 */
export async function getCsrfToken() {
  try {
    await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
      withCredentials: true,
    })
  } catch (error) {
    console.error('Error obteniendo CSRF token:', error)
  }
}

/**
 * Establecer token de autenticación
 */
export function setAuthToken(token) {
  if (token) {
    localStorage.setItem('auth_token', token)
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    localStorage.removeItem('auth_token')
    delete api.defaults.headers.common['Authorization']
  }
}

/**
 * Obtener token actual
 */
export function getAuthToken() {
  return localStorage.getItem('auth_token')
}

/**
 * Limpiar autenticación
 */
export function clearAuth() {
  localStorage.removeItem('auth_token')
  localStorage.removeItem('user')
  delete api.defaults.headers.common['Authorization']
}

/**
 * Verificar si el usuario está autenticado
 */
export function isAuthenticated() {
  return !!getAuthToken()
}

// Exportar instancia de API por defecto
export default api
