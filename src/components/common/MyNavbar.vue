<template>
  <div class="navbar-container">
    <!-- Navbar Superior -->
    <nav class="navbar-top">
      <div class="container">
        <div class="navbar-top-content">
          <!-- Selector de Segmentos (Desktop) -->
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
            <a href="tel:08498313" class="contact-btn">
              <svg class="contact-icon" viewBox="0 0 20 20" fill="currentColor">
                <path
                  d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                />
              </svg>
              <span class="contact-text">(084) 98313</span>
            </a>
            <a href="https://wa.me/5198989845" target="_blank" class="contact-btn">
              <svg class="contact-icon" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="contact-text">+51 98989845</span>
            </a>
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

          <!-- Buscador (Desktop) -->
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

          <!-- Menú Principal (Desktop) -->
          <div class="navbar-menu desktop-menu">
            <!-- Productos y Servicios -->
            <div
              class="menu-item"
              @mouseenter="openMegaMenu('productos')"
              @mouseleave="closeMegaMenu"
            >
              <button class="menu-button">
                Productos
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
            <!-- Línea Exclusiva (Desktop) -->
            <a href="tel:084566556" class="sales-line-btn">
              <svg class="sales-icon" viewBox="0 0 20 20" fill="currentColor">
                <path
                  d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                />
              </svg>
              <span class="sales-text">(084) 566556</span>
            </a>

            <!-- Soy Cliente (Desktop) -->
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
                <span class="client-text">Soy cliente</span>
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

      <!-- Mega Menus (Desktop) -->
      <transition name="fade-slide">
        <div
          v-if="activeMegaMenu && !isMobileMenuOpen"
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

    <!-- Mobile Menu -->
    <div v-show="isMobileMenuOpen" class="mobile-menu">
      <div class="mobile-menu-content">
        <!-- Buscador Móvil -->
        <div class="mobile-search">
          <input
            type="text"
            placeholder="Buscar..."
            class="mobile-search-input"
            v-model="searchQuery"
          />
          <button class="mobile-search-btn">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>

        <!-- Para Quién -->
        <div class="mobile-section">
          <button class="mobile-section-header" @click="toggleMobileSection('segments')">
            <span class="section-icon">👥</span>
            <span class="section-title">Para Quién</span>
            <svg
              class="chevron-icon"
              :class="{ 'chevron-open': openMobileSection === 'segments' }"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <transition name="expand">
            <div v-if="openMobileSection === 'segments'" class="mobile-section-content">
              <button
                v-for="segment in segments"
                :key="segment.id"
                :class="['mobile-segment-btn', { active: activeSegment === segment.id }]"
                @click="selectSegment(segment.id)"
              >
                {{ segment.name }}
              </button>
            </div>
          </transition>
        </div>

        <!-- Productos y Servicios -->
        <div class="mobile-section">
          <button class="mobile-section-header" @click="toggleMobileSection('productos')">
            <span class="section-icon">🛍️</span>
            <span class="section-title">Productos y Servicios</span>
            <svg
              class="chevron-icon"
              :class="{ 'chevron-open': openMobileSection === 'productos' }"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <transition name="expand">
            <div v-if="openMobileSection === 'productos'" class="mobile-section-content">
              <div class="mobile-subsection">
                <h4 class="mobile-subsection-title">Internet</h4>
                <router-link
                  to="/productos/fibra-movil"
                  class="mobile-link"
                  @click="closeMobileMenu"
                >
                  <span class="link-icon">📱</span>
                  <div>
                    <div class="link-title">Fibra + Móvil</div>
                    <div class="link-description">Combina internet y móvil</div>
                  </div>
                </router-link>
                <router-link to="/productos/fibra" class="mobile-link" @click="closeMobileMenu">
                  <span class="link-icon">🌐</span>
                  <div>
                    <div class="link-title">Solo Fibra</div>
                    <div class="link-description">Internet de alta velocidad</div>
                  </div>
                </router-link>
                <router-link
                  to="/productos/tarifa-movil"
                  class="mobile-link"
                  @click="closeMobileMenu"
                >
                  <span class="link-icon">📞</span>
                  <div>
                    <div class="link-title">Tarifa Móvil</div>
                    <div class="link-description">Planes de telefonía móvil</div>
                  </div>
                </router-link>
              </div>

              <div class="mobile-subsection">
                <h4 class="mobile-subsection-title">Promociones</h4>
                <router-link
                  to="/productos/promociones"
                  class="mobile-link"
                  @click="closeMobileMenu"
                >
                  <span class="link-icon">🎁</span>
                  <div>
                    <div class="link-title">Ofertas Especiales</div>
                    <div class="link-description">Descuentos exclusivos</div>
                  </div>
                </router-link>
                <router-link
                  to="/productos/planes?filter=nuevos"
                  class="mobile-link"
                  @click="closeMobileMenu"
                >
                  <span class="link-icon">✨</span>
                  <div>
                    <div class="link-title">Línea Nueva</div>
                    <div class="link-description">Beneficios para nuevos clientes</div>
                  </div>
                </router-link>
              </div>
            </div>
          </transition>
        </div>

        <!-- Ayuda -->
        <div class="mobile-section">
          <button class="mobile-section-header" @click="toggleMobileSection('ayuda')">
            <span class="section-icon">❓</span>
            <span class="section-title">Ayuda</span>
            <svg
              class="chevron-icon"
              :class="{ 'chevron-open': openMobileSection === 'ayuda' }"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <transition name="expand">
            <div v-if="openMobileSection === 'ayuda'" class="mobile-section-content">
              <div class="mobile-subsection">
                <h4 class="mobile-subsection-title">Soporte Técnico</h4>
                <router-link to="/ayuda/configuracion" class="mobile-link" @click="closeMobileMenu">
                  <span class="link-icon">⚙️</span>
                  <div>
                    <div class="link-title">Configuración</div>
                  </div>
                </router-link>
                <router-link
                  to="/ayuda/soporte?topic=red"
                  class="mobile-link"
                  @click="closeMobileMenu"
                >
                  <span class="link-icon">📡</span>
                  <div>
                    <div class="link-title">Problemas de Red</div>
                  </div>
                </router-link>
                <router-link
                  to="/herramientas/speed-test"
                  class="mobile-link"
                  @click="closeMobileMenu"
                >
                  <span class="link-icon">⚡</span>
                  <div>
                    <div class="link-title">Test de Velocidad</div>
                  </div>
                </router-link>
              </div>

              <div class="mobile-subsection">
                <h4 class="mobile-subsection-title">Atención al Cliente</h4>
                <a href="tel:900815761" class="mobile-link" @click="closeMobileMenu">
                  <span class="link-icon">📞</span>
                  <div>
                    <div class="link-title">Llámanos</div>
                    <div class="link-description">900 815 761</div>
                  </div>
                </a>
                <router-link
                  to="/ayuda/atencion-cliente?method=chat"
                  class="mobile-link"
                  @click="closeMobileMenu"
                >
                  <span class="link-icon">💬</span>
                  <div>
                    <div class="link-title">Chat en Línea</div>
                  </div>
                </router-link>
              </div>
            </div>
          </transition>
        </div>

        <!-- Plan Amigo -->
        <router-link to="/plan-amigo" class="mobile-menu-link" @click="closeMobileMenu">
          <span class="section-icon">🎁</span>
          <span class="section-title">Plan Amigo</span>
        </router-link>

        <!-- Soy Cliente -->
        <div class="mobile-section">
          <button class="mobile-section-header" @click="toggleMobileSection('cliente')">
            <span class="section-icon">👤</span>
            <span class="section-title">Soy Cliente</span>
            <svg
              class="chevron-icon"
              :class="{ 'chevron-open': openMobileSection === 'cliente' }"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <transition name="expand">
            <div v-if="openMobileSection === 'cliente'" class="mobile-section-content">
              <router-link to="/mi-cuenta/boletas" class="mobile-link" @click="closeMobileMenu">
                <span class="link-icon">📄</span>
                <div>
                  <div class="link-title">Mis Boletas</div>
                </div>
              </router-link>
              <router-link to="/mi-cuenta/pagos" class="mobile-link" @click="closeMobileMenu">
                <span class="link-icon">💳</span>
                <div>
                  <div class="link-title">Mis Pagos</div>
                </div>
              </router-link>
              <router-link to="/mi-cuenta/tickets" class="mobile-link" @click="closeMobileMenu">
                <span class="link-icon">🎫</span>
                <div>
                  <div class="link-title">Mis Tickets</div>
                </div>
              </router-link>
              <router-link to="/mi-cuenta/perfil" class="mobile-link" @click="closeMobileMenu">
                <span class="link-icon">⚙️</span>
                <div>
                  <div class="link-title">Mi Perfil</div>
                </div>
              </router-link>

              <div class="mobile-login-actions">
                <button class="btn btn-primary btn-block" @click="handleLogin">
                  Iniciar Sesión
                </button>
                <button class="btn btn-outline btn-block btn-sm" @click="handleRegister">
                  Crear cuenta
                </button>
              </div>
            </div>
          </transition>
        </div>

        <!-- Contacto Móvil -->
        <div class="mobile-contact">
          <a href="tel:084566556" class="mobile-contact-btn">
            <svg class="contact-icon" viewBox="0 0 20 20" fill="currentColor">
              <path
                d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
              />
            </svg>
            Línea Exclusiva: (084) 566556
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const activeMegaMenu = ref(null)
const activeSegment = ref('particulares')
const openMobileSection = ref(null)
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
  if (!isMobileMenuOpen.value) {
    openMobileSection.value = null
  }
  // Prevenir scroll del body cuando el menú está abierto
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  openMobileSection.value = null
  document.body.style.overflow = ''
}

