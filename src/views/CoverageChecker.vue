<template>
  <div class="coverage-checker">
    <!-- Hero Section -->
    <section class="coverage-hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Comprueba tu Cobertura</h1>
          <p class="hero-subtitle">
            Verifica si nuestro servicio de Internet de alta velocidad está disponible en tu zona
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="coverage-content">
      <div class="container">
        <div class="coverage-wrapper">
          <!-- Paso 1: Búsqueda por Dirección -->
          <div v-if="currentStep === 'search'" class="coverage-step">
            <div class="step-header">
              <div class="step-icon">📍</div>
              <h2 class="step-title">Ingresa tu dirección</h2>
              <p class="step-description">
                Completa los datos para verificar la disponibilidad en tu zona
              </p>
            </div>

            <form @submit.prevent="checkAddressCoverage" class="address-form">
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label"> Departamento <span class="required">*</span> </label>
                  <select v-model="address.department" class="form-input" required>
                    <option value="">Selecciona un departamento</option>
                    <option value="Cusco">Cusco</option>
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label"> Provincia <span class="required">*</span> </label>
                  <select
                    v-model="address.province"
                    class="form-input"
                    required
                    :disabled="!address.department"
                  >
                    <option value="">Selecciona una provincia</option>
                    <option v-for="prov in availableProvinces" :key="prov" :value="prov">
                      {{ prov }}
                    </option>
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label"> Distrito <span class="required">*</span> </label>
                  <select
                    v-model="address.district"
                    class="form-input"
                    required
                    :disabled="!address.province"
                  >
                    <option value="">Selecciona un distrito</option>
                    <option v-for="dist in availableDistricts" :key="dist" :value="dist">
                      {{ dist }}
                    </option>
                  </select>
                </div>

                <div class="form-group full-width">
                  <label class="form-label"> Calle/Avenida <span class="required">*</span> </label>
                  <input
                    v-model="address.street"
                    type="text"
                    class="form-input"
                    placeholder="Ej: Av. El Sol 123"
                    required
                  />
                </div>

                <div class="form-group">
                  <label class="form-label">Número/Lote</label>
                  <input
                    v-model="address.number"
                    type="text"
                    class="form-input"
                    placeholder="Ej: 456"
                  />
                </div>

                <div class="form-group">
                  <label class="form-label">Referencia</label>
                  <input
                    v-model="address.reference"
                    type="text"
                    class="form-input"
                    placeholder="Ej: Cerca al parque"
                  />
                </div>
              </div>

              <button type="submit" class="btn btn-primary btn-large" :disabled="isLoading">
                <span v-if="!isLoading">
                  <svg class="btn-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Comprobar Cobertura
                </span>
                <span v-else class="loading-spinner">
                  <div class="spinner"></div>
                  Verificando...
                </span>
              </button>
            </form>

            <div class="alternative-option">
              <div class="divider">
                <span class="divider-text">o</span>
              </div>
              <button @click="showMap" class="btn btn-outline btn-large">
                <svg class="btn-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clip-rule="evenodd"
                  />
                </svg>
                No encuentro mi ubicación - Usar Mapa
              </button>
            </div>
          </div>

          <!-- Paso 2: Mapa Interactivo -->
          <div v-if="currentStep === 'map'" class="coverage-step">
            <div class="step-header">
              <div class="step-icon">🗺️</div>
              <h2 class="step-title">Selecciona tu ubicación en el mapa</h2>
              <p class="step-description">
                Haz clic en el mapa para marcar tu ubicación o permite el acceso a tu ubicación
              </p>
            </div>

            <div class="map-controls">
              <button
                @click="getCurrentLocation"
                class="btn btn-secondary"
                :disabled="isGettingLocation"
              >
                <svg class="btn-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span v-if="!isGettingLocation">Usar mi ubicación actual</span>
                <span v-else>Obteniendo ubicación...</span>
              </button>
            </div>

            <div class="map-container">
              <div id="coverage-map" class="map"></div>
              <div v-if="selectedLocation" class="map-info">
                <div class="map-info-content">
                  <svg class="map-info-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <div>
                    <p class="map-info-title">Ubicación seleccionada</p>
                    <p class="map-info-coords">
                      {{ selectedLocation.lat.toFixed(6) }}, {{ selectedLocation.lng.toFixed(6) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="map-actions">
              <button @click="currentStep = 'search'" class="btn btn-outline">
                <svg class="btn-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
                Volver a búsqueda
              </button>
              <button
                @click="checkMapCoverage"
                class="btn btn-primary"
                :disabled="!selectedLocation || isLoading"
              >
                <span v-if="!isLoading">Comprobar Cobertura</span>
                <span v-else class="loading-spinner">
                  <div class="spinner"></div>
                  Verificando...
                </span>
              </button>
            </div>
          </div>

          <!-- Paso 3: Resultado - Cobertura Disponible -->
          <div v-if="currentStep === 'result' && coverageResult" class="coverage-step">
            <div class="result-card" :class="`result-${coverageResult.status}`">
              <div class="result-icon">
                <svg
                  v-if="coverageResult.status === 'available'"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                <svg v-else viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>

              <h2 class="result-title">{{ coverageResult.title }}</h2>
              <p class="result-message">{{ coverageResult.message }}</p>

              <div v-if="coverageResult.status === 'available'" class="coverage-quality">
                <div class="quality-label">Calidad de cobertura:</div>
                <div class="quality-badge" :class="`quality-${coverageResult.quality}`">
                  <div class="quality-bars">
                    <div
                      class="quality-bar"
                      :class="{ active: index < getQualityLevel(coverageResult.quality) }"
                      v-for="index in 4"
                      :key="index"
                    ></div>
                  </div>
                  <span class="quality-text">{{ getQualityText(coverageResult.quality) }}</span>
                </div>
              </div>

              <div v-if="coverageResult.status === 'available'" class="available-plans">
                <h3 class="plans-title">Planes disponibles para tu zona:</h3>
                <div class="plans-grid">
                  <div v-for="plan in availablePlans" :key="plan.id" class="plan-card">
                    <div class="plan-speed">{{ plan.speed }}</div>
                    <div class="plan-name">{{ plan.name }}</div>
                    <div class="plan-price">S/ {{ plan.price }}/mes</div>
                    <button @click="selectPlan(plan)" class="btn btn-primary btn-sm">
                      Contratar
                    </button>
                  </div>
                </div>
              </div>

              <div class="result-actions">
                <button
                  v-if="coverageResult.status === 'available'"
                  @click="goToPlans"
                  class="btn btn-primary btn-large"
                >
                  Ver todos los planes
                </button>
                <button
                  v-if="coverageResult.status === 'unavailable'"
                  @click="showRequestForm"
                  class="btn btn-primary btn-large"
                >
                  Solicitar Zona
                </button>
                <button @click="resetChecker" class="btn btn-outline">
                  Verificar otra dirección
                </button>
              </div>
            </div>
          </div>

          <!-- Paso 4: Formulario de Solicitud de Zona -->
          <div v-if="currentStep === 'request'" class="coverage-step">
            <div class="step-header">
              <div class="step-icon">📝</div>
              <h2 class="step-title">Solicitar Cobertura en tu Zona</h2>
              <p class="step-description">
                Déjanos tus datos y te notificaremos cuando lleguemos a tu zona. Una vez que
                <strong>15 personas</strong> soliciten servicio en tu área, instalaremos la
                infraestructura necesaria.
              </p>
            </div>

            <div class="request-info">
              <div class="info-card">
                <div class="info-icon">👥</div>
                <div class="info-content">
                  <div class="info-title">Solicitudes actuales en tu zona</div>
                  <div class="info-value">{{ requestCount }} / 15 personas</div>
                </div>
              </div>
              <div class="progress-bar">
                <div
                  class="progress-fill"
                  :style="{ width: `${(requestCount / 15) * 100}%` }"
                ></div>
              </div>
            </div>

            <form @submit.prevent="submitRequest" class="request-form">
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label">
                    Nombre completo <span class="required">*</span>
                  </label>
                  <input
                    v-model="requestForm.fullName"
                    type="text"
                    class="form-input"
                    placeholder="Ej: Juan Pérez García"
                    required
                  />
                </div>

                <div class="form-group">
                  <label class="form-label">
                    Número de celular <span class="required">*</span>
                  </label>
                  <input
                    v-model="requestForm.phone"
                    type="tel"
                    class="form-input"
                    placeholder="Ej: 987654321"
                    required
                    pattern="[0-9]{9}"
                  />
                </div>

                <div class="form-group full-width">
                  <label class="form-label">
                    Correo electrónico <span class="required">*</span>
                  </label>
                  <input
                    v-model="requestForm.email"
                    type="email"
                    class="form-input"
                    placeholder="Ej: juan.perez@email.com"
                    required
                  />
                </div>

                <div class="form-group full-width">
                  <label class="form-label">Dirección completa</label>
                  <textarea
                    v-model="requestForm.address"
                    class="form-textarea"
                    placeholder="Ingresa tu dirección completa"
                    rows="3"
                  ></textarea>
                </div>

                <div class="form-group full-width">
                  <label class="form-label">Comentarios adicionales (opcional)</label>
                  <textarea
                    v-model="requestForm.comments"
                    class="form-textarea"
                    placeholder="¿Algo más que quieras contarnos?"
                    rows="3"
                  ></textarea>
                </div>

                <div class="form-group full-width">
                  <label class="form-checkbox">
                    <input v-model="requestForm.acceptTerms" type="checkbox" required />
                    <span class="checkbox-text">
                      Acepto recibir notificaciones sobre la disponibilidad del servicio y los
                      <a href="/terminos" target="_blank">términos y condiciones</a>
                    </span>
                  </label>
                </div>
              </div>

              <div class="form-actions">
                <button type="button" @click="currentStep = 'result'" class="btn btn-outline">
                  Cancelar
                </button>
                <button type="submit" class="btn btn-primary btn-large" :disabled="isSubmitting">
                  <span v-if="!isSubmitting">Enviar Solicitud</span>
                  <span v-else class="loading-spinner">
                    <div class="spinner"></div>
                    Enviando...
                  </span>
                </button>
              </div>
            </form>
          </div>

          <!-- Paso 5: Confirmación de Solicitud -->
          <div v-if="currentStep === 'confirmation'" class="coverage-step">
            <div class="confirmation-card">
              <div class="confirmation-icon">✅</div>
              <h2 class="confirmation-title">¡Solicitud Enviada!</h2>
              <p class="confirmation-message">
                Gracias por tu interés en NorEtel. Hemos registrado tu solicitud y te notificaremos
                por correo y WhatsApp cuando el servicio esté disponible en tu zona.
              </p>
              <div class="confirmation-details">
                <div class="detail-item">
                  <svg class="detail-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                    />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>{{ requestForm.email }}</span>
                </div>
                <div class="detail-item">
                  <svg class="detail-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                    />
                  </svg>
                  <span>+51 {{ requestForm.phone }}</span>
                </div>
              </div>
              <div class="confirmation-actions">
                <button @click="resetChecker" class="btn btn-primary btn-large">
                  Verificar otra dirección
                </button>
                <button @click="goHome" class="btn btn-outline">Volver al inicio</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Logs de Búsqueda (Solo visible en desarrollo) -->
        <div v-if="showLogs && searchLogs.length > 0" class="search-logs">
          <h3 class="logs-title">Historial de Búsquedas</h3>
          <div class="logs-list">
            <div v-for="(log, index) in searchLogs" :key="index" class="log-item">
              <div class="log-time">{{ formatDate(log.timestamp) }}</div>
              <div class="log-details">
                <span class="log-type">{{ log.type }}</span>
                <span class="log-query">{{ log.query }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Estados principales
const currentStep = ref('search') // search, map, result, request, confirmation
const isLoading = ref(false)
const isGettingLocation = ref(false)
const isSubmitting = ref(false)
const showLogs = ref(false) // Cambiar a true para ver logs en desarrollo

// Datos de dirección
const address = ref({
  department: '',
  province: '',
  district: '',
  street: '',
  number: '',
  reference: '',
})

// Ubicación del mapa
const selectedLocation = ref(null)
let map = null
let marker = null

// Resultado de cobertura
const coverageResult = ref(null)

// Formulario de solicitud
const requestForm = ref({
  fullName: '',
  phone: '',
  email: '',
  address: '',
  comments: '',
  acceptTerms: false,
})

const requestCount = ref(Math.floor(Math.random() * 10) + 3) // Simulado

// Logs de búsqueda
const searchLogs = ref([])

// Datos de ubicación de Cusco
const cuscoData = {
  provinces: {
    Cusco: [
      'Cusco',
      'Ccorca',
      'Poroy',
      'San Jerónimo',
      'San Sebastián',
      'Santiago',
      'Saylla',
      'Wanchaq',
    ],
    Acomayo: ['Acomayo', 'Acopia', 'Acos', 'Mosoc Llacta', 'Pomacanchi', 'Rondocan', 'Sangarará'],
    Anta: ['Anta', 'Ancahuasi', 'Cachimayo', 'Chinchaypujio', 'Huarocondo', 'Limatambo'],
    Calca: ['Calca', 'Coya', 'Lamay', 'Lares', 'Pisac', 'San Salvador', 'Taray', 'Yanatile'],
  },
}

// Zonas con cobertura (Solo San Jerónimo está activo)
const coverageZones = [
  {
    lat: -13.5367,
    lng: -71.8869,
    radius: 3, // 3km de radio para cubrir todo San Jerónimo
    quality: 'excelente',
    name: 'San Jerónimo',
  },
  // Puedes agregar más zonas cuando estén disponibles:
  // { lat: -13.5319, lng: -71.9675, radius: 2, quality: 'excelente', name: 'Centro Cusco' },
  // { lat: -13.5234, lng: -71.9478, radius: 1.5, quality: 'buena', name: 'San Sebastián' },
]

// Computed
const availableProvinces = computed(() => {
  if (address.value.department === 'Cusco') {
    return Object.keys(cuscoData.provinces)
  }
  return []
})

const availableDistricts = computed(() => {
  if (address.value.province && cuscoData.provinces[address.value.province]) {
    return cuscoData.provinces[address.value.province]
  }
  return []
})

const availablePlans = computed(() => {
  if (!coverageResult.value || coverageResult.value.status !== 'available') return []

  const quality = coverageResult.value.quality
  const plans = [
    { id: 1, name: 'Básico', speed: '100 Mbps', price: '59.90' },
    { id: 2, name: 'Hogar', speed: '300 Mbps', price: '79.90' },
    { id: 3, name: 'Premium', speed: '600 Mbps', price: '99.90' },
  ]

  if (quality === 'excelente') {
    plans.push({ id: 4, name: 'Ultra', speed: '1000 Mbps', price: '119.90' })
  }

  return plans
})

// Métodos de dirección
const checkAddressCoverage = async () => {
  isLoading.value = true

  // Log de búsqueda
  logSearch('address', getAddressString())

  // Simular verificación de cobertura
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Verificar cobertura basada en distrito
  const hasCoverage = checkDistrictCoverage(address.value.district)

  if (hasCoverage) {
    coverageResult.value = {
      status: 'available',
      title: '¡Excelente noticia! 🎉',
      message: `Tenemos cobertura en ${address.value.district}, ${address.value.province}`,
      quality: hasCoverage.quality,
      location: address.value,
    }
    currentStep.value = 'result'

    // Guardar datos del cliente
    saveCustomerData('address_check', address.value)
  } else {
    // Si no hay cobertura, mostrar mapa para ubicación precisa
    coverageResult.value = {
      status: 'unavailable',
      title: 'No encontramos cobertura automática',
      message:
        'No pudimos verificar automáticamente la cobertura en tu dirección. Por favor, marca tu ubicación en el mapa para una verificación precisa.',
    }
    currentStep.value = 'map'
  }

  isLoading.value = false
}

const checkDistrictCoverage = (district) => {
  // Solo San Jerónimo tiene cobertura activa
  const coveredDistricts = {
    'San Jerónimo': 'excelente',
    // Cuando otros distritos tengan cobertura, agrégalos aquí:
    // 'Cusco': 'excelente',
    // 'San Sebastián': 'buena',
    // 'Santiago': 'buena',
    // 'Wanchaq': 'estable',
  }

  if (coveredDistricts[district]) {
    return { quality: coveredDistricts[district] }
  }

  return null
}

const getAddressString = () => {
  const parts = [
    address.value.street,
    address.value.number,
    address.value.district,
    address.value.province,
    address.value.department,
  ].filter(Boolean)

  return parts.join(', ')
}

// Métodos de mapa
const showMap = () => {
  currentStep.value = 'map'
  setTimeout(() => {
    initMap()
  }, 100)
}

const initMap = () => {
  if (typeof L === 'undefined') {
    loadLeaflet().then(() => {
      createMap()
    })
  } else {
    createMap()
  }
}

const loadLeaflet = () => {
  return new Promise((resolve, reject) => {
    // Cargar CSS
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    document.head.appendChild(link)

    // Cargar JS
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
}

const createMap = () => {
  const mapContainer = document.getElementById('coverage-map')
  if (!mapContainer) return

  // Centro de Cusco
  const cuscoCenter = [-13.5319, -71.9675]

  map = L.map('coverage-map').setView(cuscoCenter, 13)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map)

  // Dibujar zonas de cobertura
  coverageZones.forEach((zone) => {
    const circle = L.circle([zone.lat, zone.lng], {
      color: getQualityColor(zone.quality),
      fillColor: getQualityColor(zone.quality),
      fillOpacity: 0.2,
      radius: zone.radius * 1000, // convertir km a metros
    }).addTo(map)

    circle.bindPopup(`Cobertura ${zone.quality}`)
  })

  // Click en el mapa para seleccionar ubicación
  map.on('click', (e) => {
    selectLocation(e.latlng)
  })
}

const selectLocation = (latlng) => {
  selectedLocation.value = latlng

  // Remover marcador anterior
  if (marker) {
    map.removeLayer(marker)
  }

  // Agregar nuevo marcador
  marker = L.marker([latlng.lat, latlng.lng]).addTo(map)
  marker.bindPopup('Ubicación seleccionada').openPopup()
}

const getCurrentLocation = () => {
  if (!navigator.geolocation) {
    alert('Tu navegador no soporta geolocalización')
    return
  }

  isGettingLocation.value = true

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latlng = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }

      // Verificar si está en el área de Cusco
      if (isInCuscoArea(latlng)) {
        selectLocation(latlng)
        map.setView([latlng.lat, latlng.lng], 16)
      } else {
        alert(
          'Parece que no estás en el área de Cusco. Por favor, selecciona manualmente tu ubicación.',
        )
      }

      isGettingLocation.value = false
    },
    (error) => {
      console.error('Error obteniendo ubicación:', error)
      alert('No pudimos obtener tu ubicación. Por favor, selecciona manualmente en el mapa.')
      isGettingLocation.value = false
    },
  )
}

const isInCuscoArea = (latlng) => {
  // Verificar si está en un radio aproximado de Cusco
  const cuscoCenter = { lat: -13.5319, lng: -71.9675 }
  const distance = getDistance(cuscoCenter, latlng)
  return distance < 50 // 50 km del centro
}

const getDistance = (point1, point2) => {
  const R = 6371 // Radio de la Tierra en km
  const dLat = ((point2.lat - point1.lat) * Math.PI) / 180
  const dLon = ((point2.lng - point1.lng) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((point1.lat * Math.PI) / 180) *
      Math.cos((point2.lat * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

const checkMapCoverage = async () => {
  isLoading.value = true

  // Log de búsqueda
  logSearch(
    'map',
    `${selectedLocation.value.lat.toFixed(6)}, ${selectedLocation.value.lng.toFixed(6)}`,
  )

  // Simular verificación
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Verificar si está en zona de cobertura
  const coverage = checkLocationCoverage(selectedLocation.value)

  if (coverage) {
    coverageResult.value = {
      status: 'available',
      title: '¡Genial! Tenemos cobertura en tu zona 🎉',
      message: `La calidad de señal en tu ubicación es ${coverage.quality}`,
      quality: coverage.quality,
      location: selectedLocation.value,
    }
    currentStep.value = 'result'

    // Guardar datos
    saveCustomerData('map_check', selectedLocation.value)
  } else {
    coverageResult.value = {
      status: 'unavailable',
      title: 'Aún no llegamos a tu zona 😔',
      message:
        'Actualmente no tenemos cobertura en tu ubicación, pero estamos expandiendo nuestra red constantemente.',
    }
    currentStep.value = 'result'
  }

  isLoading.value = false
}

const checkLocationCoverage = (location) => {
  // Verificar si está dentro de alguna zona de cobertura
  for (const zone of coverageZones) {
    const distance = getDistance({ lat: zone.lat, lng: zone.lng }, location)
    if (distance <= zone.radius) {
      return { quality: zone.quality }
    }
  }
  return null
}

// Métodos de formulario
const showRequestForm = () => {
  // Pre-llenar dirección si existe
  if (coverageResult.value?.location) {
    if (
      typeof coverageResult.value.location === 'object' &&
      'lat' in coverageResult.value.location
    ) {
      requestForm.value.address = `Lat: ${coverageResult.value.location.lat.toFixed(6)}, Lng: ${coverageResult.value.location.lng.toFixed(6)}`
    } else {
      requestForm.value.address = getAddressString()
    }
  }

  currentStep.value = 'request'
}

const submitRequest = async () => {
  isSubmitting.value = true

  // Simular envío
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Guardar solicitud
  const requestData = {
    ...requestForm.value,
    address: requestForm.value.address,
    requestedAt: new Date().toISOString(),
    location: coverageResult.value?.location,
  }

  saveCustomerData('zone_request', requestData)

  // Incrementar contador
  requestCount.value++

  isSubmitting.value = false
  currentStep.value = 'confirmation'
}

// Métodos de utilidad
const getQualityLevel = (quality) => {
  const levels = { excelente: 4, buena: 3, estable: 2, baja: 1 }
  return levels[quality] || 1
}

const getQualityText = (quality) => {
  const texts = {
    excelente: 'Excelente',
    buena: 'Buena',
    estable: 'Estable',
    baja: 'Baja',
  }
  return texts[quality] || 'Desconocida'
}

const getQualityColor = (quality) => {
  const colors = {
    excelente: '#00cc66',
    buena: '#0099ff',
    estable: '#ffcc00',
    baja: '#ff6600',
  }
  return colors[quality] || '#999999'
}

const logSearch = (type, query) => {
  searchLogs.value.unshift({
    type,
    query,
    timestamp: new Date().toISOString(),
  })

  // Guardar en localStorage
  localStorage.setItem('coverageSearchLogs', JSON.stringify(searchLogs.value))
}

const saveCustomerData = (action, data) => {
  // Obtener datos existentes
  let customerData = JSON.parse(localStorage.getItem('customerData') || '[]')

  // Agregar nuevo registro
  customerData.push({
    action,
    data,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
  })

  // Guardar
  localStorage.setItem('customerData', JSON.stringify(customerData))

  console.log('Datos guardados:', { action, data })
}

const formatDate = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleString('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const selectPlan = (plan) => {
  console.log('Plan seleccionado:', plan)
  // Aquí puedes redirigir a la página de contratación
  router.push(`/contratar?plan=${plan.id}`)
}

const goToPlans = () => {
  router.push('/productos/planes')
}

const goHome = () => {
  router.push('/')
}

const resetChecker = () => {
  currentStep.value = 'search'
  address.value = {
    department: '',
    province: '',
    district: '',
    street: '',
    number: '',
    reference: '',
  }
  selectedLocation.value = null
  coverageResult.value = null
  requestForm.value = {
    fullName: '',
    phone: '',
    email: '',
    address: '',
    comments: '',
    acceptTerms: false,
  }

  if (map) {
    map.remove()
    map = null
  }
}

// Lifecycle
onMounted(() => {
  // Cargar logs previos
  const savedLogs = localStorage.getItem('coverageSearchLogs')
  if (savedLogs) {
    searchLogs.value = JSON.parse(savedLogs)
  }
})

onUnmounted(() => {
  if (map) {
    map.remove()
  }
})
</script>

<style scoped>
/* Hero Section */
.coverage-hero {
  background: var(--gradient-primary);
  color: var(--color-white);
  padding: var(--spacing-16) 0 var(--spacing-12);
  position: relative;
  overflow: hidden;
}

.coverage-hero::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.hero-content {
  text-align: center;
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
  margin: 0 0 var(--spacing-4) 0;
}

.hero-subtitle {
  font-size: var(--font-size-xl);
  opacity: 0.95;
  max-width: 600px;
  margin: 0 auto;
}

/* Main Content */
.coverage-content {
  padding: var(--spacing-16) 0;
  background: var(--color-gray-50);
  min-height: 70vh;
}

.coverage-wrapper {
  max-width: 900px;
  margin: 0 auto;
}

.coverage-step {
  background: var(--color-white);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-xl);
  padding: var(--spacing-8);
  animation: fadeInUp 0.5s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Step Header */
.step-header {
  text-align: center;
  margin-bottom: var(--spacing-8);
}

.step-icon {
  font-size: 64px;
  margin-bottom: var(--spacing-4);
}

.step-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-900);
  margin: 0 0 var(--spacing-3) 0;
}

.step-description {
  font-size: var(--font-size-lg);
  color: var(--color-gray-600);
  max-width: 600px;
  margin: 0 auto;
  line-height: var(--line-height-relaxed);
}

/* Forms */
.address-form,
.request-form {
  margin-bottom: var(--spacing-6);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-6);
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-700);
  margin-bottom: var(--spacing-2);
}

.required {
  color: var(--color-error);
}

.form-input,
.form-textarea {
  padding: var(--spacing-3) var(--spacing-4);
  border: 2px solid var(--color-gray-300);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  transition: all var(--transition-base);
  font-family: var(--font-family-base);
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(0, 153, 255, 0.1);
}

.form-input:disabled {
  background: var(--color-gray-100);
  cursor: not-allowed;
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.form-checkbox {
  display: flex;
  align-items: start;
  gap: var(--spacing-2);
  cursor: pointer;
}

.form-checkbox input[type='checkbox'] {
  margin-top: 4px;
  cursor: pointer;
}

.checkbox-text {
  font-size: var(--font-size-sm);
  color: var(--color-gray-700);
  line-height: var(--line-height-normal);
}

.checkbox-text a {
  color: var(--color-primary);
  text-decoration: underline;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  padding: var(--spacing-3) var(--spacing-6);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  border: none;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-base);
  text-decoration: none;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: var(--gradient-primary);
  color: var(--color-white);
  box-shadow: var(--shadow-primary);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-xl);
}

