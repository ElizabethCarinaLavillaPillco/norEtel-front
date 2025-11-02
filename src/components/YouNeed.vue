<template>
  <section class="w-full bg-gradient-to-br from-lime-50 to-cyan-50 py-16 px-6 relative overflow-hidden">
    <!-- Elementos decorativos de fondo -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-10 left-10 w-4 h-4 bg-lime-400 rounded-full"></div>
      <div class="absolute top-32 left-32 w-2 h-2 bg-cyan-400 rounded-full"></div>
      <div class="absolute bottom-20 right-20 w-3 h-3 bg-lime-300 rounded-full"></div>
      <div class="absolute bottom-40 right-40 w-6 h-6 bg-cyan-300 rounded-full"></div>
    </div>

    <div class="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.2fr_1fr] gap-8 items-center relative">
      <!-- Columna izquierda - Título y botón -->
      <div class="text-left space-y-8 relative">
        <!-- Estrellas decorativas -->
        <svg class="absolute -top-4 -left-4 w-5 h-5 text-blue-400 opacity-60" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 0l2.39 6.91L20 10l-7.61 3.09L10 20l-2.39-6.91L0 10l7.61-3.09L10 0z" />
        </svg>

        <svg class="absolute top-8 right-4 w-3 h-3 text-cyan-400 opacity-60" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 0l2.39 6.91L20 10l-7.61 3.09L10 20l-2.39-6.91L0 10l7.61-3.09L10 0z" />
        </svg>

        <!-- Título -->
        <h2 class="text-4xl lg:text-5xl font-bold text-[#003772] leading-tight">
          ¡Aprovechá<br>
          los beneficios!
        </h2>

        <!-- Elemento decorativo adicional -->
        <div class="absolute -bottom-2 left-8 w-12 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>

        <svg class="absolute bottom-4 right-0 w-4 h-4 text-blue-400 opacity-40" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 0l2.39 6.91L20 10l-7.61 3.09L10 20l-2.39-6.91L0 10l7.61-3.09L10 0z" />
        </svg>

        <!-- Botón -->
        <div class="pt-4">
          <button
            @click="handlePlanClick"
            class="bg-gradient-to-r from-cyan-600 to-cyan-600 hover:from-lime-600 hover:to-lime-600 text-white font-bold px-8 py-4 rounded-full flex items-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            ARMAR MI PLAN
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Columna central - Lista de beneficios -->
      <div class="space-y-4 z-10 flex flex-col items-start">
        <div
          v-for="(benefit, index) in benefits"
          :key="benefit.id"
          class="flex items-center gap-4 bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-sm hover:shadow-md transition-all duration-300 border border-lime-100 w-full max-w-md"
          :class="[
            index === 0 ? 'self-start' : '',
            index === 1 ? 'self-center' : '',
            index === 2 ? 'self-start' : ''
          ]"
        >
          <!-- Icono circular con borde punteado -->
          <div class="relative flex-shrink-0">
            <div class="w-12 h-12 rounded-full border-2 border-dashed border-lime-400 flex items-center justify-center bg-white">
              <!-- Icono de dinero/ahorro -->
              <svg v-if="benefit.id === 1" class="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
              </svg>

              <!-- Icono de configuración/personalización -->
              <svg v-else-if="benefit.id === 2" class="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/>
              </svg>

              <!-- Icono de smartphone/móvil -->
              <svg v-else-if="benefit.id === 3" class="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17,19H7V5H17M17,1H7C5.89,1 5,1.89 5,3V21C5,22.11 5.89,23 7,23H17C18.11,23 19,22.11 19,21V3C19,1.89 18.11,1 17,1Z"/>
              </svg>
            </div>
          </div>

          <!-- Texto del beneficio -->
          <p class="text-gray-700 font-medium text-sm leading-relaxed flex-1">
            {{ benefit.text }}
          </p>
        </div>
      </div>

      <!-- Columna derecha - Imagen con fondo circular -->
      <div class="flex justify-center relative">
        <!-- Fondo circular decorativo -->
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-80 h-80 bg-gradient-to-br from-cyan-200/40 to-blue-200/40 rounded-full blur-sm"></div>
        </div>

        <!-- Círculo de fondo más pequeño -->
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-72 h-72 bg-gradient-to-tr from-cyan-300/30 to-blue-300/30 rounded-full"></div>
        </div>

        <!-- Imagen principal -->
        <div class="relative z-10">
          <img
            :src="userImage"
            alt="Mujer feliz con lentes naranjas y chaqueta amarilla"
            class="w-64 h-64 lg:w-72 lg:h-72 object-cover rounded-full shadow-xl border-4 border-white"
          />

          <!-- Elementos decorativos alrededor de la imagen -->
          <div class="absolute -top-4 -right-4 w-8 h-8 bg-red-600 rounded-full opacity-80 animate-pulse"></div>
          <div class="absolute -bottom-2 -left-2 w-6 h-6 bg-orange-400 rounded-full "></div>
          <div class="absolute top-8 -left-6 w-4 h-4 bg-cyan-400 rounded-full opacity-60"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// Datos reactivos
const benefits = ref([
  {
    id: 1,
    text: 'Ahorra dinero pagando solo por lo que necesitas'
  },
  {
    id: 2,
    text: 'Adapta tu plan a tu estilo de vida'
  },
  {
    id: 3,
    text: 'Elimina lo innecesario, enfócate en lo importante'
  }
])

const userImage = ref('/img/cables.png')

// Métodos
const handlePlanClick = () => {
  console.log('Armar mi plan clicked')
  // Aquí puedes agregar tu lógica de navegación
}

</script>

<style scoped>
/* Animaciones personalizadas */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Efectos de hover adicionales */
.benefit-card:hover {
  transform: translateY(-2px);
}
</style>