const toggleMobileSection = (section) => {
  openMobileSection.value = openMobileSection.value === section ? null : section
}

const selectSegment = (segmentId) => {
  activeSegment.value = segmentId
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
  console.log('Login')
  closeMobileMenu()
}

const handleRegister = () => {
  console.log('Register')
  closeMobileMenu()
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  clearTimeout(closeTimer)
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* Navbar Container */
.navbar-container {
  position: sticky;
  top: 0;
  z-index: 1020;
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
  gap: var(--spacing-4);
}

/* Selector de Segmentos */
.segment-selector {
  display: none;
  gap: var(--spacing-2);
}

@media (min-width: 768px) {
  .segment-selector {
    display: flex;
  }
}

.segment-btn {
  padding: var(--spacing-2) var(--spacing-3);
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast);
  white-space: nowrap;
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
  gap: var(--spacing-2);
  margin-left: auto;
}

.contact-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
  padding: var(--spacing-1) var(--spacing-2);
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  text-decoration: none;
  transition: all var(--transition-fast);
  cursor: pointer;
  white-space: nowrap;
}

.contact-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.contact-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

.contact-text {
  display: none;
}

@media (min-width: 640px) {
  .contact-text {
    display: inline;
  }
  .contact-btn {
    padding: var(--spacing-1) var(--spacing-3);
  }
  .contact-icon {
    width: 16px;
    height: 16px;
  }
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
  height: 60px;
  gap: var(--spacing-3);
}