.btn-secondary {
  background: var(--gradient-secondary);
  color: var(--color-white);
  box-shadow: var(--shadow-secondary);
}

.btn-secondary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-xl);
}

.btn-outline {
  background: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
}

.btn-outline:hover:not(:disabled) {
  background: var(--color-primary);
  color: var(--color-white);
}

.btn-large {
  padding: var(--spacing-4) var(--spacing-8);
  font-size: var(--font-size-lg);
}

.btn-sm {
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--font-size-sm);
}

.btn-icon {
  width: 20px;
  height: 20px;
}

.loading-spinner {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Alternative Option */
.alternative-option {
  margin-top: var(--spacing-8);
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: var(--spacing-6) 0;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid var(--color-gray-300);
}

.divider-text {
  padding: 0 var(--spacing-4);
  color: var(--color-gray-500);
  font-weight: var(--font-weight-medium);
}

/* Map */
.map-controls {
  margin-bottom: var(--spacing-4);
  display: flex;
  justify-content: center;
}

.map-container {
  position: relative;
  margin-bottom: var(--spacing-6);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.map {
  width: 100%;
  height: 500px;
  background: var(--color-gray-100);
}

.map-info {
  position: absolute;
  top: var(--spacing-4);
  left: var(--spacing-4);
  right: var(--spacing-4);
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  padding: var(--spacing-3);
  z-index: 1000;
}

.map-info-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
}

.map-info-icon {
  width: 24px;
  height: 24px;
  color: var(--color-primary);
  flex-shrink: 0;
}

.map-info-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-1);
}

