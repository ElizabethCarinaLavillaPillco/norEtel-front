import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const customer = ref(null)
  const token = ref(localStorage.getItem('auth_token') || null)
  const isLoading = ref(false)
  const error = ref(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const isCustomer = computed(() => user.value?.roles?.some((role) => role.name === 'customer'))
  const isAdmin = computed(() =>
    user.value?.roles?.some((role) => ['super-admin', 'admin'].includes(role.name)),
  )
  const fullName = computed(() => {
    if (customer.value) {
      return customer.value.full_name
    }
    return user.value?.username || 'Usuario'
  })

  // Actions
  async function login(credentials) {
    isLoading.value = true
    error.value = null

    try {
      const response = await api.post('/auth/login', credentials)
      const data = response.data.data

      token.value = data.token
      user.value = data.user
      customer.value = data.customer || null

      localStorage.setItem('auth_token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      if (data.customer) {
        localStorage.setItem('customer', JSON.stringify(data.customer))
      }

      return true
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al iniciar sesión'
      console.error('Login error:', err)
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function register(userData) {
    isLoading.value = true
    error.value = null

    try {
      const response = await api.post('/auth/register', userData)
      const data = response.data.data

      token.value = data.token
      user.value = data.user
      customer.value = data.customer || null

      localStorage.setItem('auth_token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      if (data.customer) {
        localStorage.setItem('customer', JSON.stringify(data.customer))
      }

      return true
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al registrar'
      console.error('Register error:', err)
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function logout() {
    try {
      await api.post('/auth/logout')
    } catch (err) {
      console.error('Error al cerrar sesión:', err)
    } finally {
      user.value = null
      customer.value = null
      token.value = null
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
      localStorage.removeItem('customer')
    }
  }

  async function fetchUser() {
    if (!token.value) return

    isLoading.value = true
    try {
      const response = await api.get('/auth/me')
      const data = response.data.data

      user.value = data.user
      customer.value = data.customer || null

      localStorage.setItem('user', JSON.stringify(data.user))
      if (data.customer) {
        localStorage.setItem('customer', JSON.stringify(data.customer))
      }
    } catch (err) {
      console.error('Error al obtener usuario:', err)
      if (err.response?.status === 401) {
        logout()
      }
    } finally {
      isLoading.value = false
    }
  }

  function clearError() {
    error.value = null
  }

  // Cargar datos del localStorage al iniciar
  function initAuth() {
    const savedUser = localStorage.getItem('user')
    const savedCustomer = localStorage.getItem('customer')

    if (savedUser) {
      try {
        user.value = JSON.parse(savedUser)
      } catch (e) {
        console.error('Error parsing user:', e)
      }
    }

    if (savedCustomer) {
      try {
        customer.value = JSON.parse(savedCustomer)
      } catch (e) {
        console.error('Error parsing customer:', e)
      }
    }
  }

  // Inicializar al crear el store
  initAuth()

  return {
    // State
    user,
    customer,
    token,
    isLoading,
    error,

    // Getters
    isAuthenticated,
    isCustomer,
    isAdmin,
    fullName,

    // Actions
    login,
    register,
    logout,
    fetchUser,
    clearError,
  }
})