@media (min-width: 1024px) {
  .navbar-content {
    height: 70px;
  }
}

/* Logo */
.navbar-logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  text-decoration: none;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  transition: all var(--transition-fast);
  flex-shrink: 0;
}

.navbar-logo:hover {
  transform: scale(1.05);
}

.logo-img {
  height: 32px;
  width: auto;
}

@media (min-width: 768px) {
  .logo-img {
    height: 40px;
  }
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
  display: none;
  flex: 1;
  max-width: 500px;
  margin: 0 var(--spacing-4);
}

@media (min-width: 1024px) {
  .navbar-search {
    display: block;
  }
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
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Menu Desktop */
.desktop-menu {
  display: none;
  align-items: center;
  gap: var(--spacing-2);
}

@media (min-width: 1024px) {
  .desktop-menu {
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
  padding: var(--spacing-2) var(--spacing-3);
  background: none;
  border: none;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-700);
  cursor: pointer;
  transition: all var(--transition-fast);
  border-radius: var(--radius-base);
  white-space: nowrap;
}

.menu-button:hover {
  color: var(--color-primary);
  background: var(--color-blue-50);
}

.menu-link {
  padding: var(--spacing-2) var(--spacing-3);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-700);
  text-decoration: none;
  transition: all var(--transition-fast);
  border-radius: var(--radius-base);
  display: block;
  white-space: nowrap;
}

.menu-link:hover {
  color: var(--color-primary);
  background: var(--color-blue-50);
}

.chevron-icon {
  width: 16px;
  height: 16px;
  transition: transform var(--transition-fast);
  flex-shrink: 0;
}

.menu-item:hover .chevron-icon {
  transform: rotate(180deg);
}

/* Actions */
.navbar-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
}

.sales-line-btn {
  display: none;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-4);
  background: var(--gradient-secondary);
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  text-decoration: none;
  cursor: pointer;
  transition: all var(--transition-base);
  white-space: nowrap;
}

@media (min-width: 1280px) {
  .sales-line-btn {
  }
}

.sales-line-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.sales-icon {
  width: 14px;
  height: 14px;
}

.sales-text {
  font-size: var(--font-size-xs);
}