.map-info-coords {
  font-size: var(--font-size-xs);
  color: var(--color-gray-600);
  font-family: monospace;
}

.map-actions {
  display: flex;
  gap: var(--spacing-4);
  justify-content: space-between;
}

/* Result Card */
.result-card {
  text-align: center;
}

.result-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto var(--spacing-4);
}

.result-icon svg {
  width: 100%;
  height: 100%;
}

.result-available .result-icon {
  color: var(--color-success);
}

.result-unavailable .result-icon {
  color: var(--color-error);
}

.result-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-900);
  margin: 0 0 var(--spacing-3) 0;
}

.result-message {
  font-size: var(--font-size-lg);
  color: var(--color-gray-600);
  margin-bottom: var(--spacing-6);
  line-height: var(--line-height-relaxed);
}

/* Coverage Quality */
.coverage-quality {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-3);
  padding: var(--spacing-4);
  background: var(--color-gray-50);
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-8);
}

.quality-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-700);
}

.quality-badge {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
}

.quality-bars {
  display: flex;
  gap: 2px;
  align-items: flex-end;
  height: 24px;
}

.quality-bar {
  width: 6px;
  background: var(--color-gray-300);
  border-radius: 2px;
  transition: all var(--transition-base);
}

.quality-bar:nth-child(1) {
  height: 6px;
}
.quality-bar:nth-child(2) {
  height: 12px;
}
.quality-bar:nth-child(3) {
  height: 18px;
}
.quality-bar:nth-child(4) {
  height: 24px;
}

