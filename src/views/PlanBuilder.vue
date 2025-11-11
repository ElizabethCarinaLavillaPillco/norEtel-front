<template>
  <div class="plan-builder-page">
    <!-- Hero -->
    <section class="builder-hero">
      <div class="container">
        <h1 class="hero-title">Configura tu Tarifa a Medida</h1>
        <p class="hero-subtitle">
          Diseña el plan perfecto para ti. Ahora con fibra 1Gb
          <strong>¡a precio de 600Mb durante 6 meses!</strong>
        </p>
      </div>
    </section>

    <!-- Builder -->
    <section class="builder-content">
      <div class="container">
        <div class="builder-wrapper">
          <!-- Configuration Panel -->
          <div class="config-panel">
            <div class="panel-section">
              <h3 class="section-title">Velocidad de Internet</h3>
              <div class="speed-selector">
                <div class="speed-display">
                  <div class="speed-value">{{ selectedSpeed }}</div>
                  <div class="speed-unit">Mbps</div>
                </div>
                <input
                  type="range"
                  v-model="selectedSpeed"
                  min="100"
                  max="1000"
                  step="100"
                  class="speed-slider"
                />
                <div class="speed-marks">
                  <span>100</span>
                  <span>300</span>
                  <span>600</span>
                  <span>1000</span>
                </div>
              </div>

              <!-- Promo Banner -->
              <div v-if="selectedSpeed >= 600" class="promo-banner">
                <div class="promo-icon">🎉</div>
                <div class="promo-content">
                  <div class="promo-title">¡Promoción Especial!</div>
                  <div class="promo-text">
                    Fibra 1Gb a precio de 600Mb durante los primeros 6 meses
                  </div>
                </div>
              </div>
            </div>

            <div class="panel-section">
              <h3 class="section-title">Período de Pago</h3>
              <div class="payment-options">
                <button
                  v-for="period in paymentPeriods"
                  :key="period.id"
                  :class="['period-btn', { active: selectedPeriod === period.id }]"
                  @click="selectedPeriod = period.id"
                >
                  <div class="period-name">{{ period.name }}</div>
                  <div v-if="period.discount" class="period-discount">
                    Ahorra {{ period.discount }}%
                  </div>
                </button>
              </div>
            </div>

            <div class="panel-section">
              <h3 class="section-title">Servicios Adicionales</h3>
              <div class="addons-list">
                <label
                  v-for="addon in availableAddons"
                  :key="addon.id"
                  class="addon-item"
                  :class="{ selected: selectedAddons.includes(addon.id) }"
                >
                  <input
                    type="checkbox"
                    :value="addon.id"
                    v-model="selectedAddons"
                    class="addon-checkbox"
                  />
                  <div class="addon-icon">{{ addon.icon }}</div>
                  <div class="addon-info">
                    <div class="addon-name">{{ addon.name }}</div>
                    <div class="addon-description">{{ addon.description }}</div>
                  </div>
                  <div class="addon-price">+S/ {{ addon.price }}</div>
                </label>
              </div>
            </div>

            <!-- Boost de Velocidad (Profesional) -->
            <div class="panel-section boost-section">
              <div class="section-header">
                <div>
                  <h3 class="section-title">Boost de Velocidad 🚀</h3>
                  <p class="section-description">
                    Para profesionales que necesitan más velocidad en horas específicas
                  </p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" v-model="boostEnabled" />
                  <span class="toggle-slider"></span>
                </label>
              </div>

              <transition name="expand">
                <div v-if="boostEnabled" class="boost-config">
                  <div class="boost-info-card">
                    <svg class="boost-info-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <p>
                      Aumenta tu velocidad hasta <strong>{{ selectedSpeed * 1.5 }} Mbps</strong> en
                      las horas que elijas
                    </p>
                  </div>

                  <div class="form-group">
                    <label class="form-label">Velocidad Boost</label>
                    <select v-model="boostSpeed" class="form-select">
                      <option :value="selectedSpeed * 1.25">
                        +25% ({{ Math.round(selectedSpeed * 1.25) }} Mbps)
                      </option>
                      <option :value="selectedSpeed * 1.5">
                        +50% ({{ Math.round(selectedSpeed * 1.5) }} Mbps)
                      </option>
                      <option :value="selectedSpeed * 2">
                        +100% ({{ Math.round(selectedSpeed * 2) }} Mbps)
                      </option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label class="form-label">Días de la Semana</label>
                    <div class="day-selector">
                      <button
                        v-for="day in weekDays"
                        :key="day.id"
                        :class="['day-btn', { active: boostDays.includes(day.id) }]"
                        @click="toggleBoostDay(day.id)"
                      >
                        {{ day.short }}
                      </button>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label">Hora Inicio</label>
                      <input type="time" v-model="boostStartTime" class="form-input" />
                    </div>
                    <div class="form-group">
                      <label class="form-label">Hora Fin</label>
                      <input type="time" v-model="boostEndTime" class="form-input" />
                    </div>
                  </div>

                  <div class="boost-summary">
                    <div class="summary-item">
                      <span>Días activos:</span>
                      <strong>{{ boostDays.length }} días</strong>
                    </div>
                    <div class="summary-item">
                      <span>Horas por día:</span>
                      <strong>{{ calculateBoostHours() }}h</strong>
                    </div>
                    <div class="summary-item">
                      <span>Costo adicional:</span>
                      <strong class="boost-price">+S/ {{ calculateBoostPrice() }}/mes</strong>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
          </div>

          <!-- Summary Panel -->
          <div class="summary-panel">
            <div class="summary-header">
              <h3 class="summary-title">Resumen de tu Plan</h3>
            </div>

            <div class="summary-content">
              <!-- Plan Base -->
              <div class="summary-section">
                <div class="summary-item-large">
                  <div class="item-icon">🌐</div>
                  <div class="item-info">
                    <div class="item-name">Internet Fibra Óptica</div>
                    <div class="item-details">{{ selectedSpeed }} Mbps</div>
                  </div>
                  <div class="item-price">S/ {{ calculateBasePrice() }}</div>
                </div>
              </div>

              <!-- Addons -->
              <div v-if="selectedAddons.length > 0" class="summary-section">
                <div class="section-label">Servicios Adicionales</div>
                <div v-for="addonId in selectedAddons" :key="addonId" class="summary-item-small">
                  <div class="item-info">
                    <span>{{ getAddonName(addonId) }}</span>
                  </div>
                  <div class="item-price">+S/ {{ getAddonPrice(addonId) }}</div>
                </div>
              </div>

              <!-- Boost -->
              <div v-if="boostEnabled" class="summary-section">
                <div class="section-label">Boost de Velocidad</div>
                <div class="summary-item-small boost-item">
                  <div class="item-info">
                    <span>{{ boostDays.length }} días, {{ calculateBoostHours() }}h/día</span>
                    <div class="boost-details">
                      {{ Math.round(selectedSpeed) }} → {{ Math.round(boostSpeed) }} Mbps
                    </div>
                  </div>
                  <div class="item-price">+S/ {{ calculateBoostPrice() }}</div>
                </div>
              </div>

              <!-- Discount -->
              <div v-if="getDiscount() > 0" class="summary-section discount-section">
                <div class="summary-item-small">
                  <div class="item-info">
                    <span>Descuento {{ getDiscountLabel() }}</span>
                  </div>
                  <div class="item-price discount-price">-S/ {{ getDiscount() }}</div>
                </div>
              </div>

              <!-- Total -->
              <div class="summary-total">
                <div class="total-row">
                  <span class="total-label">Subtotal</span>
                  <span class="total-value">S/ {{ calculateSubtotal() }}</span>
                </div>
                <div v-if="getDiscount() > 0" class="total-row">
                  <span class="total-label">Descuento</span>
                  <span class="total-value discount-value">-S/ {{ getDiscount() }}</span>
                </div>
                <div class="total-row final-total">
                  <span class="total-label">Total {{ getPeriodLabel() }}</span>
                  <span class="total-value">S/ {{ calculateTotal() }}</span>
                </div>
              </div>

              <!-- Promo Message -->
              <div v-if="hasPromo" class="promo-message">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span>¡Fibra 1Gb a precio de 600Mb los primeros 6 meses!</span>
              </div>

              <!-- Action Buttons -->
              <div class="summary-actions">
                <button @click="requestPlan" class="btn btn-primary btn-large">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                    />
                  </svg>
                  Solicitar esta Tarifa
                </button>
                <button @click="saveConfig" class="btn btn-outline">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z"
                    />
                  </svg>
                  Guardar Configuración
                </button>
              </div>

              <!-- Info Note -->
              <div class="info-note">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                  />
                </svg>
                <p>Precios incluyen IGV. Sujeto a verificación de cobertura en tu zona.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Estados
