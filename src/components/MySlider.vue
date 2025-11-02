<template>
  <br>
  <div class="hero-slider-container">
    <div class="slider-wrapper">
      <!-- Slide 1 -->
      <div
        class="slide"
        :class="{ active: currentSlide === 0 }"
        v-if="currentSlide === 0 || isTransitioning"
      >
        <div class="slide-background slide-bg-1"></div>
        <div class="floating-shapes">
          <div class="house-shape house-1">
            <div class="house-base"></div>
            <div class="house-roof"></div>
            <div class="wifi-icon">
              <div class="wifi-arc wifi-arc-1"></div>
              <div class="wifi-arc wifi-arc-2"></div>
              <div class="wifi-arc wifi-arc-3"></div>
              <div class="wifi-dot"></div>
            </div>
          </div>
          <div class="house-shape house-2">
            <div class="house-base"></div>
            <div class="house-roof"></div>
            <div class="wifi-icon">
              <div class="wifi-arc wifi-arc-1"></div>
              <div class="wifi-arc wifi-arc-2"></div>
              <div class="wifi-arc wifi-arc-3"></div>
              <div class="wifi-dot"></div>
            </div>
          </div>
          <div class="house-shape house-3">
            <div class="house-base"></div>
            <div class="house-roof"></div>
            <div class="wifi-icon">
              <div class="wifi-arc wifi-arc-1"></div>
              <div class="wifi-arc wifi-arc-2"></div>
              <div class="wifi-arc wifi-arc-3"></div>
              <div class="wifi-dot"></div>
            </div>
          </div>
          <div class="cloud cloud-1"></div>
          <div class="cloud cloud-2"></div>
          <div class="connection-line line-1"></div>
          <div class="connection-line line-2"></div>
        </div>
        <div class="slide-content">
          <div class="content-wrapper">
            <div class="text-section">

              <h1 class="slide-title">
                <span class="title-line">Internet de alta</span>
                <span class="title-line highlight">velocidad con Noretel</span>
              </h1>
              <p class="slide-description">
                Conectividad ultra rápida para tu hogar y empresa con la mejor tecnología
              </p>
              <button class="cta-button">
                <span>Contratar ahora</span>
                <svg class="button-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
            <div class="image-section">
              <div class="floating-image-container">
                <img src="/img/nosotros.png" alt="Asesora Noretel" class="advisor-image" />
                <div class="floating-bubble bubble-1">
                  <div class="bubble-content">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M1 3h22l-2 18H3L1 3z" stroke="currentColor" stroke-width="2"/>
                      <path d="M7 8v8M17 8v8" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    <span>Fibra óptica</span>
                  </div>
                </div>
                <div class="floating-bubble bubble-2">
                  <div class="bubble-content">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2"/>
                      <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    <span>24/7</span>
                  </div>
                </div>
                <div class="floating-bubble bubble-3">
                  <div class="bubble-content">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    <span>Premium</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Slide 2 -->
      <div
        class="slide"
        :class="{ active: currentSlide === 1 }"
        v-if="currentSlide === 1 || isTransitioning"
      >
        <div class="slide-background slide-bg-2"></div>
        <div class="floating-tech-elements">
          <div class="fiber-cable fiber-2"></div>
          <div class="data-packet packet-1">
            <div class="packet-inner"></div>
          </div>
          <div class="data-packet packet-2">
            <div class="packet-inner"></div>
          </div>
          <div class="data-packet packet-3">
            <div class="packet-inner"></div>
          </div>
          <div class="tech-circle circle-1"></div>
          <div class="tech-circle circle-2"></div>
        </div>
        <div class="slide-content">
          <div class="content-wrapper">
            <div class="text-section">
              <h1 class="slide-title">
                <span class="title-line">Fibra óptica</span>
                <span class="title-line highlight">premium</span>
              </h1>
              <p class="slide-description">
                Tecnología de última generación para una conexión estable y confiable
              </p>
              <button class="cta-button secondary">
                <span>Ver planes</span>
                <svg class="button-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 17l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
            <div class="image-section">
              <div class="floating-tech-container">
                <img src="/img/mujer.png" alt="Especialista técnico" class="advisor-image tech-specialist" />
                <div class="floating-tech-icon">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                    <path d="M1 3h22l-2 18H3L1 3z" stroke="currentColor" stroke-width="2"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                    <path d="M7 8v8M17 8v8" stroke="currentColor" stroke-width="2"/>
                  </svg>
                </div>
                <div class="speed-indicator">
                  <div class="speed-bar bar-1"></div>
                  <div class="speed-bar bar-2"></div>
                  <div class="speed-bar bar-3"></div>
                  <div class="speed-bar bar-4"></div>
                  <span class="speed-text">1000 Mbps</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Slide 3 -->
      <div
        class="slide"
        :class="{ active: currentSlide === 2 }"
        v-if="currentSlide === 2 || isTransitioning"
      >
        <div class="slide-background slide-bg-3"></div>
        <div class="floating-support-elements">
          <div class="support-icon-float icon-1">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M12 2a3 3 0 00-3 3c0 1.5 1.5 3 3 3s3-1.5 3-3a3 3 0 00-3-3z" stroke="currentColor" stroke-width="2"/>
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <div class="support-icon-float icon-2">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
              <polyline points="12,6 12,12 16,14" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <div class="support-icon-float icon-3">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07" stroke="currentColor" stroke-width="2"/>
              <path d="M8.09 9.91a16 16 0 006 6l1.27-1.27" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <div class="availability-badge">24/7</div>
        </div>
        <div class="slide-content">
          <div class="content-wrapper">
            <div class="text-section">
              <h1 class="slide-title">
                <span class="title-line">Soporte técnico</span>
                <span class="title-line highlight">24/7</span>
              </h1>
              <p class="slide-description">
                Asistencia especializada las 24 horas para garantizar tu conectividad
              </p>
              <button class="cta-button tertiary">
                <span>Contactar soporte</span>
                <svg class="button-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07" stroke="currentColor" stroke-width="2"/>
                </svg>
              </button>
            </div>
            <div class="image-section">
              <div class="floating-support-container">
                <img src="/img/joven.png" alt="Soporte técnico" class="advisor-image support-agent" />
                <div class="chat-bubble">
                  <div class="chat-content">
                    <div class="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <p>¿En qué puedo ayudarte?</p>
                  </div>
                </div>
                <div class="status-indicator online">
                  <div class="status-dot"></div>
                  <span>En línea</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Controls -->
    <div class="slider-controls">
      <div class="dots-container">
        <button
          v-for="(slide, index) in slides"
          :key="index"
          class="dot"
          :class="{ active: currentSlide === index }"
          @click="goToSlide(index)"
        >
          <span class="dot-inner"></span>
        </button>
      </div>

      <div class="nav-buttons">
        <button class="nav-button prev" @click="prevSlide" :disabled="currentSlide === 0">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button class="nav-button next" @click="nextSlide" :disabled="currentSlide === slides.length - 1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Progress Bar -->
    <div class="progress-container">
      <div class="progress-bar" :style="{ width: progressWidth + '%' }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeroSlider',
  data() {
    return {
      currentSlide: 0,
      isTransitioning: false,
      autoplayInterval: null,
      slides: [
        {
          title: 'Internet de alta velocidad',
          description: 'Conectividad ultra rápida para tu hogar y empresa con Noretel'
        },
        {
          title: 'Fibra óptica premium',
          description: 'Tecnología de última generación para una conexión estable y confiable'
        },
        {
          title: 'Soporte técnico 24/7',
          description: 'Asistencia especializada las 24 horas para garantizar tu conectividad'
        }
      ]
    }
  },
  computed: {
    progressWidth() {
      return ((this.currentSlide + 1) / this.slides.length) * 100
    }
  },
  mounted() {
    this.startAutoplay()
  },
  beforeUnmount() {
    this.stopAutoplay()
  },
  methods: {
    goToSlide(index) {
      if (index !== this.currentSlide && !this.isTransitioning) {
        this.isTransitioning = true
        this.currentSlide = index

        setTimeout(() => {
          this.isTransitioning = false
        }, 600)

        this.resetAutoplay()
      }
    },
    nextSlide() {
      if (this.currentSlide < this.slides.length - 1) {
        this.goToSlide(this.currentSlide + 1)
      }
    },
    prevSlide() {
      if (this.currentSlide > 0) {
        this.goToSlide(this.currentSlide - 1)
      }
    },
    startAutoplay() {
      this.autoplayInterval = setInterval(() => {
        const nextIndex = (this.currentSlide + 1) % this.slides.length
        this.goToSlide(nextIndex)
      }, 5000)
    },
    stopAutoplay() {
      if (this.autoplayInterval) {
        clearInterval(this.autoplayInterval)
      }
    },
    resetAutoplay() {
      this.stopAutoplay()
      this.startAutoplay()
    }
  }
}
</script>