.quality-bar.active {
  background: var(--color-success);
}

.quality-excelente .quality-bar.active {
  background: #00cc66;
}

.quality-buena .quality-bar.active {
  background: #0099ff;
}

.quality-estable .quality-bar.active {
  background: #ffcc00;
}

.quality-baja .quality-bar.active {
  background: #ff6600;
}

.quality-text {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-900);
}

/* Available Plans */
.available-plans {
  margin: var(--spacing-8) 0;
}

.plans-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-6);
}

.plans-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-6);
}

.plan-card {
  padding: var(--spacing-6);
  background: var(--color-gray-50);
  border: 2px solid var(--color-gray-200);
  border-radius: var(--radius-lg);
  transition: all var(--transition-base);
}

.plan-card:hover {
  border-color: var(--color-primary);
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.plan-speed {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: var(--spacing-2);
}

.plan-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-700);
  margin-bottom: var(--spacing-3);
}

.plan-price {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-4);
}

/* Result Actions */
.result-actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  align-items: center;
  margin-top: var(--spacing-6);
}

/* Request Info */
.request-info {
  margin-bottom: var(--spacing-8);
}

.info-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  padding: var(--spacing-6);
  background: var(--gradient-primary);
  color: white;
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-4);
}

.info-icon {
  font-size: 48px;
}