const selectedSpeed = ref(300)
const selectedPeriod = ref('monthly')
const selectedAddons = ref([])
const boostEnabled = ref(false)
const boostSpeed = ref(0)
const boostDays = ref([])
const boostStartTime = ref('20:00')
const boostEndTime = ref('23:00')

// Datos
const paymentPeriods = [
  { id: 'monthly', name: 'Mensual', discount: 0 },
  { id: 'annual', name: 'Anual', discount: 15 },
]

const availableAddons = [
  {
    id: 'tv',
    name: 'TV Digital',
    description: '120+ canales HD',
    icon: '📺',
    price: 29.9,
  },
  {
    id: 'mobile',
    name: 'Línea Móvil',
    description: '50GB + llamadas ilimitadas',
    icon: '📱',
    price: 39.9,
  },
  {
    id: 'security',
    name: 'Seguridad Plus',
    description: 'Antivirus + VPN',
    icon: '🔒',
    price: 19.9,
  },
  {
    id: 'router',
    name: 'Router Pro',
    description: 'WiFi 6 de alta potencia',
    icon: '📡',
    price: 15.9,
  },
]

const weekDays = [
  { id: 'mon', short: 'L', full: 'Lunes' },
  { id: 'tue', short: 'M', full: 'Martes' },
  { id: 'wed', short: 'X', full: 'Miércoles' },
  { id: 'thu', short: 'J', full: 'Jueves' },
  { id: 'fri', short: 'V', full: 'Viernes' },
  { id: 'sat', short: 'S', full: 'Sábado' },
  { id: 'sun', short: 'D', full: 'Domingo' },
]

