<template>
  <div class="customer-dashboard">
    <!-- Header -->
    <div class="dashboard-header">
      <div class="container">
        <div class="header-content">
          <div>
            <h1 class="header-title">Hola, {{ authStore.fullName }} 👋</h1>
            <p class="header-subtitle">Bienvenido a tu cuenta de NorEtel</p>
          </div>
          <button @click="handleLogout" class="btn btn-outline">Cerrar Sesión</button>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="dashboard-content">
        <!-- Estado del Cliente -->
        <div class="info-card status-card">
          <div class="card-icon">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h3 class="card-title">Estado de la Cuenta</h3>
            <p class="card-value">{{ customerStatusText }}</p>
            <p class="card-description">{{ customerStatusDescription }}</p>
          </div>
        </div>

        <!-- Grid de Acciones Rápidas -->
        <div class="quick-actions">
          <h2 class="section-title">Acciones Rápidas</h2>
          <div class="actions-grid">
            <!-- Mis Boletas -->
            <router-link to="/mi-cuenta/boletas" class="action-card">
              <div class="action-icon">📄</div>
              <h3 class="action-title">Mis Boletas</h3>
              <p class="action-description">Consulta tu historial de facturación</p>
            </router-link>

            <!-- Mis Pagos -->
            <router-link to="/mi-cuenta/pagos" class="action-card">
              <div class="action-icon">💳</div>
              <h3 class="action-title">Realizar Pago</h3>
              <p class="action-description">Paga tu servicio en línea</p>
            </router-link>

            <!-- Soporte Técnico -->
            <router-link to="/mi-cuenta/tickets" class="action-card">
              <div class="action-icon">🎫</div>
              <h3 class="action-title">Soporte Técnico</h3>
              <p class="action-description">Crea un ticket de soporte</p>
            </router-link>

            <!-- Mi Perfil -->
            <router-link to="/mi-cuenta/perfil" class="action-card">
              <div class="action-icon">⚙️</div>
              <h3 class="action-title">Mi Perfil</h3>
              <p class="action-description">Actualiza tus datos</p>
            </router-link>
          </div>
        </div>

        <!-- Información Adicional -->
        <div class="info-section">
          <h2 class="section-title">Información de tu Cuenta</h2>
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Email</div>
              <div class="info-value">{{ authStore.customer?.email || authStore.user?.email }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Teléfono</div>
              <div class="info-value">{{ authStore.customer?.phone || 'No registrado' }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Cliente desde</div>
              <div class="info-value">{{ registrationDate }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Tiempo como cliente</div>
              <div class="info-value">{{ customerMonths }}</div>
            </div>
          </div>
        </div>

        <!-- Ayuda Rápida -->
        <div class="help-section">
          <h2 class="section-title">¿Necesitas Ayuda?</h2>
          <div class="help-grid">
            <a href="tel:084566556" class="help-card">
              <svg class="help-icon" viewBox="0 0 20 20" fill="currentColor">
                <path
                  d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                />
              </svg>
              <div>
                <div class="help-title">Llámanos</div>
                <div class="help-text">(084) 566556</div>
              </div>
            </a>

            <a href="https://wa.me/5198989845" target="_blank" class="help-card">
              <svg class="help-icon" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                  clip-rule="evenodd"
                />
              </svg>
              <div>
                <div class="help-title">WhatsApp</div>
                <div class="help-text">+51 989 89845</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const customerStatusText = computed(() => {
  const status = authStore.customer?.customer_status
  const statusMap = {
    lead: 'Cliente Potencial',
    prospect: 'Cliente Interesado',
    new: 'Cliente Nuevo',
    active: 'Cliente Activo',
    inactive: 'Cliente Inactivo',
    former: 'Cliente Anterior',
  }
  return statusMap[status] || 'Estado Desconocido'
})

const customerStatusDescription = computed(() => {
  const status = authStore.customer?.customer_status
  const descMap = {
    lead: 'Estás explorando nuestros servicios',
    prospect: 'En proceso de contratación',
    new: 'Bienvenido a NorEtel',
    active: 'Cuenta activa y funcionando',
    inactive: 'Tu servicio está temporalmente suspendido',
    former: 'Ya no eres cliente activo',
  }
  return descMap[status] || ''
})

const registrationDate = computed(() => {
  if (!authStore.customer?.registration_date) return 'No disponible'
  const date = new Date(authStore.customer.registration_date)
  return date.toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric' })
})

const customerMonths = computed(() => {
  const months = authStore.customer?.months_as_customer || 0
  if (months === 0) return 'Recién registrado'
  if (months === 1) return '1 mes'
  return `${months} meses`
})

const handleLogout = async () => {
  await authStore.logout()
  router.push('/')
}
</script>

<style scoped>
.customer-dashboard {
  min-height: 100vh;
  background: #f5f7fa;
  padding-bottom: var(--spacing-8);
}

.dashboard-header {
  background: white;
  border-bottom: 1px solid var(--color-border);
  padding: var(--spacing-6) 0;
  margin-bottom: var(--spacing-6);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: var(--spacing-2);
}

.header-subtitle {
  color: var(--color-text-secondary);
  font-size: 16px;
}

.dashboard-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
}

.status-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  padding: var(--spacing-6);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.card-icon {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-icon svg {
  width: 32px;
  height: 32px;
}

.card-title {
  font-size: 14px;
  font-weight: 500;
  opacity: 0.9;
  margin-bottom: var(--spacing-1);
}

.card-value {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: var(--spacing-1);
}

.card-description {
  font-size: 14px;
  opacity: 0.8;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: var(--spacing-4);
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-4);
}

.action-card {
  background: white;
  padding: var(--spacing-6);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s;
  border: 2px solid var(--color-border);
}

.action-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-color: var(--color-primary);
}

.action-icon {
  font-size: 48px;
  margin-bottom: var(--spacing-3);
}

.action-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: var(--spacing-2);
}

.action-description {
  color: var(--color-text-secondary);
  font-size: 14px;
}

.info-section,
.help-section {
  background: white;
  padding: var(--spacing-6);
  border-radius: 12px;
  border: 1px solid var(--color-border);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-4);
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

.info-label {
  font-size: 14px;
  color: var(--color-text-secondary);
  font-weight: 500;
}

.info-value {
  font-size: 16px;
  color: var(--color-text);
  font-weight: 600;
}

.help-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-4);
}

.help-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  padding: var(--spacing-4);
  background: var(--color-primary-light);
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s;
}

.help-card:hover {
  background: var(--color-primary);
  color: white;
}

.help-icon {
  width: 24px;
  height: 24px;
  color: var(--color-primary);
}

.help-card:hover .help-icon {
  color: white;
}

.help-title {
  font-weight: 600;
  font-size: 16px;
  color: var(--color-text);
}

.help-card:hover .help-title {
  color: white;
}

.help-text {
  font-size: 14px;
  color: var(--color-text-secondary);
}

.help-card:hover .help-text {
  color: rgba(255, 255, 255, 0.9);
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: start;
    gap: var(--spacing-4);
  }

  .actions-grid,
  .info-grid,
  .help-grid {
    grid-template-columns: 1fr;
  }
}
</style>
