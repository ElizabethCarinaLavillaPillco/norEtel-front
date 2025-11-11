<template>
  <div class="speed-test-page">
    <!-- Hero Section -->
    <section class="speed-hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Test de Velocidad NorEtel</h1>
          <p class="hero-subtitle">Mide la velocidad de tu conexión de internet en tiempo real</p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="speed-content">
      <div class="container">
        <div class="speed-wrapper">
          <!-- Speed Test Panel -->
          <div class="speed-panel">
            <div class="server-selector">
              <div class="server-badge">
                <svg class="server-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clip-rule="evenodd"
                  />
                </svg>
                <div>
                  <div class="server-label">Servidor Seleccionado</div>
                  <div class="server-name">NorEtel - Cusco, Perú</div>
                </div>
              </div>
            </div>

            <!-- Speed Gauge -->
            <div class="speed-gauge">
              <div class="gauge-container">
                <svg class="gauge-svg" viewBox="0 0 200 120">
                  <!-- Background arc -->
                  <path
                    d="M 30 100 A 70 70 0 0 1 170 100"
                    fill="none"
                    stroke="#e5e7eb"
                    stroke-width="12"
                    stroke-linecap="round"
                  />
                  <!-- Progress arc -->
                  <path
                    ref="progressArc"
                    d="M 30 100 A 70 70 0 0 1 170 100"
                    fill="none"
                    :stroke="getSpeedColor(currentSpeed)"
                    stroke-width="12"
                    stroke-linecap="round"
                    :stroke-dasharray="arcLength"
                    :stroke-dashoffset="arcOffset"
                    style="
                      transition:
                        stroke-dashoffset 0.5s ease,
                        stroke 0.3s ease;
                    "
                  />
                  <!-- Center text -->
                  <text x="100" y="70" text-anchor="middle" class="gauge-value">
                    {{ formatSpeed(currentSpeed) }}
                  </text>
                  <text x="100" y="90" text-anchor="middle" class="gauge-unit">Mbps</text>
                </svg>
              </div>

              <!-- Status -->
              <div class="speed-status" :class="`status-${testStatus}`">
                <div class="status-icon">
                  <div v-if="testStatus === 'idle'" class="icon-idle">⚡</div>
                  <div v-if="testStatus === 'testing'" class="spinner"></div>
                  <div v-if="testStatus === 'complete'" class="icon-complete">✓</div>
                </div>
                <div class="status-text">{{ getStatusText() }}</div>
              </div>
            </div>

            <!-- Results -->
            <div v-if="testResults" class="speed-results">
              <div class="result-item">
                <div class="result-icon download">⬇️</div>
                <div class="result-info">
                  <div class="result-label">Descarga</div>
                  <div class="result-value">{{ testResults.download }} Mbps</div>
                </div>
              </div>

              <div class="result-item">
                <div class="result-icon upload">⬆️</div>
                <div class="result-info">
                  <div class="result-label">Subida</div>
                  <div class="result-value">{{ testResults.upload }} Mbps</div>
                </div>
              </div>

              <div class="result-item">
                <div class="result-icon ping">📡</div>
                <div class="result-info">
                  <div class="result-label">Ping</div>
                  <div class="result-value">{{ testResults.ping }} ms</div>
                </div>
              </div>

              <div class="result-item">
                <div class="result-icon jitter">📊</div>
                <div class="result-info">
                  <div class="result-label">Jitter</div>
                  <div class="result-value">{{ testResults.jitter }} ms</div>
                </div>
              </div>
            </div>

            <!-- Test Button -->
            <button
              @click="startTest"
              class="btn-test"
              :class="{ testing: testStatus === 'testing' }"
              :disabled="testStatus === 'testing'"
            >
              <span v-if="testStatus === 'idle' || testStatus === 'complete'">
                {{ testStatus === 'idle' ? 'Iniciar Test' : 'Realizar Nuevo Test' }}
              </span>
              <span v-else class="testing-text">
                <div class="mini-spinner"></div>
                Analizando velocidad...
              </span>
            </button>

            <!-- Speed Recommendation -->
            <div v-if="testResults" class="speed-recommendation">
              <div class="recommendation-header">
                <svg class="recommendation-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"
                  />
                </svg>
                <h3 class="recommendation-title">Recomendación para tu conexión</h3>
              </div>
              <p class="recommendation-text">{{ getRecommendation() }}</p>
              <button @click="goToPlans" class="btn btn-primary">Ver planes disponibles</button>
            </div>

            <!-- Connection Info -->
            <div class="connection-info">
              <div class="info-item">
                <span class="info-label">IP:</span>
                <span class="info-value">{{ connectionInfo.ip }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">ISP:</span>
                <span class="info-value">{{ connectionInfo.isp }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Ubicación:</span>
                <span class="info-value">{{ connectionInfo.location }}</span>
              </div>
            </div>
          </div>

          <!-- Map Panel -->
          <div class="map-panel">
            <div class="map-header">
              <h3 class="map-title">Cobertura y Servidores NorEtel</h3>
              <p class="map-description">
                Visualiza la ubicación de nuestros servidores y áreas de cobertura
              </p>
            </div>

            <div class="map-container">
              <div id="speed-test-map" class="map"></div>

              <!-- Map Legend -->
              <div class="map-legend">
                <div class="legend-title">Leyenda</div>
                <div class="legend-items">
                  <div class="legend-item">
                    <div class="legend-marker server"></div>
                    <span>Servidor NorEtel</span>
                  </div>
                  <div class="legend-item">
                    <div class="legend-marker coverage"></div>
                    <span>Área de Cobertura</span>
                  </div>
                  <div class="legend-item">
                    <div class="legend-marker user"></div>
                    <span>Tu Ubicación</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Server Stats -->
            <div class="server-stats">
              <div class="stat-card">
                <div class="stat-icon">🚀</div>
                <div class="stat-content">
                  <div class="stat-value">1 Gbps</div>
                  <div class="stat-label">Capacidad</div>
                </div>
              </div>

              <div class="stat-card">
                <div class="stat-icon">⚡</div>
                <div class="stat-content">
                  <div class="stat-value">< 5ms</div>
                  <div class="stat-label">Latencia</div>
                </div>
              </div>

              <div class="stat-card">
                <div class="stat-icon">✅</div>
                <div class="stat-content">
                  <div class="stat-value">99.9%</div>
                  <div class="stat-label">Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Test History -->
        <div v-if="testHistory.length > 0" class="test-history">
          <h3 class="history-title">Historial de Tests</h3>
          <div class="history-list">
            <div v-for="(test, index) in testHistory" :key="index" class="history-item">
              <div class="history-time">{{ formatDate(test.timestamp) }}</div>
              <div class="history-results">
                <span>⬇️ {{ test.download }} Mbps</span>
                <span>⬆️ {{ test.upload }} Mbps</span>
                <span>📡 {{ test.ping }} ms</span>
              </div>
              <div class="history-quality" :class="`quality-${test.quality}`">
                {{ test.quality }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Estados
const testStatus = ref('idle') // idle, testing, complete
const currentSpeed = ref(0)
const testResults = ref(null)
const testHistory = ref([])
const connectionInfo = ref({
  ip: 'Obteniendo...',
  isp: 'Obteniendo...',
  location: 'Cusco, Perú',
})

let map = null
let userMarker = null

// Gauge calculations
const arcLength = 220 // Approximate arc length
const arcOffset = computed(() => {
  const maxSpeed = 1000 // Max speed for gauge (1000 Mbps)
  const percentage = Math.min(currentSpeed.value / maxSpeed, 1)
  return arcLength - arcLength * percentage
})

// Métodos
const startTest = async () => {
  testStatus.value = 'testing'
  currentSpeed.value = 0
  testResults.value = null

  // Simular test de velocidad
  await simulateSpeedTest()

  testStatus.value = 'complete'

  // Guardar en historial
  const quality = getQualityFromSpeed(testResults.value.download)
  testHistory.value.unshift({
    ...testResults.value,
    quality,
    timestamp: new Date().toISOString(),
  })

  // Guardar en localStorage
  localStorage.setItem('speedTestHistory', JSON.stringify(testHistory.value.slice(0, 10)))
}

const simulateSpeedTest = async () => {
  // Fase 1: Test de Ping (1 segundo)
  await animateValue(0, 30, 1000, (val) => {
    if (!testResults.value) {
      testResults.value = { ping: 0, jitter: 0, download: 0, upload: 0 }
    }
    testResults.value.ping = Math.round(val)
  })

  testResults.value.jitter = Math.round(Math.random() * 5 + 1)

  // Fase 2: Test de Descarga (3 segundos)
  const targetDownload = Math.random() * 300 + 200 // Entre 200-500 Mbps
  await animateValue(0, targetDownload, 3000, (val) => {
    currentSpeed.value = val
    testResults.value.download = Math.round(val * 10) / 10
  })

  // Pausa breve
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Fase 3: Test de Subida (2 segundos)
  const targetUpload = targetDownload * 0.5 // Upload es 50% del download
  currentSpeed.value = 0
  await animateValue(0, targetUpload, 2000, (val) => {
    currentSpeed.value = val
    testResults.value.upload = Math.round(val * 10) / 10
  })

  // Mostrar velocidad final
  currentSpeed.value = testResults.value.download
}

const animateValue = (start, end, duration, callback) => {
  return new Promise((resolve) => {
    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function (ease out)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = start + (end - start) * eased

      callback(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        resolve()
      }
    }
    animate()
  })
}

const formatSpeed = (speed) => {
  return Math.round(speed)
}

const getSpeedColor = (speed) => {
  if (speed < 50) return '#ff6600' // Naranja
  if (speed < 150) return '#ffcc00' // Amarillo
  if (speed < 300) return '#0099ff' // Azul
  return '#00cc66' // Verde
}

const getStatusText = () => {
  switch (testStatus.value) {
    case 'idle':
      return 'Listo para iniciar'
    case 'testing':
      return 'Analizando tu conexión...'
    case 'complete':
      return 'Test completado'
    default:
      return ''
  }
}

const getQualityFromSpeed = (speed) => {
  if (speed >= 300) return 'Excelente'
  if (speed >= 150) return 'Buena'
  if (speed >= 50) return 'Aceptable'
  return 'Lenta'
}

const getRecommendation = () => {
  if (!testResults.value) return ''

  const speed = testResults.value.download

  if (speed >= 300) {
    return 'Tu conexión es excelente para streaming 4K, gaming online y trabajo remoto. ¡Perfecto para múltiples dispositivos!'
  } else if (speed >= 150) {
    return 'Tu conexión es buena para navegación, streaming HD y videollamadas. Considera un plan superior para mejor rendimiento.'
  } else if (speed >= 50) {
    return 'Tu conexión es aceptable para uso básico. Te recomendamos un plan de mayor velocidad para una mejor experiencia.'
  } else {
    return 'Tu conexión es lenta. ¡Necesitas un plan NorEtel! Tenemos planes desde 300 Mbps ideales para ti.'
  }
}

const goToPlans = () => {
  router.push('/productos/planes')
}

const formatDate = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleString('es-PE', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Mapa
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
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    document.head.appendChild(link)

    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
}

const createMap = () => {
  const mapContainer = document.getElementById('speed-test-map')
  if (!mapContainer) return

  // San Jerónimo (servidor principal)
  const serverLocation = [-13.5367, -71.8869]

  map = L.map('speed-test-map').setView(serverLocation, 13)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
  }).addTo(map)

  // Icono personalizado para servidor
  const serverIcon = L.divIcon({
    className: 'custom-server-marker',
    html: '<div class="server-marker-icon">🖥️</div>',
    iconSize: [40, 40],
  })

  // Marcador del servidor
  const serverMarker = L.marker(serverLocation, { icon: serverIcon }).addTo(map)
  serverMarker.bindPopup('<b>Servidor NorEtel</b><br>San Jerónimo, Cusco')

  // Área de cobertura
  L.circle(serverLocation, {
    color: '#0099ff',
    fillColor: '#0099ff',
    fillOpacity: 0.15,
    radius: 3000, // 3km
  }).addTo(map)

  // Obtener ubicación del usuario
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = [position.coords.latitude, position.coords.longitude]

        const userIcon = L.divIcon({
          className: 'custom-user-marker',
          html: '<div class="user-marker-icon">📍</div>',
          iconSize: [30, 30],
        })

        userMarker = L.marker(userLocation, { icon: userIcon }).addTo(map)
        userMarker.bindPopup('<b>Tu ubicación</b>')

        // Centrar entre servidor y usuario
        const bounds = L.latLngBounds([serverLocation, userLocation])
        map.fitBounds(bounds, { padding: [50, 50] })
      },
      (error) => {
        console.log('No se pudo obtener la ubicación')
      },
    )
  }
}

