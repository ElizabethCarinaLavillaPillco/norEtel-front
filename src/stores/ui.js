import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  // State
  const isMobileMenuOpen = ref(false)
  const isCartOpen = ref(false)
  const isChatOpen = ref(false)
  const activeModal = ref(null)
  const notifications = ref([])
  const isLoading = ref(false)
  const loadingMessage = ref('')

  // Actions
  function toggleMobileMenu() {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }

  function closeMobileMenu() {
    isMobileMenuOpen.value = false
  }

  function toggleCart() {
    isCartOpen.value = !isCartOpen.value
  }

  function closeCart() {
    isCartOpen.value = false
  }

  function toggleChat() {
    isChatOpen.value = !isChatOpen.value
  }

  function closeChat() {
    isChatOpen.value = false
  }

  function openModal(modalName, data = null) {
    activeModal.value = { name: modalName, data }
  }

  function closeModal() {
    activeModal.value = null
  }

  function addNotification(notification) {
    const id = Date.now()
    notifications.value.push({
      id,
      type: notification.type || 'info', // info, success, warning, error
      message: notification.message,
      duration: notification.duration || 5000,
    })

    // Auto-remover después de duration
    setTimeout(() => {
      removeNotification(id)
    }, notification.duration || 5000)

    return id
  }

  function removeNotification(id) {
    const index = notifications.value.findIndex((n) => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  function showLoading(message = 'Cargando...') {
    isLoading.value = true
    loadingMessage.value = message
  }

  function hideLoading() {
    isLoading.value = false
    loadingMessage.value = ''
  }

  function showSuccess(message) {
    addNotification({ type: 'success', message })
  }

  function showError(message) {
    addNotification({ type: 'error', message, duration: 7000 })
  }

  function showInfo(message) {
    addNotification({ type: 'info', message })
  }

  function showWarning(message) {
    addNotification({ type: 'warning', message })
  }

  return {
    // State
    isMobileMenuOpen,
    isCartOpen,
    isChatOpen,
    activeModal,
    notifications,
    isLoading,
    loadingMessage,

    // Actions
    toggleMobileMenu,
    closeMobileMenu,
    toggleCart,
    closeCart,
    toggleChat,
    closeChat,
    openModal,
    closeModal,
    addNotification,
    removeNotification,
    showLoading,
    hideLoading,
    showSuccess,
    showError,
    showInfo,
    showWarning,
  }
})
