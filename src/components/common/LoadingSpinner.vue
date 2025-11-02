<template>
  <div :class="['spinner-wrapper', { 'spinner-fullscreen': fullscreen }]">
    <div :class="['spinner', size]"></div>
    <p v-if="message" class="spinner-message">{{ message }}</p>
  </div>
</template>

<script setup>
defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (val) => ['sm', 'md', 'lg'].includes(val),
  },
  message: String,
  fullscreen: Boolean,
})
</script>

<style scoped>
.spinner-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-4);
}

.spinner-wrapper.spinner-fullscreen {
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.9);
  z-index: var(--z-index-modal);
}

.spinner {
  border-radius: 50%;
  border: 3px solid var(--color-gray-200);
  border-top-color: var(--color-primary);
  animation: spin 0.8s linear infinite;
}

.spinner.sm {
  width: 24px;
  height: 24px;
}

.spinner.md {
  width: 40px;
  height: 40px;
}

.spinner.lg {
  width: 64px;
  height: 64px;
  border-width: 4px;
}

.spinner-message {
  font-size: var(--font-size-base);
  color: var(--color-gray-600);
  margin: 0;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
