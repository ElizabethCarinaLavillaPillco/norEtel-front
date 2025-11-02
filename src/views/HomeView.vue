<template>
  <div class="home-view">
    <!-- Hero Carousel -->
    <HeroCarousel />

    <!-- Búsqueda Rápida -->
    <section class="quick-actions-section">
      <div class="container">
        <div class="quick-actions-grid">
          <button
            v-for="action in quickActions"
            :key="action.id"
            @click="navigateTo(action.route)"
            class="quick-action-btn"
          >
            <div class="action-icon">{{ action.icon }}</div>
            <div class="action-text">{{ action.text }}</div>
          </button>
        </div>
      </div>
    </section>

    <!-- Ofertas Cards -->
    <section class="offers-section">
      <div class="container">
        <h2 class="section-title">¡Ofertas exclusivas web!</h2>
        <div class="offers-grid">
          <div v-for="offer in offers" :key="offer.id" class="offer-card">
            <div class="offer-badge" v-if="offer.badge">{{ offer.badge }}</div>
            <div class="offer-price">
              <span class="currency">S/</span>
              <span class="amount">{{ offer.price }}</span>
              <span class="period">/mes</span>
            </div>
            <div class="offer-condition">{{ offer.condition }}</div>
            <div class="offer-speed">
              <div class="speed-old">{{ offer.oldSpeed }}</div>
              <div class="speed-current">{{ offer.currentSpeed }}</div>
              <div class="speed-duration">{{ offer.duration }}</div>
            </div>
            <div class="offer-details">
              <h3 class="offer-title">{{ offer.title }}</h3>
              <div class="offer-includes">
                <div class="includes-title">Incluye:</div>
                <ul class="includes-list">
                  <li v-for="(item, index) in offer.includes" :key="index">
                    <svg class="check-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="offer-actions">
              <ButtonPrimary class="offer-btn-primary">Lo quiero</ButtonPrimary>
              <ButtonOutline class="offer-btn">Más info</ButtonOutline>
              <ButtonOutline class="offer-btn">Contactarme con un asesor</ButtonOutline>
            </div>
          </div>
        </div>

        <!-- Botones de Categorías -->
        <div class="category-buttons">
          <ButtonPrimary class="category-btn">Ver más planes</ButtonPrimary>
          <ButtonOutline class="category-btn">Individuales</ButtonOutline>
          <ButtonOutline class="category-btn">Familiares</ButtonOutline>
          <ButtonOutline class="category-btn">Empresariales</ButtonOutline>
        </div>
      </div>
    </section>

    <!-- Banner Configura tu Tarifa -->
    <section class="custom-plan-section">
      <div class="container">
        <div class="custom-plan-banner">
          <div class="custom-plan-content">
            <h2 class="custom-plan-title">Configura tu tarifa a medida</h2>
            <p class="custom-plan-subtitle">
              Y ahora llévate fibra 1Gb <strong>¡a precio de 600Mb durante 6 meses!</strong>
            </p>
            <ButtonSecondary>Personalizar ahora</ButtonSecondary>
          </div>
          <div class="custom-plan-illustration">
            <div class="illustration-circle"></div>
            <div class="illustration-icon">⚙️</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mapa de Cobertura -->
    <section class="coverage-section">
      <div class="container">
        <div class="coverage-content">
          <div class="coverage-text">
            <h2 class="section-title">¿Llegamos a tu zona?</h2>
            <p class="section-description">
              Estamos expandiendo nuestra cobertura constantemente. Consulta si ya llegamos a tu
              zona o solicita que llevemos nuestro servicio.
            </p>
            <div class="coverage-stats">
              <div class="stat-item">
                <div class="stat-number">50+</div>
                <div class="stat-label">Zonas cubiertas</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">1000+</div>
                <div class="stat-label">Hogares conectados</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">99.9%</div>
                <div class="stat-label">Uptime garantizado</div>
              </div>
            </div>
            <ButtonPrimary>Solicita tu zona</ButtonPrimary>
          </div>
          <div class="coverage-map">
            <div class="map-placeholder">
              <img src="@/assets/images/elements/mapa.jpg" alt="Mapa de cobertura" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Plan Amigo Banner -->
    <section class="referral-section">
      <div class="container">
        <div class="referral-banner">
          <div class="referral-icon">🎁</div>
          <div class="referral-content">
            <h2 class="referral-title">Plan Amigo</h2>
            <p class="referral-text">
              Recomienda NorEtel y gana descuentos especiales. ¡Tú y tu amigo recibirán beneficios!
            </p>
            <ButtonPrimary>Conoce más</ButtonPrimary>
          </div>
          <div class="referral-illustration">
            <div class="users-icon">👥</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección "Elige lo mejor, escoge NorEtel" -->
    <section class="features-section">
      <div class="container">
        <h2 class="section-title">Elige lo mejor, escoge NorEtel</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🕒</div>
            <h3 class="feature-title">Atención 24/7</h3>
            <p class="feature-description">
              Soporte técnico especializado disponible las 24 horas del día, los 7 días de la semana
              para resolver cualquier consulta.
            </p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3 class="feature-title">Alta Velocidad</h3>
            <p class="feature-description">
              Conexión de fibra óptica ultrarrápida hasta 1000 Mbps para disfrutar streaming, gaming
              y trabajo sin interrupciones.
            </p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">⭐</div>
            <h3 class="feature-title">NorEtel Club</h3>
            <p class="feature-description">
              Accede a beneficios exclusivos, descuentos especiales y promociones únicas siendo
              parte de nuestra comunidad VIP.
            </p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">👥</div>
            <h3 class="feature-title">Plan amigo</h3>
            <p class="feature-description">
              50€ para ti y 50€ para tu amigo si contrata Fibra + Móvil. Además, si te traes a otro,
              te llevas un premio extra.
            </p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📶</div>
            <h3 class="feature-title">Tenemos la mejor Red 5G</h3>
            <p class="feature-description">
              Navegas a máxima velocidad con 5G, la mejor Red del mercado tras varios años
              consecutivos.
            </p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">💯</div>
            <h3 class="feature-title">Uneté a NorEtel</h3>
            <p class="feature-description">
              Trabaja con nosotros y ayuda a conectar a más personas con la mejor Red del mercado
              tras varios años consecutivos.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Trabaja con Nosotros -->
    <section class="careers-section">
      <div class="container">
        <div class="careers-banner">
          <h2 class="careers-title">¿Quieres formar parte de NorEtel?</h2>
          <p class="careers-subtitle">Únete a nuestro equipo y ayuda a conectar a más personas</p>
          <ButtonOutline class="careers-btn">Ver oportunidades</ButtonOutline>
        </div>
      </div>
    </section>

    <!-- Chat Widget -->
    <ChatWidget />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import HeroCarousel from '@/components/home/HeroCarousel.vue'