// Computed
const hasPromo = computed(() => selectedSpeed.value >= 600)

// Métodos
const calculateBasePrice = () => {
  const prices = {
    100: 49.9,
    200: 59.9,
    300: 79.9,
    400: 89.9,
    500: 99.9,
    600: 109.9,
    700: 119.9,
    800: 129.9,
    900: 139.9,
    1000: 149.9,
  }

  // Promo: 1Gb a precio de 600Mb
  if (selectedSpeed.value === 1000 && hasPromo.value) {
    return prices[600]
  }

  return prices[selectedSpeed.value] || 79.9
}

const calculateBoostPrice = () => {
  if (!boostEnabled.value || boostDays.value.length === 0) return 0

  const speedIncrease = ((boostSpeed.value - selectedSpeed.value) / selectedSpeed.value) * 100
  const hoursPerDay = calculateBoostHours()
  const daysPerMonth = boostDays.value.length * 4 // Aproximado

  // Precio base por hora de boost
  const pricePerHour = 0.5
  const total = pricePerHour * hoursPerDay * daysPerMonth

  return total.toFixed(2)
}

const calculateBoostHours = () => {
  if (!boostStartTime.value || !boostEndTime.value) return 0

  const [startH, startM] = boostStartTime.value.split(':').map(Number)
  const [endH, endM] = boostEndTime.value.split(':').map(Number)

  let hours = endH - startH
  if (hours < 0) hours += 24 // Maneja cruce de medianoche

  return Math.max(0, hours)
}

const calculateSubtotal = () => {
  const base = calculateBasePrice()
  const addons = selectedAddons.value.reduce((sum, id) => {
    const addon = availableAddons.find((a) => a.id === id)
    return sum + (addon?.price || 0)
  }, 0)
  const boost = parseFloat(calculateBoostPrice())

  return (base + addons + boost).toFixed(2)
}

const getDiscount = () => {
  if (selectedPeriod.value === 'annual') {
    const subtotal = parseFloat(calculateSubtotal())
    return (subtotal * 0.15).toFixed(2)
  }
  return 0
}

const getDiscountLabel = () => {
  if (selectedPeriod.value === 'annual') return '(Pago Anual)'
  return ''
}

const calculateTotal = () => {
  const subtotal = parseFloat(calculateSubtotal())
  const discount = parseFloat(getDiscount())

  if (selectedPeriod.value === 'annual') {
    return ((subtotal - discount) * 12).toFixed(2)
  }

  return subtotal.toFixed(2)
}

const getPeriodLabel = () => {
  return selectedPeriod.value === 'annual' ? '/año' : '/mes'
}

const getAddonName = (id) => {
  return availableAddons.find((a) => a.id === id)?.name || ''
}

const getAddonPrice = (id) => {
  return availableAddons.find((a) => a.id === id)?.price || 0
}

const toggleBoostDay = (dayId) => {
  const index = boostDays.value.indexOf(dayId)
  if (index > -1) {
    boostDays.value.splice(index, 1)
  } else {
    boostDays.value.push(dayId)
  }
}

