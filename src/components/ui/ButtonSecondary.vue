<template>
  <button
    :class="['btn', 'btn-secondary', sizeClass, { 'btn-loading': loading, 'btn-block': block }]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="btn-spinner"></span>
    <slot v-else />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (val) => ['sm', 'md', 'lg'].includes(val),
  },
  disabled: Boolean,
  loading: Boolean,
  block: Boolean,
})

defineEmits(['click'])

const sizeClass = computed(() => `btn-${props.size}`)
</script>

<style scoped>
.btn-secondary {
  background: var(--gradient-secondary);
  color: var(--color-white);
  box-shadow: var(--shadow-secondary);
}

.btn-secondary:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: var(--shadow-xl);
}

.btn-secondary:active:not(:disabled) {
  transform: translateY(0);
}

.btn-secondary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Reusa estilos base de ButtonPrimary */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  font-family: var(--font-family-base);
  font-weight: var(--font-weight-semibold);
  border: none;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-base);
  text-decoration: none;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(-100%);
  transition: transform var(--transition-base);
  z-index: -1;
}

.btn:hover::before {
  transform: translateX(0);
}

.btn-sm {
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--font-size-sm);
  border-radius: var(--radius-md);
}

.btn-md {
  padding: var(--spacing-3) var(--spacing-6);
  font-size: var(--font-size-base);
  border-radius: var(--radius-lg);
}

.btn-lg {
  padding: var(--spacing-4) var(--spacing-8);
  font-size: var(--font-size-lg);
  border-radius: var(--radius-xl);
}

.btn-block {
  width: 100%;
}

.btn-loading {
  pointer-events: none;
}

.btn-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid var(--color-white);
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