import ButtonPrimary from '@/components/ui/ButtonPrimary.vue'
import ButtonOutline from '@/components/ui/ButtonOutline.vue'
import ButtonSecondary from '@/components/ui/ButtonSecondary.vue'
import ChatWidget from '@/components/common/ChatWidget.vue'

const router = useRouter()

const quickActions = ref([
  { id: 1, icon: '🏠', text: 'Planes internet hogar', route: '/hogar' },
  { id: 2, icon: '⭐', text: 'Los más vendidos', route: '/productos/planes?filter=popular' },
  { id: 3, icon: '📱', text: 'Planes móviles', route: '/productos/tarifa-movil' },
  { id: 4, icon: '📍', text: 'Cotiza tu zona', route: '/herramientas/solicitar-zona' },
  { id: 5, icon: '⚡', text: 'Test de velocidad', route: '/herramientas/speed-test' },
])

const offers = ref([
  {
    id: 1,
    badge: 'Recomendado',
    price: '99.90',
    condition: 'x6 meses, después paga s/.119.90',
    oldSpeed: '500 Megas',
    currentSpeed: '1000Mbps',
    duration: 'x 12 meses',
    title: 'Fibra + Móvil 300Mb',
    includes: [
      'Internet fibra optica de 1000mbps x6 meses',
      '2 lineas moviles',
      '1 TV + 33 canales',
      'Soporte tecnico',
    ],
  },
  {
    id: 2,
    badge: 'Popular',
    price: '79.90',
    condition: 'x3 meses, después paga s/.99.90',
    oldSpeed: '300 Megas',
    currentSpeed: '600Mbps',
    duration: 'x 12 meses',
    title: 'Fibra + Móvil 200Mb',
    includes: [
      'Internet fibra optica de 600mbps x3 meses',
      '1 linea movil',
      '1 TV + 20 canales',
      'Soporte tecnico',
    ],
  },
  {
    id: 3,
    badge: 'Oferta',
    price: '59.90',
    condition: 'x12 meses sin cambios',
    oldSpeed: '200 Megas',
    currentSpeed: '400Mbps',
    duration: 'x 12 meses',
    title: 'Fibra Básica',
    includes: ['Internet fibra optica de 400mbps', 'Soporte tecnico', 'Instalación gratuita'],
  },
  {
    id: 4,
    badge: 'Negocios',
    price: '199.90',
    condition: 'x12 meses sin cambios',
    oldSpeed: '800 Megas',
    currentSpeed: '1000Mbps',
    duration: 'x 12 meses',
    title: 'Plan Empresarial',
    includes: [
      'Internet fibra optica de 1000mbps dedicada',
      '5 lineas moviles',
      'Soporte prioritario 24/7',
      'IP fija',
    ],
  },
])

