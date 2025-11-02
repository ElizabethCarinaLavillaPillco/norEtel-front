<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MyNavbar from '../components/common/MyNavbar.vue'
import MyFooter from '../components/common/MyFooter.vue'

const route = useRoute()
const router = useRouter()

// Estado reactivo para los datos del plan
const planData = ref(null)
const loading = ref(true)
const error = ref(null)

// Obtener los datos del plan al montar el componente
onMounted(() => {
  try {
    // Opción 1: Obtener datos desde query params
    if (route.query.planData) {
      planData.value = JSON.parse(route.query.planData)
    }
    // Opción 2: Obtener datos desde state (si se usó)
    else if (history.state && history.state.planData) {
      planData.value = history.state.planData
    }
    // Opción 3: Fallback - buscar por ID en una base de datos simulada
    else if (route.params.id) {
      // Aquí podrías hacer una llamada a API para obtener los datos por ID
      console.log('Buscando plan con ID:', route.params.id)
      // Por ahora, mostraremos un error
      error.value = 'Plan no encontrado'
    }

    loading.value = false
  } catch (err) {
    console.error('Error al cargar datos del plan:', err)
    error.value = 'Error al cargar los datos del plan'
    loading.value = false
  }
})

// Computadas para formatear datos
const formattedPrice = computed(() => {
  if (!planData.value) return ''
  const currency = planData.value.currency || 'S/'
  return `${currency}${planData.value.price}`
})

const speedInfo = computed(() => {
  if (!planData.value) return null

  if (planData.value.type === 'service') {
    return {
      main: `${planData.value.speed} Mbps`,
      download: `${planData.value.downloadSpeed} Mbps`,
      upload: `${planData.value.uploadSpeed} Mbps`,
    }
  } else {
    return {
      main: `${planData.value.speed} ${planData.value.speedUnit || 'Mbps'}`,
      description: planData.value.speedDescription,
    }
  }
})

// Funciones
const goBack = () => {
  router.go(-1) // Volver a la página anterior
}

const contractPlan = () => {
  // Aquí implementarías la lógica de contratación
  alert(`Iniciando proceso de contratación para: ${planData.value.title}`)
  console.log('Contratar plan:', planData.value)
}

const sharePlan = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: planData.value.title,
        text: `Revisa este plan: ${planData.value.title} - ${formattedPrice.value}/mes`,
        url: window.location.href,
      })
    } catch (err) {
      console.log('Error al compartir:', err)
    }
  } else {
    // Fallback: copiar URL al portapapeles
    navigator.clipboard.writeText(window.location.href)
    alert('Enlace copiado al portapapeles')
  }
}
</script>

