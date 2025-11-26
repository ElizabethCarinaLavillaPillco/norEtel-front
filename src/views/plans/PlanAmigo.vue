<template>
  <div class="plan-amigo-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <div class="hero-icon">🎁</div>
          <h1 class="hero-title">Plan Amigo NorEtel</h1>
          <p class="hero-subtitle">
            Comparte la mejor conexión con tus amigos y ambos reciben beneficios increíbles
          </p>
          <div class="hero-badges">
            <div class="badge">
              <span class="badge-value">50%</span>
              <span class="badge-label">Descuento 1er mes</span>
            </div>
            <div class="badge">
              <span class="badge-value">S/ 40</span>
              <span class="badge-label">Por referido exitoso</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Cómo Funciona -->
    <section class="how-it-works">
      <div class="container">
        <h2 class="section-title">¿Cómo Funciona?</h2>

        <!-- Promoción 2x1 -->
        <div class="promo-2x1">
          <div class="promo-header">
            <div class="promo-icon">🎉</div>
            <h3 class="promo-title">Promoción 2x1 - ¡Vengan Juntos!</h3>
          </div>
          <div class="promo-content">
            <p class="promo-description">
              Si vienes con un amigo y ambos contratan NorEtel al mismo tiempo,
              <strong>ambos reciben 50% de descuento en su primer mes</strong>. ¡Es la forma
              perfecta de empezar juntos esta nueva experiencia!
            </p>
            <div class="promo-steps">
              <div class="step-card">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h4 class="step-title">Acuerden Contratar</h4>
                  <p class="step-text">Conversa con tu amigo y decidan venir juntos a NorEtel</p>
                </div>
              </div>
              <div class="step-arrow">→</div>
              <div class="step-card">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h4 class="step-title">Contraten al Mismo Tiempo</h4>
                  <p class="step-text">Ambos deben solicitar el servicio el mismo día</p>
                </div>
              </div>
              <div class="step-arrow">→</div>
              <div class="step-card">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h4 class="step-title">¡Disfruten el Descuento!</h4>
                  <p class="step-text">50% OFF en el primer mes para ambos</p>
                </div>
              </div>
            </div>
            <div class="promo-cta">
              <button @click="showPromo2x1Form = true" class="btn btn-primary btn-large">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path
                    d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                  />
                </svg>
                Solicitar Promo 2x1
              </button>
            </div>
          </div>
        </div>

        <!-- Programa de Referidos -->
        <div class="referral-program">
          <div class="program-header">
            <div class="program-icon">👥</div>
            <h3 class="program-title">Programa de Referidos</h3>
          </div>
          <div class="program-content">
            <p class="program-description">
              ¿Ya eres cliente? Invita a tus amigos, familiares o conocidos a cambiarse a NorEtel y
              <strong>ambos reciben S/ 20 de descuento</strong> en su siguiente factura por cada
              referido exitoso.
            </p>
            <div class="benefits-grid">
              <div class="benefit-card">
                <div class="benefit-icon">💰</div>
                <h4 class="benefit-title">Gana por cada Referido</h4>
                <p class="benefit-text">S/ 20 de descuento cuando tu referido se active</p>
              </div>
              <div class="benefit-card">
                <div class="benefit-icon">🎁</div>
                <h4 class="benefit-title">Tu Amigo También Gana</h4>
                <p class="benefit-text">Tu amigo recibe S/ 20 de descuento al contratar</p>
              </div>
              <div class="benefit-card">
                <div class="benefit-icon">♾️</div>
                <h4 class="benefit-title">Sin Límites</h4>
                <p class="benefit-text">Refiere a todos los amigos que quieras</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Cómo Referir -->
        <div class="how-to-refer">
          <h3 class="subsection-title">Cómo Referir en 3 Pasos</h3>
          <div class="steps-horizontal">
            <div class="h-step">
              <div class="h-step-icon">📱</div>
              <div class="h-step-number">Paso 1</div>
              <h4 class="h-step-title">Comparte tu Código</h4>
              <p class="h-step-text">Usa tu código personal o envía el link directo por WhatsApp</p>
            </div>
            <div class="h-step-connector"></div>
            <div class="h-step">
              <div class="h-step-icon">✍️</div>
              <div class="h-step-number">Paso 2</div>
              <h4 class="h-step-title">Tu Amigo Contrata</h4>
              <p class="h-step-text">Debe mencionar tu código al solicitar el servicio</p>
            </div>
            <div class="h-step-connector"></div>
            <div class="h-step">
              <div class="h-step-icon">🎉</div>
              <div class="h-step-number">Paso 3</div>
              <h4 class="h-step-title">¡Ambos Ganan!</h4>
              <p class="h-step-text">S/ 20 de descuento para ti y para tu amigo</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mi Código de Referido -->
    <section v-if="isClient" class="my-referral-section">
      <div class="container">
        <div class="referral-card">
          <div class="referral-card-header">
            <h3 class="referral-card-title">Mi Código de Referido</h3>
            <div class="referral-stats">
              <div class="stat">
                <span class="stat-value">{{ totalReferrals }}</span>
                <span class="stat-label">Referidos</span>
              </div>
              <div class="stat">
                <span class="stat-value">S/ {{ totalEarnings }}</span>
                <span class="stat-label">Ahorrado</span>
              </div>
            </div>
          </div>

          <div class="referral-code-section">
            <div class="code-display">
              <label class="code-label">Tu Código Personal</label>
              <div class="code-box">
                <span class="code-value">{{ referralCode }}</span>
                <button @click="copyCode" class="btn-copy" :class="{ copied: codeCopied }">
                  <svg v-if="!codeCopied" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path
                      d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"
                    />
                  </svg>
                  <svg v-else viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  {{ codeCopied ? 'Copiado' : 'Copiar' }}
                </button>
              </div>
            </div>

            <div class="share-buttons">
              <button @click="shareWhatsApp" class="btn-share whatsapp">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                  />
                </svg>
                Compartir por WhatsApp
              </button>
              <button @click="shareLink" class="btn-share generic">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path
                    d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"
                  />
                </svg>
                Copiar Link
              </button>
            </div>
          </div>

          <!-- Mis Referidos -->
          <div v-if="myReferrals.length > 0" class="referrals-list">
            <h4 class="list-title">Mis Referidos</h4>
            <div class="referral-items">
              <div v-for="referral in myReferrals" :key="referral.id" class="referral-item">
                <div class="referral-info">
                  <div class="referral-name">{{ referral.name }}</div>
                  <div class="referral-date">{{ formatDate(referral.date) }}</div>
                </div>
                <div class="referral-status" :class="referral.status">
                  <span class="status-badge">{{ getStatusText(referral.status) }}</span>
                  <span class="status-reward">{{
                    referral.status === 'active' ? '+S/ 20' : ''
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Formulario de Referido (Para No Clientes) -->
    <section v-if="!isClient" class="referral-form-section">
      <div class="container">
        <div class="form-card">
          <div class="form-header">
            <h3 class="form-title">Invita a un Amigo</h3>
            <p class="form-description">
              Completa el formulario para invitar a un amigo y ambos recibirán beneficios
            </p>
          </div>

          <form @submit.prevent="submitReferral" class="referral-form">
            <div class="form-section">
              <h4 class="form-section-title">Tus Datos</h4>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Tu Nombre <span class="required">*</span></label>
                  <input
                    v-model="referralForm.yourName"
                    type="text"
                    class="form-input"
                    placeholder="Ej: Juan Pérez"
                    required
                  />
                </div>
                <div class="form-group">
                  <label class="form-label">Tu Celular <span class="required">*</span></label>
                  <input
                    v-model="referralForm.yourPhone"
                    type="tel"
                    class="form-input"
                    placeholder="987654321"
                    required
                    pattern="[0-9]{9}"
                  />
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Tu Email <span class="required">*</span></label>
                <input
                  v-model="referralForm.yourEmail"
                  type="email"
                  class="form-input"
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>

            <div class="form-section">
              <h4 class="form-section-title">Datos de tu Amigo</h4>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Nombre del Amigo <span class="required">*</span></label>
                  <input
                    v-model="referralForm.friendName"
                    type="text"
                    class="form-input"
                    placeholder="Ej: María García"
                    required
                  />
                </div>
                <div class="form-group">
                  <label class="form-label"
                    >Celular del Amigo <span class="required">*</span></label
                  >
                  <input
                    v-model="referralForm.friendPhone"
                    type="tel"
                    class="form-input"
                    placeholder="987654321"
                    required
                    pattern="[0-9]{9}"
                  />
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Email del Amigo</label>
                <input
                  v-model="referralForm.friendEmail"
                  type="email"
                  class="form-input"
                  placeholder="amigo@email.com"
                />
              </div>
            </div>

            <div class="form-group">
              <label class="form-checkbox">
                <input v-model="referralForm.acceptTerms" type="checkbox" required />
                <span class="checkbox-text">
                  Acepto los <a href="/terminos" target="_blank">términos y condiciones</a>
                  y autorizo a NorEtel a contactar a mi referido
                </span>
              </label>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn btn-primary btn-large" :disabled="isSubmitting">
                <span v-if="!isSubmitting">Enviar Invitación</span>
                <span v-else class="loading-spinner">
                  <div class="spinner"></div>
                  Enviando...
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>

    <!-- Promo 2x1 Modal -->
    <transition name="modal">
      <div v-if="showPromo2x1Form" class="modal-overlay" @click.self="showPromo2x1Form = false">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">Solicitar Promoción 2x1</h3>
            <button @click="showPromo2x1Form = false" class="modal-close">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>

          <form @submit.prevent="submitPromo2x1" class="modal-form">
            <p class="modal-description">
              Completa los datos de ambas personas que van a contratar juntos
            </p>

            <div class="person-section">
              <h4 class="person-title">Persona 1</h4>
              <div class="form-group">
                <label class="form-label">Nombre Completo <span class="required">*</span></label>
                <input v-model="promo2x1Form.person1Name" type="text" class="form-input" required />
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Celular <span class="required">*</span></label>
                  <input
                    v-model="promo2x1Form.person1Phone"
                    type="tel"
                    class="form-input"
                    required
                    pattern="[0-9]{9}"
                  />
                </div>
                <div class="form-group">
                  <label class="form-label">Email <span class="required">*</span></label>
                  <input
                    v-model="promo2x1Form.person1Email"
                    type="email"
                    class="form-input"
                    required
                  />
                </div>
              </div>
            </div>

            <div class="person-section">
              <h4 class="person-title">Persona 2</h4>
              <div class="form-group">
                <label class="form-label">Nombre Completo <span class="required">*</span></label>
                <input v-model="promo2x1Form.person2Name" type="text" class="form-input" required />
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Celular <span class="required">*</span></label>
                  <input
                    v-model="promo2x1Form.person2Phone"
                    type="tel"
                    class="form-input"
                    required
                    pattern="[0-9]{9}"
                  />
                </div>
                <div class="form-group">
                  <label class="form-label">Email <span class="required">*</span></label>
                  <input
                    v-model="promo2x1Form.person2Email"
                    type="email"
                    class="form-input"
                    required
                  />
                </div>
              </div>
            </div>

            <div class="modal-actions">
              <button type="button" @click="showPromo2x1Form = false" class="btn btn-outline">
                Cancelar
              </button>
              <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
                <span v-if="!isSubmitting">Enviar Solicitud</span>
                <span v-else class="loading-spinner">
                  <div class="spinner"></div>
                  Enviando...
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>

    <!-- Success Modal -->
    <transition name="modal">
      <div v-if="showSuccessModal" class="modal-overlay" @click.self="showSuccessModal = false">
        <div class="modal-content success-modal">
          <div class="success-icon">✅</div>
          <h3 class="success-title">¡Solicitud Enviada!</h3>
          <p class="success-message">{{ successMessage }}</p>
          <button @click="showSuccessModal = false" class="btn btn-primary">Entendido</button>
        </div>
      </div>
    </transition>

    <!-- FAQ Section -->
    <section class="faq-section">
      <div class="container">
        <h2 class="section-title">Preguntas Frecuentes</h2>
        <div class="faq-grid">
          <div class="faq-item">
            <h4 class="faq-question">¿Cuándo recibo mi descuento?</h4>
            <p class="faq-answer">
              El descuento se aplica automáticamente en tu siguiente factura una vez que tu referido
              active su servicio con NorEtel.
            </p>
          </div>
          <div class="faq-item">
            <h4 class="faq-question">¿Puedo referir a alguien que ya es cliente?</h4>
            <p class="faq-answer">
              No, el programa de referidos solo aplica para nuevos clientes que contraten por
              primera vez.
            </p>
          </div>
          <div class="faq-item">
            <h4 class="faq-question">¿Cuántos amigos puedo referir?</h4>
            <p class="faq-answer">
              ¡No hay límite! Puedes referir a tantos amigos como quieras y acumular descuentos en
              tus facturas.
            </p>
          </div>
          <div class="faq-item">
            <h4 class="faq-question">¿La promo 2x1 se puede combinar con otros descuentos?</h4>
            <p class="faq-answer">
              La promoción 2x1 no es acumulable con otras promociones vigentes. Se aplica el
              descuento más beneficioso.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Estados
const isClient = ref(false) // Cambiar a true si el usuario está logueado
const showPromo2x1Form = ref(false)
const showSuccessModal = ref(false)
const successMessage = ref('')
const isSubmitting = ref(false)
const codeCopied = ref(false)

// Datos del cliente (simulado)
const referralCode = ref('NOR' + Math.random().toString(36).substring(2, 8).toUpperCase())
const totalReferrals = ref(3)
const totalEarnings = ref(60) // 3 referidos x S/20

const myReferrals = ref([
  {
    id: 1,
    name: 'María García',
    date: '2024-10-15',
    status: 'active', // active, pending, cancelled
  },
  {
    id: 2,
    name: 'Carlos Mendoza',
    date: '2024-10-28',
    status: 'active',
  },
  {
    id: 3,
    name: 'Ana Torres',
    date: '2024-11-05',
    status: 'pending',
  },
])

// Formularios
const referralForm = ref({
  yourName: '',
  yourPhone: '',
  yourEmail: '',
  friendName: '',
  friendPhone: '',
  friendEmail: '',
  acceptTerms: false,
})

const promo2x1Form = ref({
  person1Name: '',
  person1Phone: '',
  person1Email: '',
  person2Name: '',
  person2Phone: '',
  person2Email: '',
})

// Métodos
const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(referralCode.value)
    codeCopied.value = true
    setTimeout(() => {
      codeCopied.value = false
    }, 2000)
  } catch (err) {
    console.error('Error copying:', err)
  }
}

