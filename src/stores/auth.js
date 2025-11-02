import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '@/services/auth.service'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  const isLoading = ref(false)
  const error = ref(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const isCustomer = computed(() => user.value?.role === 'customer')
  const isAdmin = computed(() => user.value?.role === 'admin')

  // Actions
  async function login(credentials) {
    isLoading.value = true
    error.value = null

    try {
      const response = await authService.login(credentials)
      token.value = response.token
      user.value = response.user

      localStorage.setItem('token', response.token)

      return true
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al iniciar sesión'
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function register(userData) {
    isLoading.value = true
    error.value = null

    try {
      const response = await authService.register(userData)
      token.value = response.token
      user.value = response.user

      localStorage.setItem('token', response.token)

      return true
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al registrar'
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function logout() {
    try {
      await authService.logout()
    } catch (err) {
      console.error('Error al cerrar sesión:', err)
    } finally {
      user.value = null
      token.value = null
      localStorage.removeItem('token')
    }
  }

  async function fetchUser() {
    if (!token.value) return

    isLoading.value = true
    try {
      const response = await authService.getUser()
      user.value = response.data
    } catch (err) {
      console.error('Error al obtener usuario:', err)
      // Si el token es inválido, cerrar sesión
      if (err.response?.status === 401) {
        logout()
      }
    } finally {
      isLoading.value = false
    }
  }

  async function updateProfile(data) {
    isLoading.value = true
    error.value = null

    try {
      const response = await authService.updateProfile(data)
      user.value = response.data
      return true
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al actualizar perfil'
      return false
    } finally {
      isLoading.value = false
    }
  }

  function clearError() {
    error.value = null
  }

  return {
    // State
    user,
    token,
    isLoading,
    error,

    // Getters
    isAuthenticated,
    isCustomer,
    isAdmin,

    // Actions
    login,
    register,
    logout,
    fetchUser,
    updateProfile,
    clearError,
  }
})