<template>
  <div class="app-container">
    <MyNavbar class="navbar" />

    <main class="main-content">
      <!-- Loading State -->
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>Cargando detalles del plan...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-container">
        <div class="error-content">
          <h2>❌ {{ error }}</h2>
          <p>No pudimos cargar los detalles del plan solicitado.</p>
          <button @click="goBack" class="btn-secondary">← Volver atrás</button>
        </div>
      </div>

      <!-- Plan Details -->
      <div v-else-if="planData" class="details-container">
        <!-- Header con navegación -->
        <div class="details-header">
          <button @click="goBack" class="back-btn">← Volver a planes</button>
          <button @click="sharePlan" class="share-btn">🔗 Compartir</button>
        </div>

        <!-- Contenido principal -->
        <div class="details-content">
          <!-- Hero Section -->
          <section class="hero-section">
            <div class="hero-content">
              <div class="plan-badge" :class="planData.category?.toLowerCase()">
                {{ planData.category || 'Plan' }}
              </div>
              <h1 class="plan-title">{{ planData.title }}</h1>
              <p class="plan-description">
                {{ planData.description || 'Plan de internet de alta calidad' }}
              </p>

              <div class="price-section">
                <span class="price-main">{{ formattedPrice }}</span>
                <span class="price-period">/{{ planData.period || 'mes' }}</span>
              </div>

              <button @click="contractPlan" class="btn-primary-large">
                {{ planData.buttonText || 'Contratar Ahora' }}
              </button>
            </div>

            <div class="hero-visual">
              <div class="speed-circle">
                <div class="speed-number">{{ planData.speed }}</div>
                <div class="speed-unit">{{ planData.speedUnit || 'Mbps' }}</div>
              </div>
            </div>
          </section>

          <!-- Características principales -->
          <section class="features-section">
            <h2>Características principales</h2>
            <div class="features-grid">
              <!-- Velocidad -->
              <div class="feature-card">
                <div class="feature-icon">🚀</div>
                <div class="feature-content">
                  <h3>Velocidad</h3>
                  <div v-if="speedInfo">
                    <p class="feature-main">{{ speedInfo.main }}</p>
                    <p v-if="speedInfo.download" class="feature-detail">
                      Descarga: {{ speedInfo.download }}
                    </p>
                    <p v-if="speedInfo.upload" class="feature-detail">
                      Subida: {{ speedInfo.upload }}
                    </p>
                    <p v-if="speedInfo.description" class="feature-detail">
                      {{ speedInfo.description }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Precio -->
              <div class="feature-card">
                <div class="feature-icon">💰</div>
                <div class="feature-content">
                  <h3>Precio</h3>
                  <p class="feature-main">{{ formattedPrice }}</p>
                  <p class="feature-detail">Pago {{ planData.period || 'mensual' }}</p>
                </div>
              </div>

              <!-- Servicios -->
              <div class="feature-card" v-if="planData.services && planData.services.length > 0">
                <div class="feature-icon">📡</div>
                <div class="feature-content">
                  <h3>Servicios incluidos</h3>
                  <div class="services-list">
                    <span v-for="service in planData.services" :key="service" class="service-tag">
                      {{ formatServiceName(service) }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Categoría -->
              <div class="feature-card">
                <div class="feature-icon">🏷️</div>
                <div class="feature-content">
                  <h3>Categoría</h3>
                  <p class="feature-main">{{ planData.category || 'General' }}</p>
                  <p class="feature-detail">{{ getPlanTypeDescription(planData.type) }}</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Detalles técnicos -->
          <section class="technical-section" v-if="planData.technicalDetails || planData.features">
            <h2>{{ planData.technicalTitle || 'Detalles técnicos' }}</h2>
            <div class="technical-grid">
              <!-- Detalles técnicos -->
              <div class="technical-card" v-if="planData.technicalDetails">
                <h3>Especificaciones</h3>
                <ul class="technical-list">
                  <li v-for="detail in planData.technicalDetails" :key="detail">✅ {{ detail }}</li>
                </ul>
              </div>

              <!-- Características adicionales -->
              <div class="technical-card" v-if="planData.features">
                <h3>Incluye</h3>
                <ul class="technical-list">
                  <li v-for="feature in planData.features" :key="feature">⭐ {{ feature }}</li>
                </ul>
              </div>
            </div>
          </section>

          <!-- Call to Action final -->
          <section class="cta-section">
            <div class="cta-content">
              <h2>¿Listo para contratar?</h2>
              <p>No esperes más y disfruta de la mejor conectividad</p>
              <div class="cta-buttons">
                <button @click="contractPlan" class="btn-primary-large">
                  Contratar {{ planData.title }}
                </button>
                <button @click="goBack" class="btn-secondary-large">Ver más planes</button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>

    <MyFooter class="footer" />
  </div>
</template>

<script>
// Métodos adicionales para formatear datos
export default {
  methods: {
    formatServiceName(service) {
      const serviceNames = {
        'internet-fijo': 'Internet Fijo',
        'internet-claro-tv': 'Internet + Claro TV',
        'internet-telefonia': 'Internet + Telefonía',
        'internet-claro-telefonia': 'Internet + TV + Telefonía',
      }
      return serviceNames[service] || service
    },

    getPlanTypeDescription(type) {
      const descriptions = {
        service: 'Plan estándar',
        serviceTwo: 'Plan premium',
      }
      return descriptions[type] || 'Plan personalizado'
    },
  },
}
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f8f9fa;
}

.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
}