.info-content {
  flex: 1;
}

.info-title {
  font-size: var(--font-size-sm);
  opacity: 0.9;
  margin-bottom: var(--spacing-1);
}

.info-value {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
}

.progress-bar {
  height: 12px;
  background: var(--color-gray-200);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--gradient-secondary);
  transition: width 0.5s ease;
}

.form-actions {
  display: flex;
  gap: var(--spacing-4);
  justify-content: space-between;
}

/* Confirmation */
.confirmation-card {
  text-align: center;
  padding: var(--spacing-8);
}

.confirmation-icon {
  font-size: 80px;
  margin-bottom: var(--spacing-4);
}

.confirmation-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-success);
  margin: 0 0 var(--spacing-4) 0;
}

.confirmation-message {
  font-size: var(--font-size-lg);
  color: var(--color-gray-600);
  max-width: 600px;
  margin: 0 auto var(--spacing-8);
  line-height: var(--line-height-relaxed);
}

.confirmation-details {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
  max-width: 400px;
  margin: 0 auto var(--spacing-8);
}

.detail-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  padding: var(--spacing-3);
  background: var(--color-gray-50);
  border-radius: var(--radius-lg);
}

.detail-icon {
  width: 20px;
  height: 20px;
  color: var(--color-primary);
  flex-shrink: 0;
}