const navigateTo = (route) => {
  router.push(route)
}
</script>

<style scoped>
/* Búsqueda Rápida */
.quick-actions-section {
  margin-top: calc(var(--spacing-8) * -1);
  padding: var(--spacing-8) 0;
  background: var(--color-white);
  box-shadow: var(--shadow-sm);
}

.quick-actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--spacing-3);
}

.quick-action-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-3);
  background: var(--color-gray-50);
  border: 1px solid var(--color-gray-300); /* Contorno oscuro */
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-base);
}

.quick-action-btn:hover {
  background: var(--color-blue-50);
  border-color: var(--color-blue-300); /* Contorno más oscuro al hover */
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.action-icon {
  font-size: 24px;
}

.action-text {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-800);
  text-align: left;
}

/* Ofertas Cards */
.offers-section {
  padding: var(--spacing-16) 0;
  background: var(--color-gray-50);
}

.section-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  text-align: center;
  margin: 0 0 var(--spacing-12) 0;
  color: var(--color-gray-900);
  position: relative;
  padding-bottom: var(--spacing-4);
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: var(--gradient-primary);
  border-radius: var(--radius-full);
}

.offers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-6);
  margin-bottom: var(--spacing-8);
}

.offer-card {
  position: relative;
  background: var(--color-white);
  border-radius: var(--radius-xl);
  padding: var(--spacing-6);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.offer-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--gradient-primary);
  transform: scaleX(0);
  transition: transform var(--transition-base);
}

.offer-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-2xl);
}

.offer-card:hover::before {
  transform: scaleX(1);
}

.offer-badge {
  position: absolute;
  top: var(--spacing-4);
  right: var(--spacing-4);
  padding: var(--spacing-1) var(--spacing-3);
  background: var(--gradient-accent);
  color: var(--color-white);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--radius-full);
  z-index: 1;
}

.offer-price {
  display: flex;
  align-items: baseline;
  gap: var(--spacing-1);
  margin-bottom: var(--spacing-2);
  justify-content: center;
}

.currency {
  font-size: var(--font-size-lg);
  color: var(--color-gray-600);
}

.amount {
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.period {
  font-size: var(--font-size-base);
  color: var(--color-gray-600);
}

.offer-condition {
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  text-align: center;
  margin-bottom: var(--spacing-4);
}

.offer-speed {
  text-align: center;
  margin-bottom: var(--spacing-4);
}

.speed-old {
  font-size: var(--font-size-sm);
  color: var(--color-gray-500);
  text-decoration: line-through;
}

.speed-current {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
}

.speed-duration {
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
}

.offer-details {
  margin-bottom: var(--spacing-6);
}

.offer-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  margin: 0 0 var(--spacing-4) 0;
  color: var(--color-gray-900);
  text-align: center;
}

.offer-includes {
  background: var(--color-gray-50);
  padding: var(--spacing-4);
  border-radius: var(--radius-lg);
}

.includes-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  margin: 0 0 var(--spacing-2) 0;
  color: var(--color-gray-800);
}

.includes-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.includes-list li {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-2);
  padding: var(--spacing-1) 0;
  font-size: var(--font-size-sm);
  color: var(--color-gray-700);
}

.check-icon {
  width: 16px;
  height: 16px;
  color: var(--color-success);
  flex-shrink: 0;
  margin-top: 2px;
}

.offer-actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
  margin-top: auto;
}

.offer-btn-primary {
  width: 100%;
  background: var(--gradient-secondary-reverse);
}

.category-buttons {
  display: flex;
  justify-content: center;
  gap: var(--spacing-4);
  flex-wrap: wrap;
}

.category-btn {
  min-width: 150px;
}

/* Custom Plan Section */
.custom-plan-section {
  padding: var(--spacing-16) 0;
}

.custom-plan-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-10);
  background: var(--gradient-accent);
  border-radius: var(--radius-2xl);
  color: var(--color-white);
  overflow: hidden;
  position: relative;
}

.custom-plan-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  margin: 0 0 var(--spacing-3) 0;
}

.custom-plan-subtitle {
  font-size: var(--font-size-lg);
  margin: 0 0 var(--spacing-6) 0;
  opacity: 0.95;
}

.illustration-circle {
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  position: absolute;
  right: -50px;
  top: -50px;
  animation: pulse 4s infinite ease-in-out;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.2;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.3;
  }
}