const shareWhatsApp = () => {
  const message = `¡Hola! 🎉 Te invito a unirte a NorEtel, la mejor empresa de internet en Cusco.

Usa mi código: *${referralCode.value}*

¡Y ambos recibiremos S/ 20 de descuento! 💰

Más info: https://noretel.com/plan-amigo

¡Te va a encantar! 🚀`

  const url = `https://wa.me/?text=${encodeURIComponent(message)}`
  window.open(url, '_blank')
}

const shareLink = async () => {
  const link = `https://noretel.com/registro?ref=${referralCode.value}`
  try {
    await navigator.clipboard.writeText(link)
    alert('¡Link copiado! Compártelo con tus amigos')
  } catch (err) {
    console.error('Error copying:', err)
  }
}

const submitReferral = async () => {
  isSubmitting.value = true

  // Simular envío
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Guardar en localStorage
  const referralData = {
    ...referralForm.value,
    timestamp: new Date().toISOString(),
    type: 'referral',
  }

  saveReferralData(referralData)

  // Mostrar éxito
  successMessage.value = `¡Perfecto! Hemos enviado la invitación a ${referralForm.value.friendName}. Te notificaremos cuando se active para que recibas tu descuento de S/ 20.`
  showSuccessModal.value = true

  // Limpiar formulario
  referralForm.value = {
    yourName: '',
    yourPhone: '',
    yourEmail: '',
    friendName: '',
    friendPhone: '',
    friendEmail: '',
    acceptTerms: false,
  }

  isSubmitting.value = false
}