.main-content {
  flex: 1;
  padding: 20px;
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Error State */
.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.error-content {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

/* Details Container */
.details-container {
  max-width: 1200px;
  margin: 0 auto;
  animation: fadeInUp 0.6s ease-out;
}

/* Header */
.details-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 0 20px;
}

.back-btn,
.share-btn {
  padding: 12px 24px;
  border: 2px solid #007bff;
  background: white;
  color: #007bff;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
}

.back-btn:hover,
.share-btn:hover {
  background: #007bff;
  color: white;
  transform: translateY(-2px);
}

/* Hero Section */
.hero-section {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 50px;
  align-items: center;
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
  color: white;
  padding: 60px;
  border-radius: 20px;
  margin-bottom: 40px;
  box-shadow: 0 10px 40px rgba(0, 123, 255, 0.3);
}

.hero-content {
  animation: slideInLeft 0.8s ease-out;
}

.plan-badge {
  display: inline-block;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 20px;
  backdrop-filter: blur(10px);
}

.plan-badge.residencial {
  background: rgba(76, 175, 80, 0.3);
}
.plan-badge.premium {
  background: rgba(255, 193, 7, 0.3);
}
.plan-badge.empresarial {
  background: rgba(156, 39, 176, 0.3);
}
.plan-badge.combo {
  background: rgba(255, 152, 0, 0.3);
}

.plan-title {
  font-size: 48px;
  font-weight: 800;
  margin: 0 0 20px 0;
  line-height: 1.2;
}

.plan-description {
  font-size: 20px;
  margin: 0 0 30px 0;
  opacity: 0.9;
  line-height: 1.5;
}

.price-section {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 40px;
}

.price-main {
  font-size: 56px;
  font-weight: 900;
}

.price-period {
  font-size: 24px;
  opacity: 0.8;
}

.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
  animation: slideInRight 0.8s ease-out;
}

.speed-circle {
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.1);
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(20px);
  animation: pulse 3s infinite;
}

.speed-number {
  font-size: 48px;
  font-weight: 900;
}

.speed-unit {
  font-size: 18px;
  opacity: 0.8;
}

/* Features Section */
.features-section {
  margin-bottom: 50px;
}

.features-section h2 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
  color: #333;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
}

.feature-card {
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 123, 255, 0.15);
  border-color: #007bff;
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.feature-content h3 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 15px;
  color: #333;
}

.feature-main {
  font-size: 24px;
  font-weight: 700;
  color: #007bff;
  margin-bottom: 8px;
}

.feature-detail {
  color: #666;
  margin-bottom: 5px;
}

.services-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.service-tag {
  background: #e3f2fd;
  color: #1976d2;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
}

/* Technical Section */
.technical-section {
  margin-bottom: 50px;
}

.technical-section h2 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
  color: #333;
}

.technical-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
}

.technical-card {
  background: white;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
}

.technical-card h3 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #333;
}

.technical-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.technical-list li {
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  font-size: 16px;
  line-height: 1.5;
}

.technical-list li:last-child {
  border-bottom: none;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 60px;
  border-radius: 20px;
  text-align: center;
  margin-bottom: 40px;
}

.cta-content h2 {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 15px;
  color: #333;
}

.cta-content p {
  font-size: 20px;
  color: #666;
  margin-bottom: 40px;
}

.cta-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

/* Buttons */
.btn-primary-large {
  padding: 18px 40px;
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 20px rgba(0, 123, 255, 0.3);
  text-decoration: none;
  display: inline-block;
}

.btn-primary-large:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0, 123, 255, 0.4);
}

.btn-secondary-large {
  padding: 18px 40px;
  background: white;
  color: #007bff;
  border: 2px solid #007bff;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.btn-secondary-large:hover {
  background: #007bff;
  color: white;
  transform: translateY(-3px);
}

.btn-secondary {
  padding: 12px 24px;
  background: white;
  color: #007bff;
  border: 2px solid #007bff;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.btn-secondary:hover {
  background: #007bff;
  color: white;
  transform: translateY(-2px);
}

.footer {
  margin-top: auto;
}

/* Responsive */
@media (max-width: 992px) {
  .hero-section {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 40px;
  }

  .plan-title {
    font-size: 36px;
  }

  .price-main {
    font-size: 42px;
  }

  .features-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  .technical-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding: 15px;
  }

  .details-header {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }

  .hero-section {
    padding: 30px 20px;
  }

  .plan-title {
    font-size: 28px;
  }

  .price-main {
    font-size: 36px;
  }

  .speed-circle {
    width: 150px;
    height: 150px;
  }

  .speed-number {
    font-size: 36px;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .btn-primary-large,
  .btn-secondary-large {
    width: 100%;
    max-width: 300px;
  }
}

/* Animations */
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

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
  }
  50% {
    transform: scale(1.05);
  }
  70% {
    box-shadow: 0 0 0 20px rgba(255, 255, 255, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
}
</style>
