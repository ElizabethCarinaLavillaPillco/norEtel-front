<template>
  <section class="hero-carousel">
    <div class="carousel-container" @mouseenter="pauseAutoplay" @mouseleave="resumeAutoplay">
      <!-- Carrusel -->
      <div class="carousel-track" :style="trackStyle">
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="carousel-slide"
          :class="{ active: currentIndex === index }"
        >
          <div class="hero-content container">
            <div class="hero-text">
              <div v-if="slide.badge" class="hero-badge" :style="badgeStyle(slide)">
                {{ slide.badge }}
              </div>
              <h1 class="hero-title">{{ slide.title }}</h1>
              <p class="hero-subtitle">{{ slide.subtitle }}</p>
              <div class="hero-price">
                <span class="price-current">{{ slide.price }}</span>
                <span v-if="slide.oldPrice" class="price-old">{{ slide.oldPrice }}</span>
                <span class="price-period">{{ slide.period }}</span>
              </div>
              <div class="hero-actions">
                <ButtonPrimary size="lg" class="hero-btn">Más Info</ButtonPrimary>
                <ButtonSecondary size="lg" class="hero-btn">Lo quiero</ButtonSecondary>
              </div>

              <!-- Controles del carrusel debajo del texto -->
              <div class="carousel-controls">
                <div class="carousel-indicators">
                  <button
                    v-for="(_, index) in slides"
                    :key="index"
                    class="indicator"
                    :class="{ active: currentIndex === index }"
                    @click="goToSlide(index)"
                  ></button>
                </div>

                <div class="carousel-navigation">
                  <button class="carousel-control prev" @click="prevSlide">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fill-rule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <button class="autoplay-toggle" @click="toggleAutoplay">
                    <svg v-if="isPlaying" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <svg v-else viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <button class="carousel-control next" @click="nextSlide">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div class="hero-image">
              <div class="image-gradient" :style="gradientStyle(slide)"></div>
              <img :src="slide.image" :alt="slide.title" class="slide-image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import fibra from '@/assets/images/banners/fibra3.png'
import g5 from '@/assets/images/banners/5g.png'
import familiar from '@/assets/images/banners/familia.png'
import amigo from '@/assets/images/banners/amigo.png'
import soporte from '@/assets/images/banners/soporte-tecnico.png'

import { ref, computed, onMounted, onUnmounted } from 'vue'
import ButtonPrimary from '@/components/ui/ButtonPrimary.vue'
import ButtonSecondary from '@/components/ui/ButtonSecondary.vue'

const currentIndex = ref(0)
const isPlaying = ref(true)
const autoplayInterval = ref(null)

const slides = ref([
  {
    title: '¡Más velocidad y full entretenimiento con la fibra Óptica de NorEtel!',
    subtitle: '1000 Mbps - Fibra 600Mb + 2 líneas ilimitadas',
    price: 's/.99.90',
    oldPrice: 's/.138.90',
    period: '/mes',
    badge: 'Precio final',
    image: fibra,
    gradient: 'linear-gradient(to left, rgba(0,0,0,0), rgba(0,0,0,0.5))',
  },
  {
    title: 'Internet portátil 4G/5G + Whatsapp/Facebook ilimitada',
    subtitle: 'Conéctate donde quieras. Primeros 50GB a velocidad 5G',
    price: 's/.90',
    oldPrice: 's/.138.90',
    period: '/mes',
    badge: 'Precio final',
    image: g5,
    gradient: 'linear-gradient(to left, rgba(0,0,0,0), rgba(0,0,0,0.5))',
  },
  {
    title: 'Aprovecha el Plan Familiar con 2 líneas ilimitadas y TV',
    subtitle: 'Fibra 600Mb, 2 líneas ilimitadas y TV.',
    price: 's/.110',
    oldPrice: 's/.138.90',
    period: '/mes',
    badge: '31% Últimos días',
    image: familiar,
    gradient: 'linear-gradient(to left, rgba(0,0,0,0), rgba(0,0,0,0.5))',
  },
  {
    title: 'Aprovecha el 50% de descuento si contrata el Plan Amigo',
    subtitle: 'Referencia a un amigo y ambos obtienen descuento',
    price: 's/.110',
    oldPrice: 's/.138.90',
    period: '/mes',
    badge: '49% Todo este mes',
    image: amigo,
    gradient: 'linear-gradient(to left, rgba(0,0,0,0), rgba(0,0,0,0.5))',
  },
  {
    title: 'Contacta a nuestro equipo especializado de Soporte Técnico 24/7',
    subtitle: 'Asistencia especializada las 24 horas',
    price: 'GRATIS',
    period: '/para clientes',
    badge: 'Soporte técnico',
    image: soporte,
    gradient: 'linear-gradient(to left, rgba(0,0,0,0), rgba(0,0,0,0.5))',
  },
])

