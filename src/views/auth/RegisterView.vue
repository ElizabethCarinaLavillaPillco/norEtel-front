<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-card">
        <!-- Logo -->
        <div class="auth-header">
          <router-link to="/" class="auth-logo">
            <img src="@/assets/logo.png" alt="NorEtel" />
          </router-link>
          <h1 class="auth-title">Crear Cuenta</h1>
          <p class="auth-subtitle">Regístrate en NorEtel</p>
        </div>

        <!-- Formulario -->
        <form @submit.prevent="handleRegister" class="auth-form">
          <!-- Tipo de Cliente -->
          <div class="form-group">
            <label class="form-label">Tipo de Cliente</label>
            <div class="radio-group">
              <label class="radio-label">
                <input v-model="form.customer_type" type="radio" value="individual" />
                <span>Persona Natural</span>
              </label>
              <label class="radio-label">
                <input v-model="form.customer_type" type="radio" value="company" />
                <span>Empresa</span>
              </label>
            </div>
          </div>

          <!-- Nombres -->
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Nombres *</label>
              <input
                v-model="form.first_name"
                type="text"
                class="form-input"
                placeholder="Juan"
                required
              />
            </div>

            <div class="form-group">
              <label class="form-label">Apellidos *</label>
              <input
                v-model="form.last_name"
                type="text"
                class="form-input"
                placeholder="Pérez"
                required
              />
            </div>
          </div>

          <!-- DNI -->
          <div class="form-group">
            <label class="form-label">DNI / RUC</label>
            <input
              v-model="form.identity_document"
              type="text"
              class="form-input"
              placeholder="12345678"
              maxlength="11"
            />
          </div>

          <!-- Email -->
          <div class="form-group">
            <label class="form-label">Correo Electrónico *</label>
            <input
              v-model="form.email"
              type="email"
              class="form-input"
              placeholder="tu@email.com"
              required
            />
          </div>

          <!-- Teléfono -->
          <div class="form-group">
            <label class="form-label">Teléfono / Celular *</label>
            <input
              v-model="form.phone"
              type="tel"
              class="form-input"
              placeholder="987654321"
              pattern="[0-9]{9}"
              required
            />
          </div>

          <!-- Password -->
          <div class="form-group">
            <label class="form-label">Contraseña *</label>
            <input
              v-model="form.password"
              type="password"
              class="form-input"
              placeholder="Mínimo 8 caracteres"
              required
              minlength="8"
            />
          </div>

          <!-- Confirmar Password -->
          <div class="form-group">
            <label class="form-label">Confirmar Contraseña *</label>
            <input
              v-model="form.password_confirmation"
              type="password"
              class="form-input"
              placeholder="Repite tu contraseña"
              required
            />
          </div>

          <!-- Términos y Condiciones -->
          <div class="form-group">
            <label class="checkbox-label">
              <input v-model="form.acceptTerms" type="checkbox" required />
              <span>
                Acepto los
                <router-link to="/terminos" target="_blank">Términos y Condiciones</router-link>
                y la
                <router-link to="/privacidad" target="_blank">Política de Privacidad</router-link>
              </span>
            </label>
          </div>

          <!-- Error Message -->
          <div v-if="authStore.error" class="alert alert-error">
            {{ authStore.error }}
          </div>

          <!-- Submit Button -->
          <button type="submit" class="btn btn-primary btn-large" :disabled="authStore.isLoading">
            <span v-if="!authStore.isLoading">Crear Cuenta</span>
            <span v-else class="loading-spinner">
              <div class="spinner"></div>
              Creando cuenta...
            </span>
          </button>
        </form>

        <!-- Login Link -->
        <div class="auth-footer">
          <p class="footer-text">
            ¿Ya tienes cuenta?
            <router-link to="/auth/login" class="link-primary">Inicia sesión aquí</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  customer_type: 'individual',
  first_name: '',
  last_name: '',
  identity_document: '',
  email: '',
  phone: '',
  password: '',
  password_confirmation: '',
  acceptTerms: false,
})

const handleRegister = async () => {
  authStore.clearError()

  if (form.value.password !== form.value.password_confirmation) {
    authStore.error = 'Las contraseñas no coinciden'
    return
  }

  const success = await authStore.register(form.value)

  if (success) {
    router.push('/mi-cuenta/dashboard')
  }
}
</script>

<style scoped>
/* Usar los mismos estilos del Login */
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  padding: var(--spacing-4);
}

.auth-container {
  width: 100%;
  max-width: 600px;
}

.auth-card {
  background: white;
  border-radius: 16px;
  padding: var(--spacing-8);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.auth-header {
  text-align: center;
  margin-bottom: var(--spacing-6);
}

.auth-logo img {
  height: 60px;
  margin-bottom: var(--spacing-4);
}

.auth-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: var(--spacing-2);
}

.auth-subtitle {
  color: var(--color-text-secondary);
  font-size: 16px;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-4);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

.form-label {
  font-weight: 600;
  color: var(--color-text);
  font-size: 14px;
}

.form-input {
  padding: 12px 16px;
  border: 2px solid var(--color-border);
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.radio-group {
  display: flex;
  gap: var(--spacing-4);
}

.radio-label {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  cursor: pointer;
  padding: 8px 16px;
  border: 2px solid var(--color-border);
  border-radius: 8px;
  transition: all 0.3s;
}

.radio-label:has(input:checked) {
  background: var(--color-primary-light);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.checkbox-label {
  display: flex;
  align-items: start;
  gap: var(--spacing-2);
  cursor: pointer;
  font-size: 14px;
  color: var(--color-text-secondary);
}

.checkbox-label a {
  color: var(--color-primary);
  text-decoration: none;
}

.checkbox-label a:hover {
  text-decoration: underline;
}

.alert {
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
}

.alert-error {
  background: #fee;
  color: #c00;
  border: 1px solid #fcc;
}

.auth-footer {
  margin-top: var(--spacing-6);
  text-align: center;
  padding-top: var(--spacing-4);
  border-top: 1px solid var(--color-border);
}

.footer-text {
  color: var(--color-text-secondary);
  font-size: 14px;
}

.link-primary {
  color: var(--color-primary);
  font-weight: 600;
  text-decoration: none;
}

.link-primary:hover {
  text-decoration: underline;
}

@media (max-width: 640px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