.illustration-icon {
  font-size: 80px;
  position: relative;
  z-index: 2;
}

/* Coverage Section */
.coverage-section {
  padding: var(--spacing-16) 0;
  background: var(--color-white);
}

.coverage-content {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: var(--spacing-12);
  align-items: center;
}

.section-description {
  font-size: var(--font-size-lg);
  color: var(--color-gray-600);
  margin: 0 0 var(--spacing-8) 0;
  line-height: var(--line-height-relaxed);
}

.coverage-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-6);
  margin-bottom: var(--spacing-8);
}

.stat-item {
  text-align: center;
  padding: var(--spacing-4);
  background: var(--color-gray-50);
  border-radius: var(--radius-lg);
  transition: all var(--transition-base);
}

.stat-item:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.stat-number {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: var(--spacing-2);
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
}

.map-placeholder {
  width: 100%;
  aspect-ratio: 1;
  display: grid;
  align-items: center;
  justify-content: center;
  background: var(--color-gray-50);
  border-radius: var(--radius-2xl);
  overflow: hidden;
  position: relative;
}

.map-placeholder::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--gradient-primary);
  opacity: 0.05;
}

.map-placeholder img {
  width: 100%;
  height: auto;
}

/* Referral Section */
.referral-section {
  padding: var(--spacing-16) 0;
}

.referral-banner {
  display: flex;
  align-items: center;
  gap: var(--spacing-8);
  padding: var(--spacing-12);
  background: var(--gradient-hero-reverse);
  border-radius: var(--radius-2xl);
  color: var(--color-white);
  position: relative;
  overflow: hidden;
}

.referral-banner::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%);
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

.referral-icon {
  font-size: 80px;
  position: relative;
  z-index: 1;
}

.referral-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  margin: 0 0 var(--spacing-3) 0;
  position: relative;
  z-index: 1;
}

.referral-text {
  font-size: var(--font-size-lg);
  margin: 0 0 var(--spacing-6) 0;
  opacity: 0.95;
  position: relative;
  z-index: 1;
}

.users-icon {
  font-size: 120px;
  opacity: 0.2;
  position: relative;
  z-index: 1;
}

/* Features Section */
.features-section {
  padding: var(--spacing-16) 0;
  background: var(--color-gray-50);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-6);
}

.feature-card {
  background: var(--color-white);
  border-radius: var(--radius-xl);
  padding: var(--spacing-6);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.feature-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-xl);
}

.feature-icon {
  font-size: 48px;
  margin-bottom: var(--spacing-4);
}

.feature-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  margin: 0 0 var(--spacing-3) 0;
  color: var(--color-gray-900);
}

.feature-description {
  font-size: var(--font-size-base);
  color: var(--color-gray-600);
  line-height: var(--line-height-relaxed);
}

/* Careers Section */
.careers-section {
  padding: var(--spacing-16) 0;
}

.careers-banner {
  text-align: center;
  padding: var(--spacing-12) var(--spacing-8);
  background: var(--gradient-tropical);
  border-radius: var(--radius-xl);
  color: var(--color-white);
  position: relative;
  overflow: hidden;
}

.careers-banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="none"/><circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2"/><circle cx="50" cy="50" r="30" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2"/><circle cx="50" cy="50" r="20" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2"/></svg>');
  background-size: 100px 100px;
  opacity: 0.1;
  animation: rotate 30s linear infinite reverse;
}

.careers-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  margin: 0 0 var(--spacing-4) 0;
  position: relative;
  z-index: 1;
}

.careers-subtitle {
  font-size: var(--font-size-lg);
  margin: 0 0 var(--spacing-6) 0;
  opacity: 0.95;
  position: relative;
  z-index: 1;
}

.careers-btn {
  position: relative;
  z-index: 1;
  background: var(--gradient-primary);
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-full);
  padding: var(--spacing-3) var(--spacing-6);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all var(--transition-base);
  margin-top: var(--spacing-4);
  align-items: center;
  justify-content: center;
}

/* Responsive */
@media (max-width: 1024px) {
  .coverage-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-8);
  }

  .referral-banner {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: var(--font-size-3xl);
  }

  .quick-actions-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }

  .custom-plan-banner,
  .referral-banner {
    flex-direction: column;
    text-align: center;
  }

  .offers-grid,
  .features-grid {
    grid-template-columns: 1fr;
  }

  .coverage-stats {
    grid-template-columns: 1fr;
  }

  .category-buttons {
    flex-direction: column;
    align-items: center;
  }

  .category-btn {
    width: 100%;
    max-width: 300px;
  }
}
</style>
