<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-card">
        <!-- Logo -->
        <div class="auth-header">
          <router-link to="/" class="auth-logo">
            <img src="@/assets/logo.png" alt="NorEtel" />
          </router-link>
          <h1 class="auth-title">Iniciar Sesión</h1>
          <p class="auth-subtitle">Accede a tu cuenta de NorEtel</p>
        </div>

        <!-- Formulario -->
        <form @submit.prevent="handleLogin" class="auth-form">
          <!-- Email -->
          <div class="form-group">
            <label class="form-label">Correo Electrónico</label>
            <input
              v-model="form.email"
              type="email"
              class="form-input"
              placeholder="tu@email.com"
              required
              autocomplete="email"
            />
          </div>

          <!-- Password -->
          <div class="form-group">
            <label class="form-label">Contraseña</label>
            <div class="input-with-icon">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                class="form-input"
                placeholder="••••••••"
                required
                autocomplete="current-password"
              />
              <button type="button" class="input-icon-btn" @click="showPassword = !showPassword">
                <svg v-if="!showPassword" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fill-rule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <svg v-else viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                    clip-rule="evenodd"
                  />
                  <path
                    d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Recordarme / Olvidé contraseña -->
          <div class="form-options">
            <label class="checkbox-label">
              <input v-model="form.remember" type="checkbox" />
              <span>Recordarme</span>
            </label>
            <router-link to="/auth/forgot-password" class="link-text">
              ¿Olvidaste tu contraseña?
            </router-link>
          </div>

          <!-- Error Message -->
          <div v-if="authStore.error" class="alert alert-error">
            {{ authStore.error }}
          </div>

          <!-- Submit Button -->
          <button type="submit" class="btn btn-primary btn-large" :disabled="authStore.isLoading">
            <span v-if="!authStore.isLoading">Iniciar Sesión</span>
            <span v-else class="loading-spinner">
              <div class="spinner"></div>
              Iniciando sesión...
            </span>
          </button>
        </form>

        <!-- Register Link -->
        <div class="auth-footer">
          <p class="footer-text">
            ¿No tienes cuenta?
            <router-link to="/auth/register" class="link-primary">Regístrate aquí</router-link>
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
  email: '',
  password: '',
  remember: false,
})

const showPassword = ref(false)

const handleLogin = async () => {
  authStore.clearError()

  const success = await authStore.login({
    email: form.value.email,
    password: form.value.password,
  })

  if (success) {
    // Redirigir según el rol
    if (authStore.isAdmin) {
      window.location.href = 'http://localhost:8000/core/dashboard' // Dashboard admin Laravel
    } else {
      router.push('/mi-cuenta/dashboard') // Dashboard cliente Vue
    }
  }
}
</script>

<style scoped>
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
  max-width: 440px;
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

.input-with-icon {
  position: relative;
}

.input-with-icon .form-input {
  padding-right: 48px;
}

.input-icon-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: var(--color-text-secondary);
  transition: color 0.3s;
}

.input-icon-btn:hover {
  color: var(--color-primary);
}

.input-icon-btn svg {
  width: 20px;
  height: 20px;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  cursor: pointer;
  color: var(--color-text-secondary);
}

.checkbox-label input {
  cursor: pointer;
}

.link-text {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
}

.link-text:hover {
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

.loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
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
</style>
