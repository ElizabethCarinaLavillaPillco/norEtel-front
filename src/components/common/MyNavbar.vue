<template>
  <div class="navbar-container">
    <!-- Navbar Superior -->
    <nav class="navbar-top">
      <div class="container">
        <div class="navbar-top-content">
          <!-- Selector de Segmentos -->
          <div class="segment-selector">
            <button
              v-for="segment in segments"
              :key="segment.id"
              :class="['segment-btn', { active: activeSegment === segment.id }]"
              @click="activeSegment = segment.id"
            >
              {{ segment.name }}
            </button>
          </div>

          <!-- Información de Contacto -->
          <div class="contact-info">
            <ButtonPrimary size="sm" class="contact-btn">
              <svg class="contact-icon" viewBox="0 0 20 20" fill="currentColor">
                <path
                  d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                />
              </svg>
              Línea fija: (084) 98313
            </ButtonPrimary>
            <ButtonPrimary size="sm" class="contact-btn">
              <svg class="contact-icon" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                  clip-rule="evenodd"
                />
              </svg>
              WhatsApp: +51 98989845
            </ButtonPrimary>
          </div>
        </div>
      </div>
    </nav>

    <!-- Navbar Principal -->
    <nav class="navbar" :class="{ 'navbar-scrolled': isScrolled }">
      <div class="container">
        <div class="navbar-content">
          <!-- Logo -->
          <router-link to="/" class="navbar-logo">
            <img src="@/assets/logo.png" alt="NorEtel" class="logo-img" />
            <span class="logo-text">NorEtel</span>
          </router-link>

          <!-- Buscador -->
          <div class="navbar-search">
            <div class="search-container">
              <input
                type="text"
                placeholder="Buscar planes, servicios..."
                class="search-input"
                v-model="searchQuery"
              />
              <button class="search-btn">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Menú Principal -->
          <div class="navbar-menu" :class="{ 'menu-open': isMobileMenuOpen }">
            <!-- Productos y Servicios -->
            <div
              class="menu-item"
              @mouseenter="openMegaMenu('productos')"
              @mouseleave="closeMegaMenu"
            >
              <button class="menu-button">
                Productos y Servicios
                <svg class="chevron-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <!-- Ayuda -->
            <div class="menu-item" @mouseenter="openMegaMenu('ayuda')" @mouseleave="closeMegaMenu">
              <button class="menu-button">
                Ayuda
                <svg class="chevron-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <!-- Plan Amigo -->
            <router-link to="/plan-amigo" class="menu-link"> Plan Amigo </router-link>
          </div>

          <!-- Right Actions -->
          <div class="navbar-actions">
            <!-- Línea Exclusiva de Venta -->
            <ButtonPrimary size="sm" class="sales-line-btn">
              <svg class="sales-icon" viewBox="0 0 20 20" fill="currentColor">
                <path
                  d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                />
              </svg>
              Línea Exclusiva: (084) 566556
            </ButtonPrimary>

            <!-- Soy Cliente -->
            <div
              class="client-menu"
              @mouseenter="openMegaMenu('cliente')"
              @mouseleave="closeMegaMenu"
            >
              <button class="client-button">
                <svg class="user-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  />
                </svg>
                Soy cliente
                <svg class="chevron-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <!-- Mobile Menu Toggle -->
            <button class="mobile-menu-toggle" @click="toggleMobileMenu" aria-label="Toggle menu">
              <svg v-if="!isMobileMenuOpen" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mega Menus -->
      <transition name="fade-slide">
        <div
          v-if="activeMegaMenu"
          class="mega-menu"
          @mouseenter="keepMegaMenuOpen"
          @mouseleave="closeMegaMenu"
        >
          <div class="container">
            <!-- Productos y Servicios Mega Menu -->
            <div v-if="activeMegaMenu === 'productos'" class="mega-menu-content">
              <div class="mega-menu-section">
                <h3 class="mega-menu-title">Internet</h3>
                <ul class="mega-menu-list">
                  <li>
                    <router-link to="/productos/fibra-movil" class="mega-menu-link">
                      <div class="link-icon">📱</div>
                      <div>
                        <div class="link-title">Fibra + Móvil</div>
                        <div class="link-description">Combina internet y móvil</div>
                      </div>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/productos/fibra" class="mega-menu-link">
                      <div class="link-icon">🌐</div>
                      <div>
                        <div class="link-title">Solo Fibra</div>
                        <div class="link-description">Internet de alta velocidad</div>
                      </div>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/productos/tarifa-movil" class="mega-menu-link">
                      <div class="link-icon">📞</div>
                      <div>
                        <div class="link-title">Tarifa Móvil</div>
                        <div class="link-description">Planes de telefonía móvil</div>
                      </div>
                    </router-link>
                  </li>
                </ul>
              </div>

              <div class="mega-menu-section">
                <h3 class="mega-menu-title">Promociones</h3>
                <ul class="mega-menu-list">
                  <li>
                    <router-link to="/productos/promociones" class="mega-menu-link">
                      <div class="link-icon">🎁</div>
                      <div>
                        <div class="link-title">Ofertas Especiales</div>
                        <div class="link-description">Descuentos exclusivos</div>
                      </div>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/productos/planes?filter=nuevos" class="mega-menu-link">
                      <div class="link-icon">✨</div>
                      <div>
                        <div class="link-title">Línea Nueva</div>
                        <div class="link-description">Beneficios para nuevos clientes</div>
                      </div>
                    </router-link>
                  </li>
                </ul>
              </div>

              <div class="mega-menu-section">
                <h3 class="mega-menu-title">Herramientas</h3>
                <ul class="mega-menu-list">
                  <li>
                    <router-link to="/herramientas/cotizador" class="mega-menu-link">
                      <div class="link-icon">💰</div>
                      <div>
                        <div class="link-title">Cotizar Plan</div>
                        <div class="link-description">Personaliza tu tarifa</div>
                      </div>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/herramientas/cobertura" class="mega-menu-link">
                      <div class="link-icon">📍</div>
                      <div>
                        <div class="link-title">Cobertura</div>
                        <div class="link-description">Consulta tu zona</div>
                      </div>
                    </router-link>
                  </li>
                </ul>
              </div>

              <div class="mega-menu-featured">
                <div class="featured-card">
                  <div class="featured-badge">Oferta del mes</div>
                  <h4 class="featured-title">Fibra 1Gb + 2 Móviles</h4>
                  <p class="featured-price">S/ 89/mes</p>
                  <router-link to="/productos/details/promo-mes" class="btn btn-primary btn-sm">
                    Ver más
                  </router-link>
                </div>
              </div>
            </div>

            <!-- Ayuda Mega Menu -->
            <div v-if="activeMegaMenu === 'ayuda'" class="mega-menu-content">
              <div class="mega-menu-section">
                <h3 class="mega-menu-title">Soporte Técnico</h3>
                <ul class="mega-menu-list">
                  <li>
                    <router-link to="/ayuda/configuracion" class="mega-menu-link">
                      <div class="link-icon">⚙️</div>
                      <div>
                        <div class="link-title">Configuración</div>
                        <div class="link-description">Configura tu router</div>
                      </div>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/ayuda/soporte?topic=red" class="mega-menu-link">
                      <div class="link-icon">📡</div>
                      <div>
                        <div class="link-title">Problemas de Red</div>
                        <div class="link-description">Soluciona conexiones</div>
                      </div>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/herramientas/speed-test" class="mega-menu-link">
                      <div class="link-icon">⚡</div>
                      <div>
                        <div class="link-title">Test de Velocidad</div>
                        <div class="link-description">Verifica tu conexión</div>
                      </div>
                    </router-link>
                  </li>
                </ul>
              </div>

              <div class="mega-menu-section">
                <h3 class="mega-menu-title">Atención al Cliente</h3>
                <ul class="mega-menu-list">
                  <li>
                    <a href="tel:900815761" class="mega-menu-link">
                      <div class="link-icon">📞</div>
                      <div>
                        <div class="link-title">Llámanos</div>
                        <div class="link-description">900 815 761 (Gratis)</div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <router-link to="/ayuda/atencion-cliente?method=chat" class="mega-menu-link">
                      <div class="link-icon">💬</div>
                      <div>
                        <div class="link-title">Chat en Línea</div>
                        <div class="link-description">Respuesta inmediata</div>
                      </div>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/ayuda/atencion-cliente?method=centros" class="mega-menu-link">
                      <div class="link-icon">🏢</div>
                      <div>
                        <div class="link-title">Centros de Atención</div>
                        <div class="link-description">Visítanos</div>
                      </div>
                    </router-link>
                  </li>
                </ul>
              </div>

              <div class="mega-menu-section">
                <h3 class="mega-menu-title">Recursos</h3>
                <ul class="mega-menu-list">
                  <li>
                    <router-link to="/ayuda/soporte" class="mega-menu-link">
                      <div class="link-icon">❓</div>
                      <div>
                        <div class="link-title">Preguntas Frecuentes</div>
                        <div class="link-description">Encuentra respuestas</div>
                      </div>
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Cliente Mega Menu -->
            <div v-if="activeMegaMenu === 'cliente'" class="mega-menu-content cliente-menu-content">
              <div class="mega-menu-section">
                <h3 class="mega-menu-title">Mi Cuenta</h3>
                <ul class="mega-menu-list">
                  <li>
                    <router-link to="/mi-cuenta/boletas" class="mega-menu-link">
                      <div class="link-icon">📄</div>
                      <div>
                        <div class="link-title">Mis Boletas</div>
                        <div class="link-description">Historial de facturación</div>
                      </div>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/mi-cuenta/pagos" class="mega-menu-link">
                      <div class="link-icon">💳</div>
                      <div>
                        <div class="link-title">Mis Pagos</div>
                        <div class="link-description">Realiza un pago</div>
                      </div>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/mi-cuenta/tickets" class="mega-menu-link">
                      <div class="link-icon">🎫</div>
                      <div>
                        <div class="link-title">Mis Tickets</div>
                        <div class="link-description">Soporte y reclamos</div>
                      </div>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/mi-cuenta/perfil" class="mega-menu-link">
                      <div class="link-icon">⚙️</div>
                      <div>
                        <div class="link-title">Mi Perfil</div>
                        <div class="link-description">Datos personales</div>
                      </div>
                    </router-link>
                  </li>
                </ul>
              </div>

              <div class="mega-menu-section">
                <div class="client-login-card">
                  <div class="login-icon">🔐</div>
                  <h3 class="login-title">Accede a tu cuenta</h3>
                  <p class="login-description">Gestiona tus servicios en línea</p>
                  <button class="btn btn-primary" @click="handleLogin">Iniciar Sesión</button>
                  <button
                    class="btn btn-outline btn-sm"
                    @click="handleRegister"
                    style="margin-top: var(--spacing-2)"
                  >
                    Crear cuenta
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ButtonPrimary from '@/components/ui/ButtonPrimary.vue'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const activeMegaMenu = ref(null)
const activeSegment = ref('particulares')
const searchQuery = ref('')
let closeTimer = null

