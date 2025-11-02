<template>
  <section class="w-full bg-gradient-to-br bg-white to-green-50 py-16 px-6 relative overflow-hidden">
    <!-- Elementos decorativos de fondo -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-10 left-10 w-4 h-4 bg-lime-400 rounded-full"></div>
      <div class="absolute top-32 left-32 w-2 h-2 bg-cyan-400 rounded-full"></div>
      <div class="absolute bottom-20 right-20 w-3 h-3 bg-lime-300 rounded-full"></div>
      <div class="absolute bottom-40 right-40 w-6 h-6 bg-cyan-300 rounded-full"></div>
    </div>

    <div class="max-w-7xl mx-auto">
      <!-- Título principal -->
      <div class="text-center mb-16 relative">
        <!-- Elementos decorativos alrededor del título -->
        <svg class="absolute -top-6 left-1/2 transform -translate-x-12 w-6 h-6 text-[#0d3d7e] opacity-60" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 0l2.39 6.91L20 10l-7.61 3.09L10 20l-2.39-6.91L0 10l7.61-3.09L10 0z" />
        </svg>

        <svg class="absolute -top-4 right-1/2 transform translate-x-12 w-4 h-4 text-[#b3c648] opacity-60" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 0l2.39 6.91L20 10l-7.61 3.09L10 20l-2.39-6.91L0 10l7.61-3.09L10 0z" />
        </svg>

        <h2 class="text-3xl lg:text-4xl font-bold text-[#003772] leading-tight mb-4">
          ¿Por qué elegir<br>
          <span class="text-[#0d3d7e]">NorEtel Hogar</span>?
        </h2>

        <!-- Línea decorativa -->
        <div class="w-24 h-1 bg-gradient-to-r from-[#b3c648] to-[#8da634] rounded-full mx-auto"></div>
      </div>

      <!-- Grid de servicios -->
      <div class="grid md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
        <!-- Servicio 1: Atención 24/7 -->
        <div class="group">
          <div class="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 h-full flex flex-col items-center text-center hover:transform hover:scale-105">
            <!-- Contenedor del icono con reflejo -->
            <div class="relative mb-6">
              <!-- Icono principal -->
              <div class="w-16 h-16 bg-gradient-to-br from-lime-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                <!-- Icono de soporte 24/7 -->
                <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
                  <path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z"/>
                </svg>
              </div>

              <!-- Reflejo sutil -->
              <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-12 h-3 bg-gradient-to-b from-lime-400/20 to-transparent rounded-full blur-sm"></div>
            </div>

            <!-- Contenido -->
            <h3 class="text-xl font-bold text-[#003772] mb-4">Atención 24/7</h3>
            <p class="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
              Soporte técnico especializado disponible las 24 horas del día, los 7 días de la semana para resolver cualquier consulta.
            </p>
          </div>
        </div>

        <!-- Servicio 2: Alta Velocidad -->
        <div class="group">
          <div class="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 h-full flex flex-col items-center text-center hover:transform hover:scale-105">
            <!-- Contenedor del icono con reflejo -->
            <div class="relative mb-6">
              <!-- Icono principal -->
              <div class="w-16 h-16 bg-gradient-to-br from-cyan-400 to-lime-400 rounded-2xl flex items-center justify-center shadow-lg">
                <!-- Icono de velocidad -->
                <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.38 8.57l-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6.85l1.85-1.23A10 10 0 0 0 3.35 19a2 2 0 0 0 1.72 1h13.85a2 2 0 0 0 1.74-1 10 10 0 0 0-.27-10.44z"/>
                  <path d="M10.59 15.41a2 2 0 0 0 2.83 0l5.66-8.49-8.49 5.66a2 2 0 0 0 0 2.83z"/>
                </svg>
              </div>

              <!-- Reflejo sutil -->
              <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-12 h-3 bg-gradient-to-b from-cyan-400/20 to-transparent rounded-full blur-sm"></div>
            </div>

            <!-- Contenido -->
            <h3 class="text-xl font-bold text-[#003772] mb-4">Alta Velocidad</h3>
            <p class="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
              Conexión de fibra óptica ultrarrápida hasta 1000 Mbps para disfrutar streaming, gaming y trabajo sin interrupciones.
            </p>
          </div>
        </div>

        <!-- Servicio 3: NorEtel Club -->
        <div class="group">
          <div class="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 h-full flex flex-col items-center text-center hover:transform hover:scale-105">
            <!-- Contenedor del icono con reflejo -->
            <div class="relative mb-6">
              <!-- Icono principal -->
              <div class="w-16 h-16 bg-gradient-to-br from-lime-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                <!-- Icono de club/membresía -->
                <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>

              <!-- Reflejo sutil -->
              <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-12 h-3 bg-gradient-to-b from-lime-500/20 to-transparent rounded-full blur-sm"></div>
            </div>

            <!-- Contenido -->
            <h3 class="text-xl font-bold text-[#003772] mb-4">NorEtel Club</h3>
            <p class="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
              Accede a beneficios exclusivos, descuentos especiales y promociones únicas siendo parte de nuestra comunidad VIP.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Animaciones personalizadas */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}

.group:hover .animate-float {
  animation: float 2s ease-in-out infinite;
}

/* Efectos de brillo en hover */
.group:hover .shadow-lg {
  box-shadow: 0 25px 50px -12px rgba(13, 61, 126, 0.15);
}

/* Transiciones suaves para los iconos */
.group:hover svg {
  transform: scale(1.1);
  transition: transform 0.3s ease;
}
</style>
