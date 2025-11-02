import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { customerService } from '@/services/customer.service'

export const useCustomerStore = defineStore('customer', () => {
  // State
  const invoices = ref([])
  const payments = ref([])
  const tickets = ref([])
  const contracts = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  // Getters
  const pendingInvoices = computed(() => {
    return invoices.value.filter((inv) => inv.status === 'pending')
  })

  const totalDebt = computed(() => {
    return pendingInvoices.value.reduce((total, inv) => total + inv.amount, 0)
  })

  const openTickets = computed(() => {
    return tickets.value.filter((ticket) => ticket.status !== 'closed')
  })

  const activeContracts = computed(() => {
    return contracts.value.filter((contract) => contract.status === 'active')
  })

  // Actions
  async function fetchInvoices() {
    isLoading.value = true
    error.value = null

    try {
      const response = await customerService.getInvoices()
      invoices.value = response.data
    } catch (err) {
      error.value = 'Error al cargar boletas'
      console.error('Error fetching invoices:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchPayments() {
    isLoading.value = true
    error.value = null

    try {
      const response = await customerService.getPayments()
      payments.value = response.data
    } catch (err) {
      error.value = 'Error al cargar pagos'
      console.error('Error fetching payments:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchTickets() {
    isLoading.value = true
    error.value = null

    try {
      const response = await customerService.getTickets()
      tickets.value = response.data
    } catch (err) {
      error.value = 'Error al cargar tickets'
      console.error('Error fetching tickets:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function createTicket(ticketData) {
    isLoading.value = true
    error.value = null

    try {
      const response = await customerService.createTicket(ticketData)
      tickets.value.unshift(response.data)
      return true
    } catch (err) {
      error.value = 'Error al crear ticket'
      console.error('Error creating ticket:', err)
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function makePayment(paymentData) {
    isLoading.value = true
    error.value = null

    try {
      const response = await customerService.makePayment(paymentData)
      payments.value.unshift(response.data)

      // Actualizar facturas pagadas
      await fetchInvoices()

      return true
    } catch (err) {
      error.value = 'Error al procesar pago'
      console.error('Error making payment:', err)
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
    invoices,
    payments,
    tickets,
    contracts,
    isLoading,
    error,

    // Getters
    pendingInvoices,
    totalDebt,
    openTickets,
    activeContracts,

    // Actions
    fetchInvoices,
    fetchPayments,
    fetchTickets,
    createTicket,
    makePayment,
    clearError,
  }
})