const requestPlan = () => {
  const config = {
    speed: selectedSpeed.value,
    period: selectedPeriod.value,
    addons: selectedAddons.value,
    boost: boostEnabled.value
      ? {
          speed: boostSpeed.value,
          days: boostDays.value,
          startTime: boostStartTime.value,
          endTime: boostEndTime.value,
          price: calculateBoostPrice(),
        }
      : null,
    total: calculateTotal(),
  }

  // Generar mensaje para WhatsApp
  const message = generateWhatsAppMessage(config)
  const whatsappUrl = `https://wa.me/5198989845?text=${encodeURIComponent(message)}`

  window.open(whatsappUrl, '_blank')
}

const generateWhatsAppMessage = (config) => {
  let message = `¡Hola! Quiero solicitar un plan personalizado:\n\n`
  message += `📡 *Internet*: ${config.speed} Mbps - S/ ${calculateBasePrice()}\n`

  if (config.addons.length > 0) {
    message += `\n*Servicios Adicionales*:\n`
    config.addons.forEach((id) => {
      const addon = availableAddons.find((a) => a.id === id)
      if (addon) {
        message += `• ${addon.name} - S/ ${addon.price}\n`
      }
    })
  }

  if (config.boost) {
    message += `\n🚀 *Boost de Velocidad*:\n`
    message += `• Velocidad: ${Math.round(config.boost.speed)} Mbps\n`
    message += `• Días: ${config.boost.days.length} días/semana\n`
    message += `• Horario: ${config.boost.startTime} - ${config.boost.endTime}\n`
    message += `• Precio: +S/ ${config.boost.price}/mes\n`
  }

  message += `\n💰 *Total ${getPeriodLabel()}*: S/ ${config.total}\n`
  message += `📅 *Período*: ${selectedPeriod.value === 'annual' ? 'Anual' : 'Mensual'}\n`

  if (hasPromo.value) {
    message += `\n🎉 *Promoción activa*: Fibra 1Gb a precio de 600Mb (6 meses)\n`
  }

  message += `\n¿Pueden darme más información sobre este plan?`

  return message
}

const saveConfig = () => {
  const config = {
    speed: selectedSpeed.value,
    period: selectedPeriod.value,
    addons: selectedAddons.value,
    boost: boostEnabled.value
      ? {
          speed: boostSpeed.value,
          days: boostDays.value,
          startTime: boostStartTime.value,
          endTime: boostEndTime.value,
        }
      : null,
    timestamp: new Date().toISOString(),
  }

  localStorage.setItem('savedPlanConfig', JSON.stringify(config))
  alert('¡Configuración guardada! Puedes volver más tarde para continuar.')
}

// Cargar configuración guardada al montar
const loadSavedConfig = () => {
  const saved = localStorage.getItem('savedPlanConfig')
  if (saved) {
    try {
      const config = JSON.parse(saved)
      selectedSpeed.value = config.speed
      selectedPeriod.value = config.period
      selectedAddons.value = config.addons || []
      if (config.boost) {
        boostEnabled.value = true
        boostSpeed.value = config.boost.speed
        boostDays.value = config.boost.days
        boostStartTime.value = config.boost.startTime
        boostEndTime.value = config.boost.endTime
      }
    } catch (e) {
      console.error('Error loading saved config', e)
    }
  }
}

// Inicializar boost speed
boostSpeed.value = selectedSpeed.value * 1.5

// Watch para actualizar boost speed cuando cambia la velocidad
import { watch } from 'vue'
watch(selectedSpeed, (newSpeed) => {
  if (!boostEnabled.value || boostSpeed.value < newSpeed) {
    boostSpeed.value = newSpeed * 1.5
  }
})

// Cargar al montar
import { onMounted } from 'vue'
onMounted(() => {
  loadSavedConfig()
})
</script>

<style scoped>
/* Hero */
.builder-hero {
  background: var(--gradient-primary);
  color: white;
  padding: var(--spacing-12) 0 var(--spacing-8);
  text-align: center;
}

.hero-title {
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
  margin: 0 0 var(--spacing-3) 0;
}

.hero-subtitle {
  font-size: var(--font-size-xl);
  opacity: 0.95;
  max-width: 700px;
  margin: 0 auto;
}

/* Main Content */
.builder-content {
  padding: var(--spacing-16) 0;
  background: var(--color-gray-50);
}

.builder-wrapper {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--spacing-8);
  align-items: start;
}

/* Config Panel */
.config-panel {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
}

