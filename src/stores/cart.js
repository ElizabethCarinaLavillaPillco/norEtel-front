import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore(
  'cart',
  () => {
    // State
    const items = ref([])
    const isOpen = ref(false)

    // Getters
    const itemCount = computed(() => {
      return items.value.reduce((total, item) => total + item.quantity, 0)
    })

    const subtotal = computed(() => {
      return items.value.reduce((total, item) => {
        return total + item.price * item.quantity
      }, 0)
    })

    const total = computed(() => {
      // Aquí puedes agregar lógica de descuentos, impuestos, etc.
      return subtotal.value
    })

    const isEmpty = computed(() => items.value.length === 0)

    // Actions
    function addItem(plan, quantity = 1) {
      const existingItem = items.value.find((item) => item.id === plan.id)

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        items.value.push({
          id: plan.id,
          name: plan.name,
          price: plan.price,
          type: plan.type,
          quantity,
          features: plan.features,
          image: plan.image,
        })
      }

      // Mostrar el carrito cuando se agrega un item
      isOpen.value = true

      // Guardar en localStorage
      saveToLocalStorage()
    }

    function removeItem(itemId) {
      const index = items.value.findIndex((item) => item.id === itemId)
      if (index > -1) {
        items.value.splice(index, 1)
        saveToLocalStorage()
      }
    }

    function updateQuantity(itemId, quantity) {
      const item = items.value.find((item) => item.id === itemId)
      if (item) {
        if (quantity <= 0) {
          removeItem(itemId)
        } else {
          item.quantity = quantity
          saveToLocalStorage()
        }
      }
    }

    function clearCart() {
      items.value = []
      saveToLocalStorage()
    }

    function toggleCart() {
      isOpen.value = !isOpen.value
    }

    function closeCart() {
      isOpen.value = false
    }

    function saveToLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(items.value))
    }

    function loadFromLocalStorage() {
      const saved = localStorage.getItem('cart')
      if (saved) {
        try {
          items.value = JSON.parse(saved)
        } catch (err) {
          console.error('Error loading cart from localStorage:', err)
          items.value = []
        }
      }
    }

    // Cargar carrito al inicializar
    loadFromLocalStorage()

    return {
      // State
      items,
      isOpen,

      // Getters
      itemCount,
      subtotal,
      total,
      isEmpty,

      // Actions
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      toggleCart,
      closeCart,
      saveToLocalStorage,
      loadFromLocalStorage,
    }
  },
  {
    persist: true, // Si usas pinia-plugin-persistedstate
  },
)