<style scoped>
.hero-slider-container {
  position: relative;
  width: 100%;
  height: 60vh;
  min-height: 500px;
  overflow: hidden;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
}

.slider-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transform: translateX(100%);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.slide.active {
  opacity: 1;
  transform: translateX(0);
}

.slide-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.slide-bg-1 {
  background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 50%, #e0f2fe 100%);
}

.slide-bg-2 {
  background: linear-gradient(135deg,#ffffff 0%, #f0f9ff 50%, #e0f2fe 100%);
}

.slide-bg-3 {
  background: linear-gradient(135deg,#7ea88c 0%, #80d39b 50%, #ffffff 100%);
}

/* Floating Shapes for Slide 1 */
.floating-shapes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}

.house-shape {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.house-base {
  width: 40px;
  height: 30px;
  background: #3b82f6;
  border-radius: 4px;
  position: relative;
}

.house-roof {
  width: 0;
  height: 0;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  border-bottom: 20px solid #003772;
  margin-bottom: -2px;
}

.house-1 {
  top: 20%;
  left: 15%;
  animation: floatHouse 4s ease-in-out infinite;
}

.house-2 {
  top: 60%;
  left: 25%;
  animation: floatHouse 4s ease-in-out infinite 1.5s;
}

.house-3 {
  top: 35%;
  right: 20%;
  animation: floatHouse 4s ease-in-out infinite 3s;
}

.wifi-icon {
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
}

.wifi-arc {
  position: absolute;
  border: 2px solid #10b981;
  border-bottom: none;
  border-radius: 50px 50px 0 0;
  opacity: 0;
  animation: wifiPulse 2s ease-in-out infinite;
}

.wifi-arc-1 {
  width: 15px;
  height: 8px;
  top: 8px;
  left: -7px;
  animation-delay: 0s;
}

.wifi-arc-2 {
  width: 25px;
  height: 13px;
  top: 5px;
  left: -12px;
  animation-delay: 0.3s;
}

.wifi-arc-3 {
  width: 35px;
  height: 18px;
  top: 2px;
  left: -17px;
  animation-delay: 0.6s;
}

.wifi-dot {
  width: 4px;
  height: 4px;
  background: #10b981;
  border-radius: 50%;
  position: absolute;
  top: 12px;
  left: -2px;
}

.cloud {
  position: absolute;
  background: #e5e7eb;
  border-radius: 50px;
  opacity: 0.7;
}

.cloud::before,
.cloud::after {
  content: '';
  position: absolute;
  background: #e5e7eb;
  border-radius: 50px;
}

.cloud-1 {
  width: 60px;
  height: 20px;
  top: 15%;
  right: 30%;
  animation: floatCloud 6s ease-in-out infinite;
}

.cloud-1::before {
  width: 30px;
  height: 30px;
  top: -15px;
  left: 10px;
}

.cloud-1::after {
  width: 40px;
  height: 25px;
  top: -10px;
  right: 5px;
}

.cloud-2 {
  width: 40px;
  height: 15px;
  top: 70%;
  right: 15%;
  animation: floatCloud 8s ease-in-out infinite 2s;
}

.cloud-2::before {
  width: 20px;
  height: 20px;
  top: -10px;
  left: 5px;
}

.cloud-2::after {
  width: 25px;
  height: 18px;
  top: -8px;
  right: 3px;
}

.connection-line {
  position: absolute;
  height: 2px;
  background: linear-gradient(90deg, transparent, #10b981, transparent);
  opacity: 0;
  animation: connectionPulse 3s ease-in-out infinite;
}

.line-1 {
  width: 120px;
  top: 40%;
  left: 30%;
  transform: rotate(15deg);
  animation-delay: 1s;
}

.line-2 {
  width: 100px;
  top: 55%;
  right: 35%;
  transform: rotate(-25deg);
  animation-delay: 2s;
}

/* Floating Tech Elements for Slide 2 */
.floating-tech-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}

.fiber-cable {
  position: absolute;
  height: 3px;
  background: linear-gradient(90deg, #3b82f6, #06b6d4, #3b82f6);
  border-radius: 2px;
  animation: fiberFlow 2s ease-in-out infinite;
}

.fiber-1 {
  width: 150px;
  top: 25%;
  left: 10%;
  transform: rotate(25deg);
}

.fiber-2 {
  width: 120px;
  bottom: 30%;
  right: 15%;
  transform: rotate(-15deg);
  animation-delay: 1s;
}

.data-packet {
  position: absolute;
  width: 12px;
  height: 12px;
  background: #06b6d4;
  border-radius: 3px;
  animation: packetMove 3s linear infinite;
}

.packet-inner {
  width: 6px;
  height: 6px;
  background: #0891b2;
  border-radius: 2px;
  margin: 3px;
}

.packet-1 {
  top: 20%;
  left: 5%;
  animation-delay: 0s;
}

.packet-2 {
  top: 50%;
  left: 8%;
  animation-delay: 1s;
}

.packet-3 {
  top: 80%;
  left: 12%;
  animation-delay: 2s;
}

.tech-circle {
  position: absolute;
  border: 2px solid rgba(59, 130, 246, 0.3);
  border-radius: 50%;
  animation: techCircle 4s linear infinite;
}

.circle-1 {
  width: 80px;
  height: 80px;
  top: 30%;
  right: 25%;
}

.circle-2 {
  width: 120px;
  height: 120px;
  bottom: 25%;
  left: 20%;
  animation-delay: 2s;
}

/* Floating Support Elements for Slide 3 */
.floating-support-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}

.support-icon-float {
  position: absolute;
  color: rgba(255, 255, 255, 0.8);
  animation: supportFloat 3s ease-in-out infinite;
}

.icon-1 {
  top: 20%;
  left: 15%;
  animation-delay: 0s;
}

.icon-2 {
  top: 60%;
  left: 20%;
  animation-delay: 1s;
}

.icon-3 {
  top: 40%;
  right: 25%;
  animation-delay: 2s;
}

.availability-badge {
  position: absolute;
  top: 25%;
  right: 15%;
  background: rgba(16, 185, 129, 0.9);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 18px;
  animation: badgePulse 2s ease-in-out infinite;
}

.slide-content {
  position: relative;
  z-index: 3;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  min-height: 50vh;
}

.text-section {
  animation: slideInLeft 0.8s ease-out;
}

.logo-container {
  margin-bottom: 1.5rem;
  animation: fadeInUp 0.8s ease-out;
  text-align: right;
}

.main-logo {
  width: 130px;
  height: 145px;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1));
}