const submitPromo2x1 = async () => {
  isSubmitting.value = true

  // Simular envío
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Generar mensaje para WhatsApp
  const message = `¡Hola! Queremos solicitar la Promoción 2x1:

👤 *Persona 1*:
• Nombre: ${promo2x1Form.value.person1Name}
• Celular: ${promo2x1Form.value.person1Phone}
• Email: ${promo2x1Form.value.person1Email}

👤 *Persona 2*:
• Nombre: ${promo2x1Form.value.person2Name}
• Celular: ${promo2x1Form.value.person2Phone}
• Email: ${promo2x1Form.value.person2Email}

Queremos contratar juntos para recibir el 50% de descuento en el primer mes para ambos. 🎉`

  const whatsappUrl = `https://wa.me/5198989845?text=${encodeURIComponent(message)}`

  // Guardar datos
  const promo2x1Data = {
    ...promo2x1Form.value,
    timestamp: new Date().toISOString(),
    type: 'promo2x1',
  }

  saveReferralData(promo2x1Data)

  // Abrir WhatsApp
  window.open(whatsappUrl, '_blank')

  showPromo2x1Form.value = false
  successMessage.value =
    '¡Solicitud enviada! Nos comunicaremos contigo por WhatsApp para coordinar la instalación.'
  showSuccessModal.value = true

  // Limpiar formulario
  promo2x1Form.value = {
    person1Name: '',
    person1Phone: '',
    person1Email: '',
    person2Name: '',
    person2Phone: '',
    person2Email: '',
  }

  isSubmitting.value = false
}

