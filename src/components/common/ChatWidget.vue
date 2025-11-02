<template>
  <div class="chat-widget">
    <!-- Botón flotante -->
    <transition name="bounce">
      <button
        v-if="!isOpen"
        @click="toggleChat"
        class="chat-button"
        aria-label="Abrir chat de ayuda"
      >
        <svg class="chat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
        <span class="chat-badge">Te ayudamos</span>
      </button>
    </transition>

    <!-- Panel de chat -->
    <transition name="slide-up">
      <div v-if="isOpen" class="chat-panel">
        <!-- Header -->
        <div class="chat-header">
          <div class="header-content">
            <div class="header-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                />
              </svg>
            </div>
            <div>
              <h3 class="header-title">¿Quieres contratar?</h3>
              <p class="header-subtitle">¡Te ayudamos!</p>
            </div>
          </div>
          <button @click="toggleChat" class="close-button" aria-label="Cerrar chat">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Body -->
        <div class="chat-body">
          <!-- Opción de llamada -->
          <div class="contact-option">
            <div class="option-icon phone">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"
                />
              </svg>
            </div>
            <div class="option-content">
              <p class="option-label">Llama GRATIS al</p>
              <a href="tel:900815761" class="phone-number">900 815 761</a>
              <p class="option-schedule">L-V de 9 a 23h, S-D de 10 a 22h</p>
            </div>
          </div>

          <div class="divider">o</div>

          <!-- Formulario de callback -->
          <div class="callback-form">
            <button
              v-if="!showCallbackForm"
              @click="showCallbackForm = true"
              class="callback-button"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 00-1.02.24l-2.2 2.2a15.045 15.045 0 01-6.59-6.59l2.2-2.21a.96.96 0 00.25-1A11.36 11.36 0 018.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM21 6h-3V3h-2v3h-3v2h3v3h2V8h3z"
                />
              </svg>
              Nosotros te llamamos
            </button>

            <transition name="fade">
              <div v-if="showCallbackForm" class="form-content">
                <form @submit.prevent="handleSubmit">
                  <div class="form-group">
                    <label for="phone">Tu número de teléfono</label>
                    <input
                      id="phone"
                      v-model="formData.phone"
                      type="tel"
                      placeholder="999 999 999"
                      maxlength="9"
                      required
                      class="form-input"
                    />
                  </div>

                  <div class="form-group">
                    <label class="checkbox-label">
                      <input v-model="formData.consent" type="checkbox" required />
                      <span class="checkbox-text">
                        Consiento que NorEtel trate mis datos para informarme de sus servicios por
                        cualquier medio.
                        <a href="/privacidad" target="_blank" class="privacy-link">
                          Política de Privacidad
                        </a>
                      </span>
                    </label>
                  </div>

                  <button type="submit" class="submit-button" :disabled="isSubmitting">
                    <span v-if="!isSubmitting">Enviar</span>
                    <span v-else class="loading">Enviando...</span>
                  </button>
                </form>

                <transition name="fade">
                  <div
                    v-if="submitMessage"
                    class="submit-message"
                    :class="submitSuccess ? 'success' : 'error'"
                  >
                    {{ submitMessage }}
                  </div>
                </transition>
              </div>
            </transition>
          </div>

          <!-- Opción de WhatsApp -->
          <button @click="openWhatsApp" class="whatsapp-button">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
              />
            </svg>
            Escríbenos por WhatsApp
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const isOpen = ref(false)
const showCallbackForm = ref(false)
const isSubmitting = ref(false)
const submitMessage = ref('')
const submitSuccess = ref(false)

const formData = reactive({
  phone: '',
  consent: false,
})

const toggleChat = () => {
  isOpen.value = !isOpen.value
  if (!isOpen.value) {
    showCallbackForm.value = false
    submitMessage.value = ''
  }
}

const handleSubmit = async () => {
  isSubmitting.value = true
  submitMessage.value = ''

  try {
    // TODO: Implementar llamada a la API
    await new Promise((resolve) => setTimeout(resolve, 1500)) // Simular llamada API

    submitSuccess.value = true
    submitMessage.value = '¡Gracias! Te llamaremos pronto.'

    // Reset form
    setTimeout(() => {
      formData.phone = ''
      formData.consent = false
      showCallbackForm.value = false
      submitMessage.value = ''
    }, 3000)
  } catch (error) {
    submitSuccess.value = false
    submitMessage.value = 'Error al enviar. Intenta de nuevo.'
  } finally {
    isSubmitting.value = false
  }
}

const openWhatsApp = () => {
  const phone = '51999999999' // TODO: Reemplazar con número real
  const message = encodeURIComponent('Hola, necesito información sobre sus servicios.')
  window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
}
</script>