.slide-title {
  font-size: 3rem;
  font-weight: 700;
  color: #1f2937;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
}

.slide:not(:first-child) .slide-title {
  color: white;
}

.title-line {
  display: block;
  animation: fadeInUp 0.8s ease-out backwards;
}

.title-line:nth-child(2) {
  animation-delay: 0.2s;
}

.highlight {
  background: linear-gradient(45deg, #3b82f6, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.slide-description {
  font-size: 1.2rem;
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 2rem;
  animation: fadeInUp 0.8s ease-out 0.4s backwards;
}

.slide:not(:first-child) .slide-description {
  color: rgba(255, 255, 255, 0.9);
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: #3b82f6;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
  animation: fadeInUp 0.8s ease-out 0.6s backwards;
}

.cta-button:hover {
  background: #2563eb;
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(59, 130, 246, 0.4);
}

.cta-button.secondary {
  background: rgba(255, 255, 255, 0.95);
  color: #1e3c72;
}

.cta-button.tertiary {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.button-icon {
  transition: transform 0.3s ease;
}

.cta-button:hover .button-icon {
  transform: translateX(3px);
}

.image-section {
  animation: slideInRight 0.8s ease-out;
}

.floating-image-container,
.floating-tech-container,
.floating-support-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 350px;
}

.advisor-image {
  width: 280px;
  height: auto;
  border-radius: 20px;
  filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.15));
  transition: transform 0.3s ease;
  animation: advisorFloat 3s ease-in-out infinite;
}