const segments = ref([
  { id: 'particulares', name: 'Particulares' },
  { id: 'hogar', name: 'Hogar' },
  { id: 'empresas', name: 'Empresas' },
])

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const openMegaMenu = (menu) => {
  clearTimeout(closeTimer)
  activeMegaMenu.value = menu
}

const keepMegaMenuOpen = () => {
  clearTimeout(closeTimer)
}

const closeMegaMenu = () => {
  closeTimer = setTimeout(() => {
    activeMegaMenu.value = null
  }, 300)
}

const handleLogin = () => {
  // TODO: Implementar lógica de login
  console.log('Login')
}

const handleRegister = () => {
  // TODO: Implementar lógica de registro
  console.log('Register')
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  clearTimeout(closeTimer)
})
</script>

<style scoped>
/* Navbar Container */
.navbar-container {
  position: sticky;
  top: 0;
  z-index: var(--z-index-sticky);
}

/* Navbar Superior */
.navbar-top {
  background: var(--gradient-dark);
  color: var(--color-white);
  padding: var(--spacing-2) 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.navbar-top-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Selector de Segmentos */
.segment-selector {
  display: flex;
  gap: var(--spacing-2);
}

.segment-btn {
  padding: var(--spacing-2) var(--spacing-4);
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.segment-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.segment-btn.active {
  background: var(--gradient-primary);
  box-shadow: var(--shadow-primary);
}

/* Información de Contacto */
.contact-info {
  display: flex;
  gap: var(--spacing-3);
}

.contact-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-1) var(--spacing-3);
  font-size: var(--font-size-xs);
}