<style scoped>
.chat-widget {
  position: fixed;
  bottom: var(--spacing-6);
  right: var(--spacing-6);
  z-index: var(--z-index-chat);
}

/* Botón flotante */
.chat-button {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-4) var(--spacing-5);
  background: var(--gradient-primary);
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-xl);
  cursor: pointer;
  transition: all var(--transition-base);
}

.chat-button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-2xl);
}

.chat-icon {
  width: 24px;
  height: 24px;
}

.chat-badge {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
}

/* Panel de chat */
.chat-panel {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 380px;
  max-width: calc(100vw - var(--spacing-8));
  background: var(--color-white);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-2xl);
  overflow: hidden;
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-5);
  background: var(--gradient-primary);
  color: var(--color-white);
}

.header-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
}

.header-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-full);
}

.header-icon svg {
  width: 24px;
  height: 24px;
}

.header-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  margin: 0;
}

.header-subtitle {
  font-size: var(--font-size-sm);
  margin: 0;
  opacity: 0.9;
}

.close-button {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: var(--radius-full);
  color: var(--color-white);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.3);
}

.close-button svg {
  width: 20px;
  height: 20px;
}

.chat-body {
  padding: var(--spacing-6);
  max-height: 500px;
  overflow-y: auto;
}

/* Opción de contacto */
.contact-option {
  display: flex;
  gap: var(--spacing-4);
  padding: var(--spacing-4);
  background: var(--color-gray-50);
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-4);
}

.option-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  flex-shrink: 0;
}

.option-icon.phone {
  background: var(--color-primary);
  color: var(--color-white);
}

.option-icon svg {
  width: 24px;
  height: 24px;
}

.option-content {
  flex: 1;
}

.option-label {
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  margin: 0 0 var(--spacing-1) 0;
}

.phone-number {
  display: block;
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  text-decoration: none;
  margin-bottom: var(--spacing-1);
}

.phone-number:hover {
  text-decoration: underline;
}

.option-schedule {
  font-size: var(--font-size-xs);
  color: var(--color-gray-500);
  margin: 0;
}

/* Divider */
.divider {
  text-align: center;
  color: var(--color-gray-400);
  font-size: var(--font-size-sm);
  margin: var(--spacing-4) 0;
  position: relative;
}

.divider::before,
.divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 40%;
  height: 1px;
  background: var(--color-gray-300);
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

/* Formulario */
.callback-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  padding: var(--spacing-4);
  background: var(--color-white);
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all var(--transition-base);
}

.callback-button:hover {
  background: var(--color-primary);
  color: var(--color-white);
}

.callback-button svg {
  width: 20px;
  height: 20px;
}

.form-content {
  margin-top: var(--spacing-4);
}

.form-group {
  margin-bottom: var(--spacing-4);
}

.form-group label {
  display: block;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-700);
  margin-bottom: var(--spacing-2);
}

.form-input {
  width: 100%;
  padding: var(--spacing-3) var(--spacing-4);
  font-size: var(--font-size-base);
  border: 2px solid var(--color-gray-300);
  border-radius: var(--radius-base);
  transition: all var(--transition-fast);
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(24, 122, 170, 0.1);
}

.checkbox-label {
  display: flex;
  gap: var(--spacing-2);
  align-items: start;
  cursor: pointer;
}

.checkbox-label input[type='checkbox'] {
  margin-top: 2px;
  flex-shrink: 0;
}

.checkbox-text {
  font-size: var(--font-size-xs);
  color: var(--color-gray-600);
  line-height: var(--line-height-normal);
}

.privacy-link {
  color: var(--color-primary);
  text-decoration: underline;
}

.submit-button {
  width: 100%;
  padding: var(--spacing-3);
  background: var(--gradient-primary);
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-base);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all var(--transition-base);
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.submit-message {
  margin-top: var(--spacing-3);
  padding: var(--spacing-3);
  border-radius: var(--radius-base);
  font-size: var(--font-size-sm);
  text-align: center;
}

.submit-message.success {
  background: var(--color-success-light);
  color: var(--color-success);
}

.submit-message.error {
  background: var(--color-error-light);
  color: var(--color-error);
}

/* WhatsApp Button */
.whatsapp-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  padding: var(--spacing-4);
  background: #25d366;
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  margin-top: var(--spacing-4);
  transition: all var(--transition-base);
}

.whatsapp-button:hover {
  background: #20ba5a;
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.whatsapp-button svg {
  width: 24px;
  height: 24px;
}

/* Animaciones */
.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.3s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .chat-widget {
    bottom: var(--spacing-4);
    right: var(--spacing-4);
  }

  .chat-panel {
    width: calc(100vw - var(--spacing-8));
  }
}
</style>