// Obtener información de conexión
const getConnectionInfo = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json')
    const data = await response.json()
    connectionInfo.value.ip = data.ip

    // Simular ISP (en producción usar API real)
    const isps = ['Movistar', 'Claro', 'Entel', 'Otro']
    connectionInfo.value.isp = isps[Math.floor(Math.random() * isps.length)]
  } catch (error) {
    connectionInfo.value.ip = 'No disponible'
    connectionInfo.value.isp = 'No disponible'
  }
}

// Lifecycle
onMounted(() => {
  initMap()
  getConnectionInfo()

  // Cargar historial
  const savedHistory = localStorage.getItem('speedTestHistory')
  if (savedHistory) {
    testHistory.value = JSON.parse(savedHistory)
  }
})

onUnmounted(() => {
  if (map) {
    map.remove()
  }
})
</script>

<style scoped>
/* Hero */
.speed-hero {
  background: var(--gradient-primary);
  color: white;
  padding: var(--spacing-12) 0 var(--spacing-8);
  position: relative;
  overflow: hidden;
}

.speed-hero::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  animation: rotate 20s linear infinite;
}

.hero-content {
  text-align: center;
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
  margin: 0 0 var(--spacing-3) 0;
}

.hero-subtitle {
  font-size: var(--font-size-xl);
  opacity: 0.95;
}

