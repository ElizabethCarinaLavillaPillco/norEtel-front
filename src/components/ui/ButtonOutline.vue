<template>
  <button
    :class="['btn', 'btn-outline', sizeClass, { 'btn-loading': loading, 'btn-block': block }]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="btn-spinner-outline"></span>
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
.btn-outline {
  background: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: all var(--transition-base);
}

.btn-outline::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--gradient-primary);
  transform: translateX(-100%);
  transition: transform var(--transition-base);
  z-index: -1;
}

.btn-outline:hover:not(:disabled) {
  color: var(--color-white);
  transform: translateY(-2px);
  box-shadow: var(--shadow-primary);
}

.btn-outline:hover:not(:disabled)::before {
  transform: translateX(0);
}

.btn-outline:active:not(:disabled) {
  transform: translateY(0);
}

.btn-outline:disabled {
  opacity: 0.6;
  cursor: not-allowed;
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

.btn-spinner-outline {
  width: 16px;
  height: 16px;
  border: 2px solid var(--color-primary);
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