.advisor-image:hover {
  transform: scale(1.05);
}

.floating-bubble {
  position: absolute;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 12px 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  animation: bubbleFloat 4s ease-in-out infinite;
}

.bubble-1 {
  top: 15%;
  right: -20px;
  animation-delay: 0s;
}

.bubble-2 {
  bottom: 30%;
  left: -30px;
  animation-delay: 1.5s;
}

.bubble-3 {
  top: 50%;
  right: -25px;
  animation-delay: 3s;
}

.bubble-content {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #3b82f6;
  font-size: 14px;
  font-weight: 600;
}

.bubble-content svg {
  color: #10b981;
}

.floating-tech-icon {
  position: absolute;
  top: 20px;
  right: 20px;
  color: rgba(255, 255, 255, 0.8);
  animation: techIconSpin 8s linear infinite;
}

.speed-indicator {
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.speed-bar {
  width: 4px;
  background: #e5e7eb;
  border-radius: 2px;
  animation: speedPulse 1.5s ease-in-out infinite;
}

.bar-1 {
  height: 12px;
  animation-delay: 0s;
}

.bar-2 {
  height: 18px;
  animation-delay: 0.2s;
}

.bar-3 {
  height: 24px;
  animation-delay: 0.4s;
}

.bar-4 {
  height: 30px;
  animation-delay: 0.6s;
}

.speed-text {
  font-size: 12px;
  font-weight: bold;
  color: #3b82f6;
  margin-left: 8px;
}

.chat-bubble {
  position: absolute;
  top: 20px;
  left: -50px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 18px;
  padding: 16px 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  max-width: 200px;
  animation: chatBubbleFloat 3s ease-in-out infinite;
}

.chat-bubble::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 30px;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid rgba(255, 255, 255, 0.95);
}

