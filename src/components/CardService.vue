<template>
  <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 max-w-sm mx-auto">
    <!-- Header con gradiente -->
    <div class="bg-gradient-to-r from-lime-300 to-cyan-600 px-6 py-4 text-white relative">
      <div class="flex items-center justify-between mb-2">
        <h3 class="font-semibold text-lg">{{ planType }}</h3>
        <div v-if="showBadge" class="bg-white bg-opacity-20 rounded-full p-1">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>

      <!-- Velocidad anterior tachada (opcional) -->
      <div v-if="previousSpeed" class="text-white text-opacity-60 text-sm line-through mb-1">
        {{ previousSpeed }} Mbps
      </div>

      <!-- Velocidad principal -->
      <div class="text-3xl font-bold mb-1">
        {{ speed }} Mbps
      </div>

      <!-- Descripción de velocidad -->
      <div class="text-white text-opacity-90 text-sm">
        {{ speedDescription }}
      </div>
    </div>

    <!-- Contenido principal -->
    <div class="p-6">
      <!-- Precio -->
      <div class="text-center mb-6">
        <div class="text-3xl font-bold text-gray-900 mb-1">
          S/ {{ price }}
          <span class="text-lg font-normal text-gray-600">{{ priceFrequency }}</span>
        </div>
      </div>

      <!-- Botón principal -->
      <button
        @click="handlePurchase"
        class="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 mb-4"
      >
        {{ buttonText }}
      </button>

      <!-- Información adicional -->
      <div v-if="installationInfo" class="flex items-center justify-center text-cyan-600 text-sm mb-4 bg-cyan-50 rounded-lg py-2 px-3">
        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        {{ installationInfo }}
      </div>

      <!-- Características del plan -->
      <div class="space-y-3">
        <div class="flex items-center text-gray-700">
          <div class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
            <svg class="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clip-rule="evenodd" />
          </svg>
          </div>
          <div>
            <div class="font-medium text-gray-900">{{ serviceType }}</div>
            <div class="text-sm text-gray-600">Máx de descarga {{ downloadSpeed }} Mbps</div>
            <div class="text-sm text-gray-600">Máx de subida {{ uploadSpeed }} Mbps</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InternetPlanCard',
  props: {
    planType: {
      type: String,
      default: 'Internet Fibra Óptica'
    },
    previousSpeed: {
      type: String,
      default: null // e.g., "150"
    },
    speed: {
      type: String,
      required: true // e.g., "200"
    },
    speedDescription: {
      type: String,
      default: 'Velocidad simétrica'
    },
    price: {
      type: String,
      required: true // e.g., "69.90"
    },
    priceFrequency: {
      type: String,
      default: 'al mes'
    },
    buttonText: {
      type: String,
      default: 'Comprar online'
    },
    installationInfo: {
      type: String,
      default: 'Instalación desde 24 horas!'
    },
    serviceType: {
      type: String,
      default: 'Velocidad de internet Fibra'
    },
    downloadSpeed: {
      type: String,
      default: '200'
    },
    uploadSpeed: {
      type: String,
      default: '200'
    },
    showBadge: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handlePurchase() {
      this.$emit('purchase', {
        planType: this.planType,
        speed: this.speed,
        price: this.price
      })
    }
  }
}
</script>

<style scoped>
/* Animaciones suaves */
.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

/* Sombras personalizadas */
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.hover\:shadow-xl:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Gradientes personalizados */
.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}
</style>