const trackStyle = computed(() => ({
  transform: `translateX(-${currentIndex.value * 100}%)`,
}))

const badgeStyle = (slide) => ({
  backgroundColor: slide.badgeColor,
})

const gradientStyle = (slide) => ({
  background: slide.gradient,
})

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.value.length
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + slides.value.length) % slides.value.length
}

const goToSlide = (index) => {
  currentIndex.value = index
}

const startAutoplay = () => {
  autoplayInterval.value = setInterval(nextSlide, 5000)
}

const stopAutoplay = () => {
  clearInterval(autoplayInterval.value)
}

const pauseAutoplay = () => {
  if (isPlaying.value) {
    stopAutoplay()
  }
}

const resumeAutoplay = () => {
  if (isPlaying.value) {
    startAutoplay()
  }
}

const toggleAutoplay = () => {
  isPlaying.value = !isPlaying.value
  if (isPlaying.value) {
    startAutoplay()
  } else {
    stopAutoplay()
  }
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<style scoped>
.hero-carousel {
  position: relative;
  height: 500px;
  overflow: hidden;
}

.carousel-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.carousel-track {
  display: flex;
  height: 100%;
  transition: transform 0.5s ease-in-out;
}

.carousel-slide {
  min-width: 100%;
  height: 100%;
  position: relative;
}

.carousel-slide:nth-child(1) {
  background: var(--gradient-accent);
}

.carousel-slide:nth-child(2) {
  background: var(--gradient-accent-reverse);
}

.carousel-slide:nth-child(3) {
  background: var(--gradient-accent);
}

.carousel-slide:nth-child(4) {
  background: var(--gradient-accent-reverse);
}

.carousel-slide:nth-child(5) {
  background: var(--gradient-accent);
}

/* Degradado inferior para desvanecer a blanco/transparente */
.carousel-slide::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 150px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.7) 70%,
    rgba(255, 255, 255, 1) 100%
  );
  pointer-events: none;
  z-index: 2;
}

.hero-content {
  display: grid;
  width: 100%;
  grid-template-columns: 6.5fr 3.5fr;
  height: 100%;
}

.hero-text {
  color: var(--color-white);
  z-index: 3;
  position: relative;
  gap: var(--spacing-8);
  align-items: center;

  padding: var(--spacing-10) 0;
}

.hero-badge {
  display: inline-block;
  padding: var(--spacing-1) var(--spacing-3);
  background: var(--color-secondary);
  color: var(--color-white);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--radius-full);
  margin-bottom: var(--spacing-4);
}

.hero-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  margin: 0 0 var(--spacing-4) 0;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: var(--font-size-lg);
  margin: 0 0 0 0;
  opacity: 0.9;
}

.hero-price {
  display: flex;
  align-items: baseline;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-6);
}

.price-current {
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
}

.price-old {
  font-size: var(--font-size-xl);
  text-decoration: line-through;
  color: rgba(255, 255, 255, 0.7);
}

.price-period {
  font-size: var(--font-size-base);
  opacity: 0.9;
}

.hero-actions {
  display: flex;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-8);
}

.hero-btn {
  min-width: 150px;
}

/* Controles del carrusel debajo del texto */
.carousel-controls {
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: var(--spacing-4);
  z-index: 3;
  position: relative;
}

.carousel-indicators {
  display: flex;
  gap: var(--spacing-2);
}

.indicator {
  width: 10px;
  height: 10px;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.5);
  border: none;
  cursor: pointer;
  transition: all var(--transition-base);
}

.indicator.active {
  background: var(--color-white);
  width: 30px;
  border-radius: var(--radius-full);
}

.carousel-navigation {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
}

.carousel-control {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  border: none;
  border-radius: var(--radius-full);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-base);
}

.carousel-control:hover {
  background: rgba(255, 255, 255, 0.3);
}

.autoplay-toggle {
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  border: none;
  border-radius: var(--radius-full);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-base);
}

.autoplay-toggle:hover {
  background: rgba(255, 255, 255, 0.3);
}

.autoplay-toggle svg {
  width: 20px;
  height: 20px;
}

.hero-image {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: contain; /* No distorsiona */
  object-position: center;
}

.image-gradient {
  left: -60%;
  width: 60%;
}

@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-image {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .carousel-controls {
    margin-top: var(--spacing-4);
    justify-content: center;
    align-items: center;
  }
}

@media (max-width: 768px) {
  .hero-carousel {
    height: 460px;
  }

  .hero-title {
    font-size: var(--font-size-3xl);
  }

  .hero-subtitle {
    font-size: var(--font-size-base);
  }

  .hero-price {
    justify-content: center;
  }

  .hero-actions {
    justify-content: center;
    align-items: center;
  }

  .carousel-navigation {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