.confirmation-actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
  align-items: center;
}

/* Search Logs */
.search-logs {
  margin-top: var(--spacing-12);
  padding: var(--spacing-6);
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.logs-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-4);
}

.logs-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

.log-item {
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-3);
  background: var(--color-gray-50);
  border-radius: var(--radius-base);
  font-size: var(--font-size-sm);
}

.log-time {
  color: var(--color-gray-500);
  font-family: monospace;
}

.log-details {
  display: flex;
  gap: var(--spacing-3);
}

.log-type {
  padding: 2px 8px;
  background: var(--color-primary);
  color: white;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
}

.log-query {
  color: var(--color-gray-700);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: var(--font-size-3xl);
  }

  .hero-subtitle {
    font-size: var(--font-size-base);
  }

  .coverage-step {
    padding: var(--spacing-6);
  }

  .step-icon {
    font-size: 48px;
  }

  .step-title {
    font-size: var(--font-size-2xl);
  }

  .step-description {
    font-size: var(--font-size-base);
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .map {
    height: 400px;
  }

  .map-actions {
    flex-direction: column;
  }

  .plans-grid {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
  }

  .result-actions {
    width: 100%;
  }

  .result-actions .btn {
    width: 100%;
  }

  .confirmation-actions {
    width: 100%;
  }

  .confirmation-actions .btn {
    width: 100%;
  }
}
</style>
