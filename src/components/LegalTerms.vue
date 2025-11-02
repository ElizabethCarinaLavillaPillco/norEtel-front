<template>
  <div class="max-w-4xl mx-auto p-6 bg-white">
    <!-- Sección de Términos y Condiciones -->
    <div class="bg-white rounded-lg border-t-4 border-blue-500">
      <!-- Header clickeable -->
      <div
        @click="toggleTerms"
        class="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 transition-colors duration-200 rounded-t-lg"
      >
        <div class="flex items-center">
          <svg class="w-5 h-5 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
          </svg>
          <h3 class="text-lg font-semibold text-gray-900">Términos y Condiciones del Servicio</h3>
        </div>

        <!-- Icono de flecha que rota -->
        <svg
          :class="['w-5 h-5 text-gray-500 transition-transform duration-300', { 'rotate-180': isTermsOpen }]"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </div>

      <!-- Contenido desplegable -->
      <div
        :class="['overflow-hidden transition-all duration-500 ease-in-out', { 'max-h-0': !isTermsOpen, 'max-h-screen': isTermsOpen }]"
      >
        <div class="px-6 pb-6 bg-white">
          <div class="pt-4 space-y-6 text-gray-700 text-sm leading-relaxed border-t border-gray-300">

            <!-- Información de la empresa -->
            <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <h4 class="font-semibold text-blue-900 mb-2">FiberNet Perú S.A.C.</h4>
              <p class="text-blue-800">
                Proveedor líder de servicios de internet de fibra óptica en el Perú.
                RUC: 20123456789 | Av. Tecnología 123, San Isidro, Lima
              </p>
            </div>

            <!-- Sección 1: Servicios -->
            <div>
              <h4 class="font-semibold text-gray-900 mb-3">1. Descripción del Servicio</h4>
              <ul class="space-y-2 ml-4">
                <li class="flex items-start">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>FiberNet proporciona servicios de acceso a internet de alta velocidad mediante tecnología de fibra óptica.</span>
                </li>
                <li class="flex items-start">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Las velocidades anunciadas son velocidades máximas teóricas y pueden variar según factores técnicos y de red.</span>
                </li>
                <li class="flex items-start">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>El servicio incluye soporte técnico 24/7 y mantenimiento preventivo de la red.</span>
                </li>
              </ul>
            </div>

            <!-- Sección 2: Instalación -->
            <div>
              <h4 class="font-semibold text-gray-900 mb-3">2. Instalación y Equipos</h4>
              <ul class="space-y-2 ml-4">
                <li class="flex items-start">
                  <span class="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>La instalación se realizará en un plazo de 24 a 72 horas hábiles, sujeto a disponibilidad técnica.</span>
                </li>
                <li class="flex items-start">
                  <span class="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Los equipos proporcionados (módem, router) permanecen como propiedad de FiberNet.</span>
                </li>
                <li class="flex items-start">
                  <span class="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>El cliente es responsable del cuidado y mantenimiento básico de los equipos instalados.</span>
                </li>
              </ul>
            </div>

            <!-- Sección 3: Facturación -->
            <div>
              <h4 class="font-semibold text-gray-900 mb-3">3. Facturación y Pagos</h4>
              <ul class="space-y-2 ml-4">
                <li class="flex items-start">
                  <span class="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Los pagos se realizan mensualmente por adelantado, con vencimiento el día 15 de cada mes.</span>
                </li>
                <li class="flex items-start">
                  <span class="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Aceptamos pagos mediante transferencia bancaria, tarjetas de crédito/débito y efectivo en oficinas autorizadas.</span>
                </li>
                <li class="flex items-start">
                  <span class="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Los precios promocionales son válidos por el tiempo especificado en la oferta contratada.</span>
                </li>
              </ul>
            </div>

            <!-- Sección 4: Responsabilidades -->
            <div>
              <h4 class="font-semibold text-gray-900 mb-3">4. Responsabilidades del Cliente</h4>
              <ul class="space-y-2 ml-4">
                <li class="flex items-start">
                  <span class="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Proporcionar acceso seguro al inmueble para instalación y mantenimiento.</span>
                </li>
                <li class="flex items-start">
                  <span class="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>No utilizar el servicio para actividades ilegales o que violenten derechos de terceros.</span>
                </li>
                <li class="flex items-start">
                  <span class="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Reportar inmediatamente cualquier falla o problema técnico del servicio.</span>
                </li>
              </ul>
            </div>

            <!-- Sección 5: Suspensión -->
            <div>
              <h4 class="font-semibold text-gray-900 mb-3">5. Suspensión del Servicio</h4>
              <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p class="text-yellow-800">
                  <strong>FiberNet se reserva el derecho de suspender el servicio en los siguientes casos:</strong>
                </p>
                <ul class="mt-2 space-y-1 ml-4 text-yellow-700">
                  <li>• Falta de pago por más de 15 días después del vencimiento</li>
                  <li>• Uso indebido del servicio o violación de estos términos</li>
                  <li>• Mantenimiento programado de la red (con previo aviso)</li>
                  <li>• Casos de fuerza mayor o emergencias técnicas</li>
                </ul>
              </div>
            </div>

            <!-- Sección 6: Cancelación -->
            <div>
              <h4 class="font-semibold text-gray-900 mb-3">6. Cancelación del Contrato</h4>
              <p class="mb-3">
                El cliente puede cancelar el servicio con un aviso previo de 30 días calendario.
                La cancelación debe ser solicitada por escrito o a través de nuestros canales oficiales.
              </p>
              <div class="bg-red-50 p-3 rounded border-l-4 border-red-400">
                <p class="text-red-800 text-sm">
                  <strong>Importante:</strong> La cancelación antes del tiempo mínimo de permanencia
                  (12 meses) generará una penalidad equivalente al 50% de las cuotas restantes.
                </p>
              </div>
            </div>

            <!-- Contacto -->
            <div class="bg-gray-100 p-4 rounded-lg mt-6">
              <h4 class="font-semibold text-gray-900 mb-2">Contacto y Soporte</h4>
              <div class="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Teléfono:</strong> (01) 555-FIBER</p>
                  <p><strong>WhatsApp:</strong> +51 999 123 456</p>
                </div>
                <div>
                  <p><strong>Email:</strong> soporte@fibernet.com.pe</p>
                  <p><strong>Web:</strong> www.fibernet.com.pe</p>
                </div>
              </div>
            </div>

            <!-- Fecha de actualización -->
            <div class="text-center pt-4 border-t border-gray-200">
              <p class="text-xs text-gray-500">
                Términos y condiciones actualizados el 15 de Mayo de 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  name: 'TermsAndConditions',
  data() {
    return {
      isTermsOpen: false
    }
  },
  methods: {
    toggleTerms() {
      this.isTermsOpen = !this.isTermsOpen
    },
    closeTerms() {
      this.isTermsOpen = false
    }
  },
  mounted() {
    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isTermsOpen) {
        this.closeTerms()
      }
    })
  }
}
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}

.max-h-0 {
  max-height: 0;
}

.max-h-screen {
  max-height: 100vh;
}

/* Smooth transitions */
.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.transition-transform {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.transition-colors {
  transition: color 0.2s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Animación suave para el contenido */
.ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