.contact-icon {
  width: 16px;
  height: 16px;
}

/* Navbar Principal */
.navbar {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
}

.navbar-scrolled {
  box-shadow: var(--shadow-md);
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--navbar-height);
}

/* Logo */
.navbar-logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  text-decoration: none;
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  transition: all var(--transition-fast);
}

.navbar-logo:hover {
  transform: scale(1.05);
}

.logo-img {
  height: 40px;
  width: auto;
}

.logo-text {
  display: none;
}

@media (min-width: 768px) {
  .logo-text {
    display: inline;
  }
}

/* Buscador */
.navbar-search {
  flex: 1;
  max-width: 500px;
  margin: 0 var(--spacing-6);
}

.search-container {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  padding: var(--spacing-2) var(--spacing-4) var(--spacing-2) var(--spacing-10);
  background: var(--color-gray-100);
  border: none;
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  transition: all var(--transition-base);
}

.search-input:focus {
  outline: none;
  background: var(--color-white);
  box-shadow: var(--shadow-md);
}

.search-btn {
  position: absolute;
  left: var(--spacing-3);
  background: none;
  border: none;
  color: var(--color-gray-500);
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Menu */
.navbar-menu {
  display: none;
  align-items: center;
  gap: var(--spacing-2);
}

@media (min-width: 1024px) {
  .navbar-menu {
    display: flex;
  }
}

.menu-item {
  position: relative;
}

.menu-button {
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
  padding: var(--spacing-3) var(--spacing-4);
  background: none;
  border: none;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-700);
  cursor: pointer;
  transition: all var(--transition-fast);
  border-radius: var(--radius-base);
}