const saveReferralData = (data) => {
  let referralHistory = JSON.parse(localStorage.getItem('referralHistory') || '[]')
  referralHistory.push(data)
  localStorage.setItem('referralHistory', JSON.stringify(referralHistory))
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-PE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

const getStatusText = (status) => {
  const texts = {
    active: 'Activo',
    pending: 'Pendiente',
    cancelled: 'Cancelado',
  }
  return texts[status] || status
}

// Lifecycle
onMounted(() => {
  // Verificar si el usuario está logueado (simulado)
  // En producción, verificar el estado de autenticación real
  const isLoggedIn = localStorage.getItem('userToken')
  isClient.value = !!isLoggedIn

  // Si es cliente, cargar datos reales del usuario
  if (isClient.value) {
    // Aquí cargarías los datos reales del API
    console.log('Usuario logueado - cargar datos de referidos')
  }
})
</script>

<style scoped>
/* Hero */
.hero-section {
  background: var(--gradient-primary);
  color: white;
  padding: var(--spacing-16) 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
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
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-icon {
  font-size: 80px;
  margin-bottom: var(--spacing-4);
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
  margin: 0 auto var(--spacing-8);
}

.hero-badges {
  display: flex;
  justify-content: center;
  gap: var(--spacing-6);
  flex-wrap: wrap;
}

.badge {
  padding: var(--spacing-4) var(--spacing-6);
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-xl);
  min-width: 180px;
}

.badge-value {
  display: block;
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-1);
}