.chat-content p {
  margin: 8px 0 0 0;
  color: #374151;
  font-size: 14px;
}

.typing-indicator {
  display: flex;
  gap: 3px;
  margin-bottom: 8px;
}

.typing-indicator span {
  width: 6px;
  height: 6px;
  background: #3b82f6;
  border-radius: 50%;
  animation: typing 1.4s ease-in-out infinite;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

.status-indicator {
  position: absolute;
  bottom: 20px;
  right: -40px;
  background: rgba(16, 185, 129, 0.9);
  color: white;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  animation: statusPulse 2s ease-in-out infinite;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #ffffff;
  border-radius: 50%;
  animation: dotPulse 1s ease-in-out infinite;
}

.slider-controls {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 2rem;
  z-index: 10;
}

.dots-container {
  display: flex;
  gap: 1rem;
}

.dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.dot.active {
  background: #3b82f6;
  transform: scale(1.3);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.dot-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.dot.active .dot-inner {
  opacity: 1;
}

.nav-buttons {
  display: flex;
  gap: 0.5rem;
}

.nav-button {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}

.nav-button:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
  transform: scale(1.1);
}

.nav-button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.progress-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  z-index: 10;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #06b6d4);
  transition: width 0.6s ease;
}

/* Animations */
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes floatHouse {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes wifiPulse {
  0%, 100% {
    opacity: 0;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes floatCloud {
  0%, 100% {
    transform: translateX(0px);
  }
  50% {
    transform: translateX(20px);
  }
}

@keyframes connectionPulse {
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

@keyframes fiberFlow {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

@keyframes packetMove {
  0% {
    transform: translateX(0px) translateY(0px);
  }
  25% {
    transform: translateX(100px) translateY(-20px);
  }
  50% {
    transform: translateX(200px) translateY(0px);
  }
  75% {
    transform: translateX(300px) translateY(20px);
  }
  100% {
    transform: translateX(400px) translateY(0px);
    opacity: 0;
  }
}

@keyframes techCircle {
  0% {
    transform: rotate(0deg) scale(1);
    opacity: 0.3;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    transform: rotate(360deg) scale(1.1);
    opacity: 0.3;
  }
}

@keyframes supportFloat {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
}

@keyframes badgePulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes advisorFloat {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
}

@keyframes bubbleFloat {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-12px);
  }
}

@keyframes techIconSpin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes speedPulse {
  0%, 100% {
    background: #e5e7eb;
  }
  50% {
    background: #10b981;
  }
}

@keyframes chatBubbleFloat {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-6px);
  }
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0px);
  }
  30% {
    transform: translateY(-10px);
  }
}