.menu-button:hover {
  color: var(--color-primary);
  background: var(--color-blue-50);
}

.menu-link {
  padding: var(--spacing-3) var(--spacing-4);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-700);
  text-decoration: none;
  transition: all var(--transition-fast);
  border-radius: var(--radius-base);
  display: block;
}

.menu-link:hover {
  color: var(--color-primary);
  background: var(--color-blue-50);
}

.chevron-icon {
  width: 16px;
  height: 16px;
  transition: transform var(--transition-fast);
}

.menu-item:hover .chevron-icon {
  transform: rotate(180deg);
}

/* Actions */
.navbar-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
}

.sales-line-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--font-size-sm);
  background: var(--gradient-secondary);
  color: var(--color-white);
}

.sales-icon {
  width: 16px;
  height: 16px;
}

.client-button {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-3) var(--spacing-5);
  background: var(--gradient-primary);
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
}

.client-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  transition: all var(--transition-base);
}

.client-button:hover::before {
  left: 0;
}

.client-button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.user-icon {
  width: 20px;
  height: 20px;
}

.mobile-menu-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  color: var(--color-gray-700);
  cursor: pointer;
  border-radius: var(--radius-base);
  transition: all var(--transition-fast);
}

.mobile-menu-toggle:hover {
  background: var(--color-gray-100);
}

.mobile-menu-toggle svg {
  width: 24px;
  height: 24px;
}