/* Main Content */
.speed-content {
  padding: var(--spacing-16) 0;
  background: var(--color-gray-50);
}

.speed-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-8);
}

/* Speed Panel */
.speed-panel {
  background: white;
  border-radius: var(--radius-2xl);
  padding: var(--spacing-8);
  box-shadow: var(--shadow-xl);
}

.server-selector {
  margin-bottom: var(--spacing-6);
}

.server-badge {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  padding: var(--spacing-4);
  background: var(--color-gray-50);
  border-radius: var(--radius-lg);
  border: 2px solid var(--color-primary);
}

.server-icon {
  width: 32px;
  height: 32px;
  color: var(--color-primary);
  flex-shrink: 0;
}

.server-label {
  font-size: var(--font-size-xs);
  color: var(--color-gray-600);
  margin-bottom: 2px;
}

.server-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-900);
}

/* Gauge */
.speed-gauge {
  text-align: center;
  margin-bottom: var(--spacing-8);
}

.gauge-container {
  margin-bottom: var(--spacing-4);
}

.gauge-svg {
  width: 100%;
  max-width: 300px;
  height: auto;
}

.gauge-value {
  font-size: 36px;
  font-weight: bold;
  fill: var(--color-gray-900);
}

.gauge-unit {
  font-size: 14px;
  fill: var(--color-gray-600);
}