.panel-section {
  background: white;
  border-radius: var(--radius-xl);
  padding: var(--spacing-6);
  box-shadow: var(--shadow-md);
}

.section-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-900);
  margin: 0 0 var(--spacing-4) 0;
}

.section-description {
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  margin: 0;
}

/* Speed Selector */
.speed-selector {
  padding: var(--spacing-4);
}

.speed-display {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-6);
}

.speed-value {
  font-size: 72px;
  font-weight: var(--font-weight-bold);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  line-height: 1;
}

.speed-unit {
  font-size: var(--font-size-2xl);
  color: var(--color-gray-600);
  font-weight: var(--font-weight-semibold);
}

.speed-slider {
  width: 100%;
  height: 8px;
  border-radius: var(--radius-full);
  background: var(--color-gray-200);
  outline: none;
  margin-bottom: var(--spacing-3);
  --webkit-appearance: none;
}

.speed-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--gradient-primary);
  cursor: pointer;
  box-shadow: var(--shadow-md);
}

.speed-slider::-moz-range-thumb {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--gradient-primary);
  cursor: pointer;
  border: none;
  box-shadow: var(--shadow-md);
}

.speed-marks {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  padding: 0 4px;
}

/* Promo Banner */
.promo-banner {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  padding: var(--spacing-4);
  background: linear-gradient(135deg, #fff9e6 0%, #ffe6f0 100%);
  border-radius: var(--radius-lg);
  border: 2px solid #ffcc00;
  margin-top: var(--spacing-4);
}

.promo-icon {
  font-size: 32px;
  flex-shrink: 0;
}

.promo-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-900);
  margin-bottom: 2px;
}

.promo-text {
  font-size: var(--font-size-sm);
  color: var(--color-gray-700);
}

/* Payment Options */
.payment-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-3);
}

.period-btn {
  padding: var(--spacing-4);
  background: var(--color-gray-50);
  border: 2px solid var(--color-gray-300);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-base);
  text-align: left;
}

.period-btn:hover {
  border-color: var(--color-primary);
  background: var(--color-blue-50);
}

.period-btn.active {
  background: var(--gradient-primary);
  color: white;
  border-color: var(--color-primary);
  box-shadow: var(--shadow-primary);
}

.period-name {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  margin-bottom: 4px;
}

.period-discount {
  font-size: var(--font-size-sm);
  opacity: 0.9;
}

/* Addons */
.addons-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
}

.addon-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  padding: var(--spacing-4);
  background: var(--color-gray-50);
  border: 2px solid var(--color-gray-300);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-base);
}

.addon-item:hover {
  border-color: var(--color-primary);
  background: var(--color-blue-50);
}

.addon-item.selected {
  background: var(--color-blue-50);
  border-color: var(--color-primary);
}

.addon-checkbox {
  cursor: pointer;
}

.addon-icon {
  font-size: 28px;
  flex-shrink: 0;
}

.addon-info {
  flex: 1;
}

.addon-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-900);
  margin-bottom: 2px;
}

.addon-description {
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
}

.addon-price {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
}

/* Boost Section */
.boost-section {
  border: 2px solid var(--color-primary);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: var(--spacing-4);
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 56px;
  height: 28px;
  flex-shrink: 0;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--color-gray-300);
  transition: 0.3s;
  border-radius: 28px;
}

.toggle-slider:before {
  position: absolute;
  content: '';
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
}

input:checked + .toggle-slider {
  background: var(--gradient-primary);
}

input:checked + .toggle-slider:before {
  transform: translateX(28px);
}

/* Boost Config */
.boost-config {
  margin-top: var(--spacing-4);
}

.boost-info-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  padding: var(--spacing-3);
  background: var(--color-blue-50);
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-4);
  font-size: var(--font-size-sm);
  color: var(--color-gray-700);
}

.boost-info-icon {
  width: 20px;
  height: 20px;
  color: var(--color-primary);
  flex-shrink: 0;
}

.form-group {
  margin-bottom: var(--spacing-4);
}

.form-label {
  display: block;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-700);
  margin-bottom: var(--spacing-2);
}

.form-select,
.form-input {
  width: 100%;
  padding: var(--spacing-3) var(--spacing-4);
  border: 2px solid var(--color-gray-300);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  transition: all var(--transition-base);
}

.form-select:focus,
.form-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(0, 153, 255, 0.1);
}

.day-selector {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: var(--spacing-2);
}

.day-btn {
  padding: var(--spacing-3);
  background: var(--color-gray-100);
  border: 2px solid var(--color-gray-300);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all var(--transition-base);
}

