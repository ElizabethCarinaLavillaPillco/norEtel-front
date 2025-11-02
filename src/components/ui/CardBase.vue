<template>
  <div
    :class="['card-base', variant, { 'card-hoverable': hoverable, 'card-clickable': clickable }]"
    @click="handleClick"
  >
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (val) => ['default', 'elevated', 'outlined', 'flat'].includes(val),
  },
  hoverable: Boolean,
  clickable: Boolean,
})

const emit = defineEmits(['click'])

const handleClick = (e) => {
  if (props.clickable) {
    emit('click', e)
  }
}
</script>

<style scoped>
.card-base {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
}

.card-base::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--gradient-primary);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--transition-base);
}

.card-base:hover::before {
  transform: scaleX(1);
}

.card-base.default {
  box-shadow: var(--shadow-md);
}

.card-base.elevated {
  box-shadow: var(--shadow-lg);
}

.card-base.outlined {
  border: 2px solid var(--color-gray-200);
  box-shadow: none;
}

.card-base.flat {
  box-shadow: none;
}

.card-hoverable:hover {
  box-shadow: var(--shadow-xl);
  transform: translateY(-4px);
}

.card-clickable {
  cursor: pointer;
}
</style>
