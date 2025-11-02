<template>
  <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 max-w-sm mx-auto border border-gray-200">
    <!-- Recommended Badge -->
    <div v-if="isRecommended" class="bg-blue-500 text-white text-center py-2 px-4 text-sm font-medium flex items-center justify-center">
      <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
      {{ recommendedText }}
    </div>

    <!-- Header con información del plan -->
    <div class="bg-gradient-to-br from-blue-600 to-blue-700 px-6 py-6 text-white">
      <div class="flex items-center justify-between mb-3">
        <h3 class="font-semibold text-lg">{{ planType }}</h3>
        <div v-if="showInfoIcon" class="bg-white bg-opacity-20 rounded-full p-1">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>

      <!-- Velocidad principal -->
      <div class="text-4xl font-bold mb-2">
        {{ speed }} Mbps
      </div>

      <!-- Descripción de velocidad -->
      <div class="text-blue-100 text-sm mb-4">
        {{ speedDescription }}
      </div>

      <!-- Banner promocional -->
      <div v-if="promotionalBanner" class="bg-purple-600 text-white text-center py-2 px-4 rounded-lg text-sm font-medium">
        {{ promotionalBanner }}
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
        <div v-if="regularPrice" class="text-sm text-gray-500">
          Precio regular S/ {{ regularPrice }} {{ discountText }}
        </div>
      </div>

      <!-- Servicio adicional (como Movistar TV) -->
      <div v-if="additionalService" class="flex items-center justify-center mb-4 p-3 bg-gray-50 rounded-lg">
        <div class="w-8 h-8 bg-blue-500 rounded mr-3 flex items-center justify-center">
          <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
          </svg>
        </div>
        <span class="text-sm text-gray-700 font-medium">{{ additionalService }}</span>
      </div>

      <!-- Botón principal -->
      <button
        @click="handlePurchase"
        class="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 mb-4 shadow-md"
      >
        {{ buttonText }}
      </button>

      <!-- Información de instalación -->
      <div v-if="installationInfo" class="flex items-center justify-center text-blue-600 text-sm mb-6 bg-blue-50 rounded-lg py-3 px-4 border border-blue-100">
        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        {{ installationInfo }}
      </div>

      <!-- Características del plan -->
      <div class="space-y-3">
        <div class="flex items-center text-gray-700">
          <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
            <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clip-rule="evenodd" />
            </svg>
          </div>
          <div>
            <div class="font-semibold text-gray-900">{{ serviceType }}</div>
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
    speed: {
      type: String,
      required: true // e.g., "400"
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
      default: 'x 2 meses'
    },
    regularPrice: {
      type: String,
      default: null // e.g., "89.90"
    },
    discountText: {
      type: String,
      default: 'S/ 20 dto.'
    },
    buttonText: {
      type: String,
      default: 'Comprar online'
    },
    installationInfo: {
      type: String,
      default: '¡Instalación desde 24 horas!'
    },
    serviceType: {
      type: String,
      default: 'Velocidad de internet Fibra'
    },
    downloadSpeed: {
      type: String,
      default: '400'
    },
    uploadSpeed: {
      type: String,
      default: '400'
    },
    showInfoIcon: {
      type: Boolean,
      default: true
    },
    isRecommended: {
      type: Boolean,
      default: true
    },
    recommendedText: {
      type: String,
      default: 'Plan recomendado'
    },
    promotionalBanner: {
      type: String,
      default: '1000 Mbps GRATIS x 1 año'
    },
    additionalService: {
      type: String,
      default: 'Movistar TV App Lite'
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

.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Gradientes personalizados */
.bg-gradient-to-r,
.bg-gradient-to-br {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}

.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}
</style>