.day-btn:hover {
  border-color: var(--color-primary);
  background: var(--color-blue-50);
}

.day-btn.active {
  background: var(--gradient-primary);
  color: white;
  border-color: var(--color-primary);
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-3);
}

.boost-summary {
  margin-top: var(--spacing-4);
  padding: var(--spacing-4);
  background: var(--color-gray-50);
  border-radius: var(--radius-lg);
}

.summary-item {
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-2) 0;
  font-size: var(--font-size-sm);
  color: var(--color-gray-700);
}

.boost-price {
  color: var(--color-primary);
  font-weight: var(--font-weight-bold);
}

/* Summary Panel */
.summary-panel {
  background: white;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  position: sticky;
  top: var(--spacing-8);
}

.summary-header {
  padding: var(--spacing-6);
  background: var(--gradient-primary);
  color: white;
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
}

.summary-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  margin: 0;
}

.summary-content {
  padding: var(--spacing-6);
}

.summary-section {
  padding: var(--spacing-4) 0;
  border-bottom: 1px solid var(--color-gray-200);
}

.summary-section:last-of-type {
  border-bottom: none;
}

.section-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-600);
  margin-bottom: var(--spacing-3);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.summary-item-large {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
}

.item-icon {
  font-size: 32px;
  flex-shrink: 0;
}

.item-info {
  flex: 1;
}

.item-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-900);
  margin-bottom: 2px;
}

.item-details {
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
}

.item-price {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-900);
}

.summary-item-small {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-2) 0;
  font-size: var(--font-size-sm);
  color: var(--color-gray-700);
}

.boost-item {
  padding: var(--spacing-3);
  background: var(--color-blue-50);
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-2);
}

.boost-details {
  font-size: var(--font-size-xs);
  color: var(--color-primary);
  font-weight: var(--font-weight-semibold);
  margin-top: 2px;
}

.discount-section {
  background: var(--color-green-50);
  padding: var(--spacing-3);
  border-radius: var(--radius-lg);
  border: none;
}

.discount-price {
  color: var(--color-success);
}

/* Total */
.summary-total {
  padding: var(--spacing-4) 0;
}

.total-row {
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-2) 0;
}

.total-label {
  font-size: var(--font-size-base);
  color: var(--color-gray-700);
}

.total-value {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-900);
}

.discount-value {
  color: var(--color-success);
}

.final-total {
  margin-top: var(--spacing-3);
  padding-top: var(--spacing-3);
  border-top: 2px solid var(--color-gray-200);
}

.final-total .total-label {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-900);
}

.final-total .total-value {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* Promo Message */
.promo-message {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-3);
  background: #fff9e6;
  border-radius: var(--radius-lg);
  margin: var(--spacing-4) 0;
  font-size: var(--font-size-sm);
  color: var(--color-gray-700);
}

.promo-message svg {
  width: 20px;
  height: 20px;
  color: #ffcc00;
  flex-shrink: 0;
}

/* Actions */
.summary-actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
  margin-bottom: var(--spacing-4);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  padding: var(--spacing-3) var(--spacing-6);
  border: none;
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all var(--transition-base);
  text-decoration: none;
}

.btn svg {
  width: 20px;
  height: 20px;
}

.btn-primary {
  background: var(--gradient-primary);
  color: white;
  box-shadow: var(--shadow-primary);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-xl);
}

.btn-outline {
  background: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
}

.btn-outline:hover {
  background: var(--color-primary);
  color: white;
}

.btn-large {
  padding: var(--spacing-4) var(--spacing-6);
  font-size: var(--font-size-lg);
}

/* Info Note */
.info-note {
  display: flex;
  gap: var(--spacing-2);
  padding: var(--spacing-3);
  background: var(--color-gray-50);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-xs);
  color: var(--color-gray-600);
}

.info-note svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  margin-top: 2px;
}

.info-note p {
  margin: 0;
}

/* Animations */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
  max-height: 1000px;
  opacity: 1;
}

/* Responsive */
@media (max-width: 1200px) {
  .builder-wrapper {
    grid-template-columns: 1fr;
  }

  .summary-panel {
    position: relative;
    top: 0;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: var(--font-size-3xl);
  }

  .hero-subtitle {
    font-size: var(--font-size-base);
  }

  .payment-options {
    grid-template-columns: 1fr;
  }

  .day-selector {
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
  }

  .day-btn {
    padding: var(--spacing-2);
    font-size: 12px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