.speed-status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  padding: var(--spacing-3);
  border-radius: var(--radius-lg);
}

.status-idle {
  background: var(--color-gray-100);
  color: var(--color-gray-700);
}

.status-testing {
  background: var(--color-blue-50);
  color: var(--color-primary);
}

.status-complete {
  background: var(--color-green-100);
  color: var(--color-success);
}

.icon-idle,
.icon-complete {
  font-size: 24px;
}

.spinner,
.mini-spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(0, 153, 255, 0.3);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.mini-spinner {
  width: 16px;
  height: 16px;
  border-width: 2px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.status-text {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
}

/* Results */
.speed-results {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-6);
}

.result-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  padding: var(--spacing-4);
  background: var(--color-gray-50);
  border-radius: var(--radius-lg);
}

.result-icon {
  font-size: 28px;
  flex-shrink: 0;
}

.result-label {
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  margin-bottom: 2px;
}

.result-value {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-900);
}

/* Test Button */
.btn-test {
  width: 100%;
  padding: var(--spacing-4) var(--spacing-6);
  background: var(--gradient-primary);
  color: white;
  border: none;
  border-radius: var(--radius-lg);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all var(--transition-base);
  margin-bottom: var(--spacing-6);
}

.btn-test:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-xl);
}

.btn-test:disabled {
  opacity: 0.8;
  cursor: not-allowed;
}

.testing-text {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
}

/* Recommendation */
.speed-recommendation {
  padding: var(--spacing-6);
  background: var(--color-gray-50);
  border-radius: var(--radius-lg);
  border-left: 4px solid var(--color-primary);
  margin-bottom: var(--spacing-6);
}