.client-menu {
  display: none;
}

@media (min-width: 1024px) {
  .client-menu {
    display: block;
  }
}

.client-button {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-4);
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
  white-space: nowrap;
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
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.client-text {
  display: none;
}

@media (min-width: 1280px) {
  .client-text {
    display: inline;
  }
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
  flex-shrink: 0;
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

/* Mega Menu Desktop */
.mega-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: var(--shadow-xl);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 1000;
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

/* Mobile Menu */
.mobile-menu {
  position: fixed;
  top: 96px;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  z-index: 1019;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

@media (min-width: 1024px) {
  .mobile-menu {
    display: none !important;
  }
}

.mobile-menu-content {
  padding: 1rem;
  min-height: 100%;
  background: white;
}

/* Mobile Search */
.mobile-search {
  position: relative;
  margin-bottom: 1rem;
}

.mobile-search-input {
  width: 100%;
  padding: 0.75rem 3rem 0.75rem 1rem;
  background: var(--color-gray-100);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-lg);
  font-size: 1rem;
}

.mobile-search-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(0, 153, 255, 0.1);
}

.mobile-search-btn {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: var(--gradient-primary);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-base);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.mobile-search-btn svg {
  width: 20px;
  height: 20px;
}

/* Mobile Section */
.mobile-section {
  border-bottom: 1px solid var(--color-gray-200);
  margin-bottom: 0.5rem;
}

.mobile-section-header {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: var(--radius-base);
  text-align: left;
}

.mobile-section-header:hover {
  background: var(--color-gray-50);
}

.section-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.section-title {
  flex: 1;
  text-align: left;
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-gray-900);
}

.chevron-icon {
  transition: transform 0.3s;
}

.chevron-open {
  transform: rotate(180deg);
}

.mobile-section-content {
  padding: 0.5rem 1rem 1rem;
  overflow: hidden;
}

/* Mobile Segments */
.mobile-segment-btn {
  width: 100%;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  background: var(--color-gray-50);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-lg);
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-gray-700);
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;
}

.mobile-segment-btn:hover {
  background: var(--color-blue-50);
  border-color: var(--color-primary);
}

.mobile-segment-btn.active {
  background: var(--gradient-primary);
  color: white;
  border-color: var(--color-primary);
  box-shadow: var(--shadow-primary);
}

/* Mobile Subsection */
.mobile-subsection {
  margin-bottom: 1rem;
}

.mobile-subsection:last-child {
  margin-bottom: 0;
}

.mobile-subsection-title {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-gray-500);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 0.75rem 0;
  padding-left: 0.5rem;
}

.mobile-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: var(--radius-base);
  text-decoration: none;
  transition: all 0.2s;
  margin-bottom: 0.25rem;
}

.mobile-link:hover {
  background: var(--color-gray-50);
}

.mobile-link .link-icon {
  font-size: 20px;
  flex-shrink: 0;
}

.mobile-link .link-title {
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-gray-900);
  margin-bottom: 0.25rem;
}

.mobile-link .link-description {
  font-size: 0.875rem;
  color: var(--color-gray-600);
}

/* Mobile Menu Link */
.mobile-menu-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  text-decoration: none;
  border-bottom: 1px solid var(--color-gray-200);
  transition: all 0.2s;
  margin-bottom: 0.5rem;
  border-radius: var(--radius-base);
}

.mobile-menu-link:hover {
  background: var(--color-gray-50);
}

/* Mobile Login Actions */
.mobile-login-actions {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-gray-200);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* Mobile Contact */
.mobile-contact {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 2px solid var(--color-gray-200);
}

.mobile-contact-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: var(--gradient-secondary);
  color: white;
  border: none;
  border-radius: var(--radius-lg);
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s;
}

.mobile-contact-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
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

.expand-enter-active {
  transition: all 0.3s ease-out;
  overflow: hidden;
}

.expand-leave-active {
  transition: all 0.2s ease-in;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
  max-height: 2000px;
  opacity: 1;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.3s;
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

.btn-outline {
  background: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
}

.btn-outline:hover {
  background: var(--color-primary);
  color: white;
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.btn-block {
  width: 100%;
}

/* Responsive Adjustments */
@media (max-width: 640px) {
  .navbar-top-content {
    flex-direction: column;
    gap: 0.5rem;
    align-items: stretch;
  }

  .contact-info {
    width: 100%;
    justify-content: center;
    margin-left: 0;
  }

  .contact-btn {
    flex: 1;
    justify-content: center;
  }
}
</style>