@media (min-width: 1024px) {
  .mobile-menu-toggle {
    display: none;
  }
}

/* Mega Menu */
.mega-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: var(--shadow-xl);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  z-index: var(--z-index-dropdown);
  border-radius: 0 0 var(--radius-xl) var(--radius-xl);
  overflow: hidden;
}

.mega-menu-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-8);
  padding: var(--spacing-8);
}

.cliente-menu-content {
  grid-template-columns: 1fr 1fr;
  max-width: 600px;
}

.mega-menu-section {
  min-width: 0;
}

.mega-menu-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-500);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 var(--spacing-4) 0;
  position: relative;
  padding-bottom: var(--spacing-2);
}

.mega-menu-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 2px;
  background: var(--gradient-primary);
}

.mega-menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.mega-menu-list li {
  margin-bottom: var(--spacing-2);
}

.mega-menu-link {
  display: flex;
  align-items: start;
  gap: var(--spacing-3);
  padding: var(--spacing-3);
  border-radius: var(--radius-base);
  text-decoration: none;
  transition: all var(--transition-fast);
  position: relative;
}

.mega-menu-link:hover {
  background: var(--color-gray-50);
  transform: translateX(4px);
}

.link-icon {
  font-size: 24px;
  flex-shrink: 0;
  transition: transform var(--transition-base);
}

.mega-menu-link:hover .link-icon {
  transform: scale(1.1);
}

.link-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-1);
}

.link-description {
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
}

/* Featured Card */
.mega-menu-featured {
  grid-column: span 1;
}

.featured-card {
  padding: var(--spacing-6);
  background: var(--gradient-primary);
  border-radius: var(--radius-lg);
  color: var(--color-white);
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-primary);
}

.featured-card::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 70%);
  transform: scale(0);
  transition: transform var(--transition-slow);
}

.featured-card:hover::before {
  transform: scale(1);
}

.featured-badge {
  display: inline-block;
  padding: var(--spacing-1) var(--spacing-3);
  background: rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-3);
}

.featured-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  margin: 0 0 var(--spacing-2) 0;
}

.featured-price {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  margin: 0 0 var(--spacing-4) 0;
}

/* Client Login Card */
.client-login-card {
  padding: var(--spacing-6);
  background: var(--color-gray-50);
  border-radius: var(--radius-lg);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.client-login-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--gradient-primary);
}

.login-icon {
  font-size: 48px;
  margin-bottom: var(--spacing-3);
}

.login-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-900);
  margin: 0 0 var(--spacing-2) 0;
}

.login-description {
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  margin: 0 0 var(--spacing-4) 0;
}

/* Animations */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Mobile Menu Styles */
@media (max-width: 1023px) {
  .navbar-menu {
    position: fixed;
    top: var(--navbar-height-mobile);
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    flex-direction: column;
    padding: var(--spacing-4);
    box-shadow: var(--shadow-lg);
    border-radius: 0 0 var(--radius-xl) var(--radius-xl);
    max-height: calc(100vh - var(--navbar-height-mobile));
    overflow-y: auto;
    transform: translateY(-100%);
    transition: transform var(--transition-base);
    z-index: var(--z-index-dropdown);
  }

  .navbar-menu.menu-open {
    transform: translateY(0);
  }

  .menu-item,
  .menu-link {
    width: 100%;
    padding: var(--spacing-4);
    border-bottom: 1px solid var(--color-gray-200);
  }

  .menu-button,
  .menu-link {
    justify-content: space-between;
  }

  .mega-menu {
    position: static;
    box-shadow: none;
    border: none;
    border-radius: 0;
    margin-top: var(--spacing-4);
  }

  .mega-menu-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-4);
    padding: var(--spacing-4);
  }

  .mega-menu-section {
    border-bottom: 1px solid var(--color-gray-200);
    padding-bottom: var(--spacing-4);
  }

  .mega-menu-section:last-child {
    border-bottom: none;
  }
}
</style>