.badge-label {
  display: block;
  font-size: var(--font-size-sm);
  opacity: 0.9;
}

/* How It Works */
.how-it-works {
  padding: var(--spacing-16) 0;
  background: var(--color-gray-50);
}

.section-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  text-align: center;
  margin: 0 0 var(--spacing-12) 0;
  color: var(--color-gray-900);
}

/* Promo 2x1 */
.promo-2x1 {
  background: white;
  border-radius: var(--radius-2xl);
  padding: var(--spacing-8);
  margin-bottom: var(--spacing-12);
  box-shadow: var(--shadow-xl);
  border: 3px solid var(--color-yellow);
}

.promo-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-6);
}

.promo-icon {
  font-size: 48px;
}

.promo-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-900);
  margin: 0;
}

.promo-description {
  font-size: var(--font-size-lg);
  color: var(--color-gray-700);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--spacing-8);
}

.promo-steps {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-8);
  align-items: center;
}

.step-card {
  background: var(--color-gray-50);
  border-radius: var(--radius-xl);
  padding: var(--spacing-6);
  text-align: center;
  border: 2px solid var(--color-gray-200);
  transition: all var(--transition-base);
}

.step-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary);
}

.step-number {
  width: 48px;
  height: 48px;
  margin: 0 auto var(--spacing-3);
  background: var(--gradient-primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
}

.step-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-900);
  margin: 0 0 var(--spacing-2) 0;
}

.step-text {
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  margin: 0;
}

.step-arrow {
  font-size: var(--font-size-3xl);
  color: var(--color-primary);
  font-weight: bold;
}

.promo-cta {
  text-align: center;
}

/* Referral Program */
.referral-program {
  background: white;
  border-radius: var(--radius-2xl);
  padding: var(--spacing-8);
  margin-bottom: var(--spacing-12);
  box-shadow: var(--shadow-xl);
}

.program-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-6);
}

.program-icon {
  font-size: 48px;
}

.program-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-900);
  margin: 0;
}

.program-description {
  font-size: var(--font-size-lg);
  color: var(--color-gray-700);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--spacing-8);
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-6);
}

.benefit-card {
  text-align: center;
  padding: var(--spacing-6);
  background: var(--color-gray-50);
  border-radius: var(--radius-lg);
  transition: all var(--transition-base);
}