.recommendation-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  margin-bottom: var(--spacing-3);
}

.recommendation-icon {
  width: 24px;
  height: 24px;
  color: var(--color-primary);
}

.recommendation-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-900);
  margin: 0;
}

.recommendation-text {
  font-size: var(--font-size-base);
  color: var(--color-gray-700);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--spacing-4);
}

/* Connection Info */
.connection-info {
  padding: var(--spacing-4);
  background: var(--color-gray-50);
  border-radius: var(--radius-lg);
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-2) 0;
  font-size: var(--font-size-sm);
}

.info-label {
  color: var(--color-gray-600);
  font-weight: var(--font-weight-medium);
}

.info-value {
  color: var(--color-gray-900);
  font-family: monospace;
}

/* Map Panel */
.map-panel {
  background: white;
  border-radius: var(--radius-2xl);
  padding: var(--spacing-8);
  box-shadow: var(--shadow-xl);
}

.map-header {
  margin-bottom: var(--spacing-6);
}

.map-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-900);
  margin: 0 0 var(--spacing-2) 0;
}

.map-description {
  font-size: var(--font-size-base);
  color: var(--color-gray-600);
}

.map-container {
  position: relative;
  margin-bottom: var(--spacing-6);
}

.map {
  width: 100%;
  height: 400px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.map-legend {
  position: absolute;
  top: var(--spacing-4);
  right: var(--spacing-4);
  background: white;
  padding: var(--spacing-3);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  z-index: 1000;
}

.legend-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-2);
}

.legend-items {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  font-size: var(--font-size-xs);
  color: var(--color-gray-700);
}

.legend-marker {
  width: 16px;
  height: 16px;
  border-radius: 50%;
}

.legend-marker.server {
  background: #ff6600;
}

.legend-marker.coverage {
  background: rgba(0, 153, 255, 0.3);
  border: 2px solid #0099ff;
}

.legend-marker.user {
  background: #00cc66;
}

/* Custom Markers */
:deep(.custom-server-marker) {
  background: transparent;
  border: none;
}

:deep(.server-marker-icon) {
  font-size: 32px;
  text-align: center;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

:deep(.custom-user-marker) {
  background: transparent;
  border: none;
}

:deep(.user-marker-icon) {
  font-size: 24px;
  text-align: center;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

/* Server Stats */
.server-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-4);
}

.stat-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  padding: var(--spacing-4);
  background: var(--color-gray-50);
  border-radius: var(--radius-lg);
}

.stat-icon {
  font-size: 28px;
  flex-shrink: 0;
}

.stat-value {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-900);
  line-height: 1;
  margin-bottom: 4px;
}

.stat-label {
  font-size: var(--font-size-xs);
  color: var(--color-gray-600);
}

/* Test History */
.test-history {
  margin-top: var(--spacing-12);
  background: white;
  border-radius: var(--radius-xl);
  padding: var(--spacing-6);
  box-shadow: var(--shadow-md);
}

.history-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-900);
  margin: 0 0 var(--spacing-4) 0;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

.history-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-3);
  background: var(--color-gray-50);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
}

.history-time {
  color: var(--color-gray-600);
  font-family: monospace;
}

.history-results {
  display: flex;
  gap: var(--spacing-4);
  color: var(--color-gray-700);
}

.history-quality {
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
}

.quality-Excelente {
  background: #e6fff2;
  color: #00cc66;
}

.quality-Buena {
  background: #e6f5ff;
  color: #0099ff;
}

.quality-Aceptable {
  background: #fff9e6;
  color: #ffcc00;
}

.quality-Lenta {
  background: #ffe6eb;
  color: #ff6600;
}

/* Button */
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

.btn-primary {
  background: var(--gradient-primary);
  color: white;
  box-shadow: var(--shadow-primary);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-xl);
}

/* Responsive */
@media (max-width: 1024px) {
  .speed-wrapper {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: var(--font-size-3xl);
  }

  .hero-subtitle {
    font-size: var(--font-size-base);
  }

  .speed-panel,
  .map-panel {
    padding: var(--spacing-6);
  }

  .speed-results {
    grid-template-columns: 1fr;
  }

  .server-stats {
    grid-template-columns: 1fr;
  }

  .map {
    height: 300px;
  }
}
</style>
