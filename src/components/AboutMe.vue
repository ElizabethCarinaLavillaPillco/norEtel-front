<template>
  <section class="about-section">
    <div class="about-container">
      <!-- Background Elements -->
      <div class="floating-background-elements">
        <div class="bg-circle circle-1"></div>
        <div class="bg-circle circle-2"></div>
        <div class="bg-wave wave-1"></div>
        <div class="bg-wave wave-2"></div>
        <div class="connection-dots">
          <div class="dot dot-1"></div>
          <div class="dot dot-2"></div>
          <div class="dot dot-3"></div>
          <div class="dot dot-4"></div>
          <div class="connecting-line line-1"></div>
          <div class="connecting-line line-2"></div>
          <div class="connecting-line line-3"></div>
        </div>
      </div>

      <div class="about-content">
        <!-- Left Side - Image -->
        <div class="image-section">
          <div class="image-container">
            <img src="/img/retrato.png" alt="Noretel - Nuestra empresa" class="portrait-image" />
            <div class="floating-stats">
              <div class="stat-bubble stat-1">
                <span class="stat-number">24/7</span>
                <span class="stat-label">Disponibles</span>
              </div>
              <div class="stat-bubble stat-2">
                <span class="stat-number">+5</span>
                <span class="stat-label">Años</span>
              </div>
              <div class="stat-bubble stat-3">
                <span class="stat-number">100%</span>
                <span class="stat-label">Fibra</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side - Content -->
        <div class="content-section">
          <div class="content-wrapper">
            <div class="section-header">
              <span class="section-tag">Conoce a Noretel</span>
              <h2 class="section-title">
                <span class="title-line">¿Quiénes</span>
                <span class="title-line highlight">Somos?</span>
              </h2>
            </div>

            <div class="description-content">
              <p class="main-description">
                En <strong>Noretel</strong>, somos más que una empresa de telecomunicaciones: somos
                <em>facilitadores de sueños</em> y <em>constructores de puentes digitales</em>.
                Desde nuestros inicios, hemos estado profundamente comprometidos con la idea de que
                el acceso a internet de alta calidad no debería ser un privilegio, sino un derecho
                fundamental que impulse el crecimiento y las oportunidades para todos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AboutMe',
  mounted() {
    this.initAnimations()
  },
  methods: {
    initAnimations() {
      // Intersection Observer para animaciones cuando el componente es visible
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-in')
            }
          })
        },
        { threshold: 0.1 },
      )

      // Observar elementos para animar
      const elementsToAnimate = this.$el.querySelectorAll(
        '.feature-item, .image-container, .content-wrapper',
      )
      elementsToAnimate.forEach((el) => observer.observe(el))
    },
  },
}
</script>

<style scoped>
.about-section {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f0f9ff 100%);
  padding: 4rem 0;
  overflow: hidden;
}

.about-container {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  z-index: 2;
}

/* Background Elements */
.floating-background-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.bg-circle {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(45deg, rgba(59, 130, 246, 0.05), rgba(6, 182, 212, 0.05));
}

.circle-1 {
  width: 300px;
  height: 300px;
  top: 10%;
  right: -100px;
  animation: floatCircle 8s ease-in-out infinite;
}

.circle-2 {
  width: 200px;
  height: 200px;
  bottom: 20%;
  left: -50px;
  animation: floatCircle 10s ease-in-out infinite reverse;
}

.connection-dots {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.dot {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #3b82f6;
  border-radius: 50%;
  animation: dotPulse 3s ease-in-out infinite;
}

.dot-1 {
  top: 25%;
  right: 30%;
  animation-delay: 0s;
}
.dot-2 {
  top: 60%;
  right: 20%;
  animation-delay: 1s;
}
.dot-3 {
  bottom: 30%;
  left: 25%;
  animation-delay: 2s;
}
.dot-4 {
  top: 40%;
  left: 15%;
  animation-delay: 1.5s;
}

/* Main Content */
.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  min-height: 80vh;
}

/* Image Section */
.image-section {
  position: relative;
  animation: slideInLeft 1s ease-out;
}

.image-container {
  position: relative;
  border-radius: 25px;
  overflow: hidden;
  transition: transform 0.3s ease;
  filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.15));
}

.image-container:hover {
  transform: translateY(-5px) scale(1.02);
}

.portrait-image {
  width: 90%;
  height: 450px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.floating-stats {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.stat-bubble {
  position: absolute;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  padding: 16px 20px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  animation: bubbleFloat 4s ease-in-out infinite;
}

.stat-1 {
  top: 20px;
  right: 20px;
  animation-delay: 0s;
}

.stat-2 {
  bottom: 80px;
  left: 20px;
  animation-delay: 1.5s;
}

.stat-3 {
  top: 50%;
  right: -10px;
  animation-delay: 3s;
}

.stat-number {
  display: block;
  font-size: 20px;
  font-weight: bold;
  color: #3b82f6;
  line-height: 1;
}

.stat-label {
  display: block;
  font-size: 12px;
  color: #6b7280;
  margin-top: 4px;
  font-weight: 600;
}

/* Content Section */
.content-section {
  animation: slideInRight 1s ease-out;
}

.content-wrapper {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

.content-wrapper.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.section-header {
  margin-bottom: 2rem;
}

.section-tag {
  display: inline-block;
  background: linear-gradient(45deg, #3b82f6, #06b6d4);
  color: white;
  padding: 8px 20px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 1rem;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

.section-title {
  font-size: 3rem;
  font-weight: 700;
  color: #1f2937;
  line-height: 1.2;
  display: flex;
  flex-direction: column;
}

.title-line {
  display: block;
}

.highlight {
  background: linear-gradient(45deg, #003772, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.description-content {
  space-y: 2rem;
}

.main-description {
  font-size: 15px;
  color: #4b5563;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.main-description strong {
  color: #003772;
  font-weight: 700;
}

.main-description em {
  color: #136b4e;
  font-style: normal;
  font-weight: 600;
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

@keyframes floatCircle {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

@keyframes dotPulse {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

@keyframes bubbleFloat {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .about-content {
    gap: 3rem;
  }

  .section-title {
    font-size: 2.5rem;
  }

  .portrait-image {
    height: 400px;
  }
}

@media (max-width: 768px) {
  .about-section {
    padding: 2rem 0;
  }

  .about-container {
    padding: 0 1rem;
  }

  .about-content {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }

  .section-title {
    font-size: 2rem;
  }

  .main-description {
    font-size: 1.1rem;
  }

  .portrait-image {
    height: 350px;
  }

  .floating-background-elements {
    opacity: 0.5;
  }

  .floating-stats {
    position: relative;
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
    height: auto;
  }

  .stat-bubble {
    position: relative;
    top: auto;
    left: auto;
    right: auto;
    bottom: auto;
    animation: none;
  }
}

@media (max-width: 480px) {
  .about-section {
    padding: 1.5rem 0;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .main-description {
    font-size: 1rem;
  }

  .portrait-image {
    height: 300px;
  }

  .floating-stats {
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .stat-bubble {
    padding: 12px 16px;
  }

  .stat-number {
    font-size: 18px;
  }
}

@media (max-width: 320px) {
  .section-title {
    font-size: 1.5rem;
  }

  .portrait-image {
    height: 250px;
  }
}
</style>