.benefit-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.benefit-icon {
  font-size: 48px;
  margin-bottom: var(--spacing-3);
}

.benefit-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-900);
  margin: 0 0 var(--spacing-2) 0;
}

.benefit-text {
  font-size: var(--font-size-base);
  color: var(--color-gray-600);
  margin: 0;
}

/* How to Refer */
.how-to-refer {
  background: white;
  border-radius: var(--radius-2xl);
  padding: var(--spacing-8);
  box-shadow: var(--shadow-xl);
}

.subsection-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  text-align: center;
  color: var(--color-gray-900);
  margin: 0 0 var(--spacing-8) 0;
}

.steps-horizontal {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr;
  gap: var(--spacing-4);
  align-items: center;
}

.h-step {
  text-align: center;
  padding: var(--spacing-4);
}

.h-step-icon {
  font-size: 56px;
  margin-bottom: var(--spacing-3);
}

.h-step-number {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--spacing-2);
}

.h-step-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-900);
  margin: 0 0 var(--spacing-2) 0;
}

.h-step-text {
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  margin: 0;
}

.h-step-connector {
  width: 60px;
  height: 3px;
  background: var(--gradient-primary);
  position: relative;
}

.h-step-connector::after {
  content: '→';
  position: absolute;
  right: -15px;
  top: -12px;
  font-size: 24px;
  color: var(--color-primary);
}

/* My Referral Section */
.my-referral-section {
  padding: var(--spacing-16) 0;
  background: white;
}

.referral-card {
  background: var(--color-gray-50);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-8);
  box-shadow: var(--shadow-xl);
}

.referral-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-8);
  padding-bottom: var(--spacing-6);
  border-bottom: 2px solid var(--color-gray-300);
}

.referral-card-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-900);
  margin: 0;
}

.referral-stats {
  display: flex;
  gap: var(--spacing-8);
}

.stat {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  line-height: 1;
  margin-bottom: var(--spacing-1);
}

.stat-label {
  display: block;
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
}

/* Code Section */
.referral-code-section {
  background: white;
  border-radius: var(--radius-xl);
  padding: var(--spacing-6);
  margin-bottom: var(--spacing-6);
}

.code-display {
  margin-bottom: var(--spacing-6);
}

.code-label {
  display: block;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-700);
  margin-bottom: var(--spacing-2);
}

.code-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-4);
  background: var(--color-gray-50);
  border: 2px dashed var(--color-primary);
  border-radius: var(--radius-lg);
}

.code-value {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  font-family: monospace;
  color: var(--color-primary);
  letter-spacing: 0.1em;
}

.btn-copy {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-4);
  background: var(--gradient-primary);
  color: white;
  border: none;
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all var(--transition-base);
}

.btn-copy:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-copy.copied {
  background: var(--color-success);
}

.btn-copy svg {
  width: 16px;
  height: 16px;
}

/* Share Buttons */
.share-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-3);
}

.btn-share {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  padding: var(--spacing-3) var(--spacing-4);
  border: none;
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all var(--transition-base);
}

.btn-share svg {
  width: 20px;
  height: 20px;
}

.btn-share.whatsapp {
  background: #25d366;
  color: white;
}

.btn-share.whatsapp:hover {
  background: #1fb354;
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-share.generic {
  background: var(--gradient-secondary);
  color: white;
}

.btn-share.generic:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

/* Referrals List */
.referrals-list {
  background: white;
  border-radius: var(--radius-xl);
  padding: var(--spacing-6);
}

.list-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-900);
  margin: 0 0 var(--spacing-4) 0;
}

.referral-items {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
}

.referral-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-4);
  background: var(--color-gray-50);
  border-radius: var(--radius-lg);
}

.referral-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-900);
  margin-bottom: 2px;
}

.referral-date {
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
}

.referral-status {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
}

.status-badge {
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
}

.referral-status.active .status-badge {
  background: #e6fff2;
  color: var(--color-success);
}

.referral-status.pending .status-badge {
  background: #fff9e6;
  color: #ffcc00;
}

.referral-status.cancelled .status-badge {
  background: #ffe6eb;
  color: #ff6600;
}

.status-reward {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  color: var(--color-success);
}

/* Form Section */
.referral-form-section {
  padding: var(--spacing-16) 0;
  background: white;
}