@keyframes statusPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

@keyframes dotPulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .hero-slider-container {
    height: 55vh;
    min-height: 450px;
  }

  .content-wrapper {
    gap: 2rem;
  }

  .slide-title {
    font-size: 2.5rem;
  }

  .advisor-image {
    width: 240px;
  }
}

/* Adaptación específica para tablets y móviles */
@media (max-width: 768px) {
  .hero-slider-container {
    height: 70vh;
    min-height: 500px;
  }

  .content-wrapper {
    grid-template-columns: 1fr;
    gap: 0;
    text-align: center;
    padding: 2rem 0;
    justify-content: center;
    align-items: center;
  }

  .text-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    order: 1;
  }

  /* Ocultar completamente la sección de imagen en tablets */
  .image-section {
    display: none;
  }

  .logo-container {
    margin-bottom: 2rem;
    text-align: center;
  }

  .main-logo {
    width: 120px;
    height: auto;
  }

  .slide-title {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .slide-description {
    font-size: 1.2rem;
    margin-bottom: 2.5rem;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }

  .cta-button {
    margin: 0 auto;
  }

  /* Ocultar elementos flotantes decorativos */
  .floating-shapes,
  .floating-tech-elements,
  .floating-support-elements {
    display: none;
  }

  .slider-controls {
    bottom: 1.5rem;
    gap: 1rem;
  }

  .nav-buttons {
    display: none;
  }
}

/* Optimización para móviles */
@media (max-width: 480px) {
  .hero-slider-container {
    height: 100vh;
    min-height: 100vh;
  }

  .slide-content {
    padding: 0 1.5rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .content-wrapper {
    padding: 3rem 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .text-section {
    max-width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .logo-container {
    margin-bottom: 2rem;
  }

  .main-logo {
    width: 100px;
    height: auto;
  }

  .slide-title {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    line-height: 1.1;
  }

  .slide-description {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    line-height: 1.5;
  }

  .cta-button {
    padding: 1rem 2rem;
    font-size: 1rem;
  }

  .slider-controls {
    bottom: 2rem;
  }

  .dots-container {
    gap: 0.8rem;
  }

  .dot {
    width: 12px;
    height: 12px;
  }
}

/* Adaptación para móviles muy pequeños */
@media (max-width: 360px) {
  .hero-slider-container {
    min-height: 100vh;
  }

  .slide-content {
    padding: 0 1rem;
  }

  .content-wrapper {
    padding: 2rem 0;
  }

  .slide-title {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  .slide-description {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  .main-logo {
    width: 90px;
  }

  .cta-button {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }

  .logo-container {
    margin-bottom: 1.5rem;
  }
}

/* Modo landscape para móviles */
@media (max-width: 768px) and (orientation: landscape) {
  .hero-slider-container {
    height: 100vh;
    min-height: 100vh;
  }

  .content-wrapper {
    padding: 1rem 0;
    justify-content: center;
  }

  .slide-title {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  .slide-description {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  .logo-container {
    margin-bottom: 1rem;
  }

  .main-logo {
    width: 80px;
  }

  .slider-controls {
    bottom: 1rem;
  }
}
</style>
