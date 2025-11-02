<template>
  <br>
  <div class="service-banner">
    <div class="banner-content">
      <div class="icon-container">
        <svg class="service-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
        </svg>
      </div>

      <div class="text-content">
        <span class="action-text">Conoce el </span>
        <span class="highlight-text">estado de tu orden de servicio</span>
        <span class="action-text"> aquí o llámanos </span>
        <span class="highlight-text">GRATIS</span>
        <span class="action-text"> al </span>
        <span class="phone-number">08001800</span>
      </div>

      <button class="cta-button" @click="handleConsulta">
        <span>Consultar aquí</span>
        <svg class="button-arrow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServiceBanner',
  methods: {
    handleConsulta() {
      // Aquí puedes agregar la lógica para manejar el clic
      console.log('Consultar servicio clicked');
      // Ejemplo: this.$router.push('/consulta')
    }
  }
}
</script>

<style scoped>
.service-banner {
  width: 100%;
  min-height: 80px;
  background: linear-gradient(135deg, #0d3d7e 0%, #003772 100%);
  padding: 16px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 20px rgba(13, 61, 126, 0.3);
  position: relative;
  overflow: hidden;
  /* max-width: 1200px; */

}

.service-banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(179, 198, 72, 0.1), transparent);
  animation: shimmer 3s infinite;
}

.banner-content {
  display: flex;
  align-items: center;
  gap: 16px;
  max-width: 1200px;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(179, 198, 72, 0.2);
  border-radius: 50%;
  padding: 12px;
  animation: pulse 2s infinite;
}

.service-icon {
  width: 32px;
  height: 32px;
  color: #b3c648;
  transition: all 0.3s ease;
}

.icon-container:hover .service-icon {
  transform: rotate(15deg) scale(1.1);
  color: #8da634;
}

.text-content {
  flex: 1;
  min-width: 300px;
  font-size: 16px;
  line-height: 1.4;
  color: white;
  text-align: center;
}

.action-text {
  font-weight: 400;
  transition: color 0.3s ease;
}

.highlight-text {
  font-weight: 700;
  color: #b3c648;
  text-shadow: 0 0 10px rgba(179, 198, 72, 0.5);
  animation: glow 2s ease-in-out infinite alternate;
}

.phone-number {
  font-weight: 700;
  font-size: 18px;
  color: #8da634;
  text-decoration: underline;
  cursor: pointer;
  transition: all 0.3s ease;
}

.phone-number:hover {
  color: #b3c648;
  text-shadow: 0 0 8px rgba(179, 198, 72, 0.6);
  transform: scale(1.05);
}

.cta-button {
  background: linear-gradient(135deg, #b3c648 0%, #8da634 50%, #729535 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(179, 198, 72, 0.3);
  white-space: nowrap;
  animation: bounce 1s ease-in-out infinite alternate;
}

.cta-button:hover {
  background: linear-gradient(135deg, #8da634 0%, #729535 50%, #b3c648 100%);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 6px 20px rgba(179, 198, 72, 0.4);
}

.cta-button:active {
  transform: translateY(0) scale(0.98);
}

.button-arrow {
  width: 18px;
  height: 18px;
  transition: transform 0.3s ease;
}

.cta-button:hover .button-arrow {
  transform: translateX(4px);
}

@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes glow {
  from { text-shadow: 0 0 10px rgba(179, 198, 72, 0.5); }
  to { text-shadow: 0 0 20px rgba(179, 198, 72, 0.8), 0 0 30px rgba(179, 198, 72, 0.3); }
}

@keyframes bounce {
  from { transform: translateY(0); }
  to { transform: translateY(-3px); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .service-banner {
    padding: 20px 16px;
    min-height: auto;
  }

  .banner-content {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }

  .text-content {
    min-width: auto;
    font-size: 15px;
    order: 2;
  }

  .icon-container {
    order: 1;
  }

  .cta-button {
    order: 3;
    padding: 14px 28px;
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .text-content {
    font-size: 14px;
  }

  .phone-number {
    font-size: 16px;
  }

  .cta-button {
    padding: 12px 24px;
    font-size: 14px;
  }
}

/* Mejoras de accesibilidad */
@media (prefers-reduced-motion: reduce) {
  .service-banner::before,
  .icon-container,
  .highlight-text,
  .cta-button {
    animation: none;
  }
}

.cta-button:focus {
  outline: 2px solid #b3c648;
  outline-offset: 2px;
}
</style>