.form-card {
  max-width: 800px;
  margin: 0 auto;
  background: var(--color-gray-50);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-8);
  box-shadow: var(--shadow-xl);
}

.form-header {
  text-align: center;
  margin-bottom: var(--spacing-8);
}

.form-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-900);
  margin: 0 0 var(--spacing-3) 0;
}

.form-description {
  font-size: var(--font-size-lg);
  color: var(--color-gray-600);
  margin: 0;
}

.referral-form {
  background: white;
  border-radius: var(--radius-xl);
  padding: var(--spacing-6);
}

.form-section {
  margin-bottom: var(--spacing-6);
  padding-bottom: var(--spacing-6);
  border-bottom: 2px solid var(--color-gray-200);
}

.form-section:last-of-type {
  border-bottom: none;
}

.form-section-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  margin: 0 0 var(--spacing-4) 0;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-4);
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

.required {
  color: var(--color-error);
}

.form-input {
  width: 100%;
  padding: var(--spacing-3) var(--spacing-4);
  border: 2px solid var(--color-gray-300);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  transition: all var(--transition-base);
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(0, 153, 255, 0.1);
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

.form-actions {
  text-align: center;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: var(--spacing-4);
}

.modal-content {
  background: white;
  border-radius: var(--radius-2xl);
  padding: var(--spacing-8);
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: var(--shadow-2xl);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-6);
}

.modal-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-900);
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--spacing-1);
  border-radius: var(--radius-base);
  transition: all var(--transition-fast);
}

.modal-close:hover {
  background: var(--color-gray-100);
}

.modal-close svg {
  width: 24px;
  height: 24px;
  color: var(--color-gray-600);
}

.modal-description {
  font-size: var(--font-size-base);
  color: var(--color-gray-600);
  margin-bottom: var(--spacing-6);
}

.person-section {
  margin-bottom: var(--spacing-6);
  padding: var(--spacing-4);
  background: var(--color-gray-50);
  border-radius: var(--radius-lg);
}

.person-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  margin: 0 0 var(--spacing-4) 0;
}

.modal-actions {
  display: flex;
  gap: var(--spacing-3);
  justify-content: flex-end;
}

/* Success Modal */
.success-modal {
  text-align: center;
  max-width: 400px;
}

.success-icon {
  font-size: 80px;
  margin-bottom: var(--spacing-4);
}

.success-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-success);
  margin: 0 0 var(--spacing-3) 0;
}

.success-message {
  font-size: var(--font-size-base);
  color: var(--color-gray-700);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--spacing-6);
}

/* FAQ Section */
.faq-section {
  padding: var(--spacing-16) 0;
  background: white;
}

.faq-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-6);
}

.faq-item {
  padding: var(--spacing-6);
  background: var(--color-gray-50);
  border-radius: var(--radius-lg);
  border-left: 4px solid var(--color-primary);
}

.faq-question {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-900);
  margin: 0 0 var(--spacing-3) 0;
}

.faq-answer {
  font-size: var(--font-size-base);
  color: var(--color-gray-700);
  line-height: var(--line-height-relaxed);
  margin: 0;
}

/* Buttons */
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

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: var(--gradient-primary);
  color: white;
  box-shadow: var(--shadow-primary);
}

.btn-primary:hover:not(:disabled) {
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
  color: white;
}

.btn-large {
  padding: var(--spacing-4) var(--spacing-8);
  font-size: var(--font-size-lg);
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

/* Modal Animations */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.95);
}

/* Responsive */
@media (max-width: 1024px) {
  .promo-steps {
    grid-template-columns: 1fr;
  }

  .step-arrow {
    transform: rotate(90deg);
    margin: var(--spacing-2) 0;
  }

  .steps-horizontal {
    grid-template-columns: 1fr;
  }

  .h-step-connector {
    width: 3px;
    height: 40px;
    margin: var(--spacing-2) auto;
  }

  .h-step-connector::after {
    content: '↓';
    right: -8px;
    top: auto;
    bottom: -20px;
  }

  .benefits-grid,
  .faq-grid {
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

  .hero-badges {
    flex-direction: column;
    align-items: stretch;
  }

  .referral-card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-4);
  }

  .referral-stats {
    width: 100%;
    justify-content: space-around;
  }

  .share-buttons {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .modal-actions {
    flex-direction: column;
  }

  .modal-actions .btn {
    width: 100%;
  }
}
</style>
